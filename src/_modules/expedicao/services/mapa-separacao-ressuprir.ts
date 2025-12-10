import { ConfiguracaoImpressa } from '../others/types/configuracaoImpressa';
import { ImpressaoMapa } from '../others/types/items';
import { ValidationSuccess } from './validateInputs';

// Imports organizados por etapa do pipeline
import { enriquecerItems } from './pipeline/1-enriquecerItems';
import { transformarQuantidadeEmUnidade } from './pipeline/2-transformarQuantidadeEmUnidade';
import { definirFaixaERange } from './pipeline/3-definicaoFaixaShelf';
import { gerarGrupos, Groups } from './pipeline/4-gerarGrupos';
import { sumarizar } from './pipeline/5-sumarizar';
import { alocarCaixasEPaletes } from './pipeline/6-alocarCaixasEPaletes';

import { marcarItensFifo } from './pipeline/10-separarItensFifo'; // (Era o 10 na sua lista)
import { gerarSeparacao } from './pipeline/11-gerarSeparacao'; // (Era o 11)
import { classificarPorCampos } from './pipeline/08-classificarItens';
import { distribuirPaletePorTipo } from './pipeline/07-agruparPaletePorTipo';
import { splitPalete } from './pipeline/09-splitPalete';
import { EnrichedPickingMapItem, ShipmentPickingMapItem } from '@/_modules/expedicao_/others/types/items';

export async function gerarRessuprimento(
  input: ValidationSuccess,
  config: ConfiguracaoImpressa,
  segregarClientes?: string[],
  agruparClientes?: Groups[],
  agruparTransportes?: Groups[],
  agruparRemessas?: Groups[],
  agruparRange?: number | null
): Promise<Record<string, EnrichedPickingMapItem[][]>> {
  const { shipments, products, routes } = input.data;

  //Record<string, EnrichedPickingMapItem[][]>
  // --- Etapa 1: Enriquecimento e Definições Básicas ---
  let itens = enriquecerItems(shipments, products, routes);

  itens = transformarQuantidadeEmUnidade(itens);
  itens = definirFaixaERange(itens, config.dataMaximaPercentual || 0);

  // --- Etapa 2: Agrupamento e Sumarização ---
  itens = gerarGrupos(
    itens,
    config.tipoImpressao,
    segregarClientes,
    agruparClientes,
    agruparTransportes,
    agruparRemessas,
  );
  itens = sumarizar(itens);

  // --- Etapa 3: Alocação e Classificação ---
  itens = alocarCaixasEPaletes(itens, true);
  itens = classificarPorCampos(itens, [
    'id',
    'produto.segmento',
    'tipo',
    'produto.pickWay',
  ]);


    const PickingMap = itens.filter(item => item.tipo === 'picking');

  // --- Etapa 5: Geração do Mapa Final ---
  // (Assumindo que 'gerarSeparacao' é a 'gerarMapa' que corrigimos)

  const byProduct = groupPickingByShelf(PickingMap, agruparRange || 0);
  const summarized = summarizeCluster(byProduct);
  return summarized;
}


function groupByProduct<T extends ShipmentPickingMapItem>(items: T[]): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const key = item.codItem; // agrupar por SKU

    if (!acc[key]) acc[key] = [];
    acc[key].push(item);

    return acc;
  }, {} as Record<string, T[]>);
}

function diffInDays(a: Date, b: Date): number {
  const MS = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / MS);
}


function clusterByShelf<T extends EnrichedPickingMapItem>(
  items: T[],
  shelfDays: number,
  pct: number
): T[][] {
  if (items.length === 0) return [];

  const windowDays = shelfDays * pct;

  // Ordena pela dtFabricacao
  const sorted = [...items].sort(
    (a, b) => a.dtFabricacao.getTime() - b.dtFabricacao.getTime()
  );

  const groups: T[][] = [];
  let current: T[] = [];
  let anchor: Date | null = null;

  for (const item of sorted) {
    const d = item.dtFabricacao;

    if (!anchor) {
      anchor = d;
      current = [item];
      continue;
    }

    const diff = Math.abs(diffInDays(anchor, d));

    if (diff <= windowDays) {
      current.push(item);
    } else {
      groups.push(current);
      current = [item];
      anchor = d;
    }
  }

  if (current.length) groups.push(current);

  return groups;
}


export function groupPickingByShelf(
  items: EnrichedPickingMapItem[],
  pct: number
): Record<string, EnrichedPickingMapItem[][]> {
  const byProduct = groupByProduct(items);

  const result: Record<string, EnrichedPickingMapItem[][]> = {};

  for (const codItem of Object.keys(byProduct)) {
    const productItems = byProduct[codItem];

    // Shelf do produto (campo correto)
    const shelfDays = productItems[0].produto.shelf;

    const clusters = clusterByShelf(productItems, shelfDays, pct);
    result[codItem] = clusters;
  }

  return result;
}


export interface PickingClusterSummary {
  quantidadeTotal: number;
  pesoLiquidoTotal: number;
  pesoBrutoTotal: number;
  visitasTotal: number;

  // intervalo real do cluster
  dataMin: string;   // ISO ou Date conforme seu modelo
  dataMax: string;

  // intervalo permitido pelo shelf
  rangeDias: number; // shelf * pct
}

function summarizeCluster(
  cluster: EnrichedPickingMapItem[],
  rangeDias: number
): PickingClusterSummary {
  const datas = cluster.map((i) => new Date(i.dtFabricacao));
  const timestamps = datas.map(d => d.getTime());

  return cluster.reduce(
    (acc, item) => {
      acc.quantidadeTotal += item.quantidade;
      acc.pesoLiquidoTotal += item.pesoLiquido;
      acc.pesoBrutoTotal += item.pesoBruto;
      acc.visitasTotal += item.visitas;
      return acc;
    },
    {
      quantidadeTotal: 0,
      pesoLiquidoTotal: 0,
      pesoBrutoTotal: 0,
      visitasTotal: 0,
      dataMin: new Date(Math.min(...timestamps)).toISOString(),
      dataMax: new Date(Math.max(...timestamps)).toISOString(),
      rangeDias,
    }
  );
}