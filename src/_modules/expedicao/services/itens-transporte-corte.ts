import { ConfiguracaoImpressa } from '../others/types/configuracaoImpressa';
import { ValidationSuccess } from './validateInputs';

// Imports organizados por etapa do pipeline
import { enriquecerItems } from './pipeline/1-enriquecerItems';
import { transformarQuantidadeEmUnidade } from './pipeline/2-transformarQuantidadeEmUnidade';
import { gerarGrupos } from './pipeline/4-gerarGrupos';
import { sumarizar } from './pipeline/5-sumarizar';
import { alocarCaixasEPaletes } from './pipeline/6-alocarCaixasEPaletes';
import { classificarPorCampos } from './pipeline/08-classificarItens';
import { AddItemsTransporteDto } from '@/_services/api/model';

export async function gerarItensTransporteCorte(
  input: ValidationSuccess,
  transportesFaltantes: string[],
): Promise<AddItemsTransporteDto[]> {
  const { shipments, products, routes } = input.data;

  // --- Etapa 1: Enriquecimento e Definições Básicas ---
  let itens = enriquecerItems(shipments, products, routes);
  itens = transformarQuantidadeEmUnidade(itens);

  // --- Etapa 2: Agrupamento e Sumarização ---
  itens = gerarGrupos(itens, 'REMESSA');
  itens = sumarizar(itens);

  // --- Etapa 3: Alocação e Classificação ---
  itens = alocarCaixasEPaletes(itens, false);
  itens = classificarPorCampos(itens, [
    'id',
    'produto.segmento',
    'tipo',
    'produto.pickWay',
  ]);

  const filtrarFaltantes = itens.filter((item) =>
    transportesFaltantes.includes(item.transportId),
  );

  // --- Etapa 4: Distribuição (Quebra de Paletes) ---

  // Agrupa itens por transporte
  const itensPorTransporte = filtrarFaltantes.reduce(
    (acc, item) => {
      const transporteId = item.transportId;

      if (!acc[transporteId]) {
        acc[transporteId] = [];
      }

      acc[transporteId].push({
        transporte: item.transportId,
        remessa: item.remessa,
        cliente: item.codCliente,
        nomeCliente: item.nomeCliente,
        placa: item.placa,
        sku: item.codItem,
        descricao: item.descricao,
        lote: item.lote,
        quantidade: item.alocacao?.unidadesSoltas,
        caixas: item.alocacao?.caixasSoltas,
        segmento: item.produto?.segmento,
        tipo: item.produto?.variavel?.toString(),
      });

      return acc;
    },
    {} as Record<
      string,
      Array<{
        transporte: string;
        remessa: string;
        cliente: string;
        nomeCliente: string;
        placa: string;
        sku: string;
        descricao: string;
        lote: string;
        quantidade: number | undefined;
        caixas: number | undefined;
        segmento: string | undefined;
        tipo: string | undefined;
      }>
    >,
  );

  // Transforma em AddItemsTransporteDto[] onde key é o transporte e value é JSON string
  const resultado: AddItemsTransporteDto[] = Object.entries(
    itensPorTransporte,
  ).map(([transporteId, itens]) => ({
    key: transporteId,
    value: JSON.stringify(itens),
  }));

  return resultado;
}
