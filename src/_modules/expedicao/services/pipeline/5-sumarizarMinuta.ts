import { EnrichedPickingMapItem } from '../../others/types/items';

// O tipo de estratégia ainda é útil para quem for chamar a função
export type EstrategiaSumarizacao = 'porItem' | 'porMinuta';

/**
 * Sumariza uma lista de itens com base em uma estratégia de agrupamento.
 *
 * @param lista - A lista de EnrichedPickingMapItem a ser sumarizada.
 * @param estrategia - 'porItem' (agrupa por codItem, lote, id)
 * ou 'porMinuta' (agrupa por id, empresa, segmento).
 * @returns Uma lista de itens sumarizados (EnrichedPickingMapItem[]).
 * * @alerta_estrategia_porMinuta
 * Ao usar 'porMinuta', os campos de item (codItem, lote, etc.)
 * serão uma cópia do *primeiro item* encontrado nesse grupo.
 * As 'quantidades' e 'pesos' serão a soma de *todos* os itens do grupo.
 */
export function sumarizarMinuta(
  lista: EnrichedPickingMapItem[],
): EnrichedPickingMapItem[] {
  const agrupado = lista.reduce(
    (acc: Record<string, EnrichedPickingMapItem>, item) => {
      let chaveValor: string;
        chaveValor = `${item.id}-${item.produto?.empresa}-${item.produto.segmento}`;
      if (!acc[chaveValor]) {
        // 1. Item não existe no grupo.
        // Adiciona uma cópia dele como o "item base" do grupo.
        acc[chaveValor] = { ...item };
      } else {
        // 2. Item já existe.
        // Apenas soma os valores ao "item base" que já está no 'acc'.
        acc[chaveValor].alocacao.unidadesSoltas += item.alocacao?.unidadesSoltas ?? 0;
        acc[chaveValor].alocacao.caixasSoltas += item.alocacao?.caixasSoltas ?? 0;
        acc[chaveValor].alocacao.paletesCompletos += item.alocacao?.paletesCompletos ?? 0;
        acc[chaveValor].alocacao.pesoUnidades += item.alocacao?.pesoUnidades ?? 0;
        acc[chaveValor].alocacao.pesoCaixas += item.alocacao?.pesoCaixas ?? 0;
        acc[chaveValor].alocacao.pesoPaletes += item.alocacao?.pesoPaletes ?? 0;
        acc[chaveValor].alocacao.percentualProximoPalete += item.alocacao?.percentualProximoPalete ?? 0;
        acc[chaveValor].alocacao.totalCaixas += item.alocacao?.totalCaixas ?? 0;
        acc[chaveValor].pesoLiquido += item.pesoLiquido;
      }

      return acc;
    },
    {} as Record<string, EnrichedPickingMapItem>, // Objeto inicial
  );

  return Object.values(agrupado);
}
