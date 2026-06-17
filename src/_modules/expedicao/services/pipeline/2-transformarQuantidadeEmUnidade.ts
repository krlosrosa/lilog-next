import type { EnrichedPickingMapItem } from '../../others/types/items';
import {
  isUnidadeMedidaBase,
  isUnidadeMedidaCaixa,
  normalizarUnidadeMedida,
} from '../../others/utils/unidadesMedida';

export function transformarQuantidadeEmUnidade(
  enrichedShipments: EnrichedPickingMapItem[],
): EnrichedPickingMapItem[] {

  return enrichedShipments.map((item) => {
    const unMedida = normalizarUnidadeMedida(item.unMedida);
    let quantidade = 0;

    if (isUnidadeMedidaCaixa(unMedida)) {
      quantidade = item.quantidade * item.produto.unPorCaixa;
    } else if (isUnidadeMedidaBase(unMedida)) {
      quantidade = item.quantidade;
    }

    return {
      ...item,
      quantidade,
      unMedida: 'UN',
    };
  });
}
