import { ConfiguracaoImpressa } from '../others/types/configuracaoImpressa';
import {
  ImpressaoMapa,
} from '../others/types/items';
import { ValidationSuccess } from './validateInputs';

// Imports organizados por etapa do pipeline
import { enriquecerItems } from './pipeline/1-enriquecerItems';
import { transformarQuantidadeEmUnidade } from './pipeline/2-transformarQuantidadeEmUnidade';
import { gerarGrupos, Groups } from './pipeline/4-gerarGrupos';
import { sumarizar } from './pipeline/5-sumarizar';
import { alocarCaixasEPaletes } from './pipeline/6-alocarCaixasEPaletes';
import { gerarMinutaConferencia as gerarMinutaConferenciaPipeline } from './pipeline/12-gerarMinutaCarregamento';
import { sumarizarMinuta } from './pipeline/5-sumarizarMinuta';

export async function gerarMinutaConferencia(
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

  // --- Etapa 2: Agrupamento e Sumarização ---
  itens = gerarGrupos(
    itens,
    'TRANSPORTE',
  );
  itens = sumarizar(itens, 'porMinuta');

  // --- Etapa 3: Alocação e Classificação ---
  itens = alocarCaixasEPaletes(itens, false);
  itens = sumarizarMinuta(itens);
  const minuta = gerarMinutaConferenciaPipeline(itens);

  return minuta;
}
