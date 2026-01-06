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
import { gerarConferencia } from './pipeline/12-gerarConferencia';

export async function gerarMapaConferencia(
  input: ValidationSuccess,
  config: ConfiguracaoImpressa,
  segregarClientes?: string[],
  agruparClientes?: Groups[],
  agruparTransportes?: Groups[],
  agruparRemessas?: Groups[],
  replicar: boolean = false,
  classificarProduto: boolean = false,  
): Promise<ImpressaoMapa[]> {
  const { shipments, products, routes } = input.data;

  // --- Etapa 1: Enriquecimento e Definições Básicas ---
  let itens = enriquecerItems(shipments, products, routes);
  itens = transformarQuantidadeEmUnidade(itens);

  itens = definirFaixaERange(itens, config.dataMaximaPercentual || 0);
  
  // --- Etapa 2: Agrupamento e Sumarização ---
  if(replicar) {
    itens = gerarGrupos(
      itens,
      config.tipoImpressao,
      segregarClientes,
      agruparClientes,
      agruparTransportes,
      agruparRemessas,
    );
  } else {

    itens = gerarGrupos(itens, config.tipoImpressaoConferencia || 'TRANSPORTE');
  }
  itens = sumarizar(itens);

  // --- Etapa 3: Alocação e Classificação ---
  itens = alocarCaixasEPaletes(itens, false);
  const camposClassificacao = classificarProduto ? ['id', 'produto.segmento', 'tipo', 'produto.codItem'] : ['id', 'produto.segmento', 'tipo', 'produto.pickWay'];
  itens = classificarPorCampos(itens, camposClassificacao);
  // --- Etapa 4: Distribuição (Quebra de Paletes) ---

  // --- Etapa 5: Geração do Mapa Final ---
  // (Assumindo que 'gerarSeparacao' é a 'gerarMapa' que corrigimos)
  const mapas = gerarConferencia(itens);

  // MELHORIA: 'async' functions já retornam Promises.
  return mapas;
}
