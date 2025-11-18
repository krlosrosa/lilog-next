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
export function sumarizar(
  lista: EnrichedPickingMapItem[],
  estrategia: EstrategiaSumarizacao = 'porItem',
): EnrichedPickingMapItem[] {
  const agrupado = lista.reduce(
    (acc: Record<string, EnrichedPickingMapItem>, item) => {
      let chaveValor: string;

      if (estrategia === 'porMinuta') {
        // --- ESTRATÉGIA MINUTA ---
        chaveValor = `${item.id}-${item.empresa}-${item.produto.segmento}`;
      } else {
        // --- ESTRATÉGIA ITEM (Lógica original) ---
        chaveValor = `${item.codItem}-${item.lote}-${item.id}`;
      }

      // --- Lógica de Reducer (Mais limpa e direta) ---

      if (!acc[chaveValor]) {
        // 1. Item não existe no grupo.
        // Adiciona uma cópia dele como o "item base" do grupo.
        acc[chaveValor] = { ...item };
      } else {
        // 2. Item já existe.
        // Apenas soma os valores ao "item base" que já está no 'acc'.
        acc[chaveValor].quantidade += item.quantidade;
        acc[chaveValor].pesoLiquido += item.pesoLiquido;
      }

      return acc;
    },
    {} as Record<string, EnrichedPickingMapItem>, // Objeto inicial
  );

  return Object.values(agrupado);
}
