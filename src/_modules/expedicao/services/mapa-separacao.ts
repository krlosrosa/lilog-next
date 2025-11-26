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

export async function gerarMapaSeparacao(
  input: ValidationSuccess,
  config: ConfiguracaoImpressa,
  segregarClientes?: string[],
  agruparClientes?: Groups[],
  agruparTransportes?: Groups[],
  agruparRemessas?: Groups[],
): Promise<ImpressaoMapa[]> {
  const { shipments, products, routes } = input.data;

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
  itens = marcarItensFifo(itens, config.segregarFifo || []);
  itens = splitPalete({
    items: itens,
    splitPalete: config.separarPaleteFull,
    splitUnidade: config.separarUnidades,
  });
  itens = classificarPorCampos(itens, [
    'id',
    'produto.segmento',
    'tipo',
    'produto.pickWay',
  ]);

  // --- Etapa 4: Distribuição (Quebra de Paletes) ---
  const itensDistribuidos = config.quebraPalete ? distribuirPaletePorTipo({
    lista: itens,
      tipo: config.tipoQuebra,
      quantidade: parseFloat(config.valorQuebra || '0'),
    }) : itens;

  // --- Etapa 5: Geração do Mapa Final ---
  // (Assumindo que 'gerarSeparacao' é a 'gerarMapa' que corrigimos)
  const mapas = gerarSeparacao(itensDistribuidos);

  // MELHORIA: 'async' functions já retornam Promises.
  return mapas;
}
