import type { EnrichedPickingMapItem } from '../../others/types/items';

export function transformarQuantidadeEmUnidade(
  enrichedShipments: EnrichedPickingMapItem[],
): EnrichedPickingMapItem[] {

  return enrichedShipments.map((item) => {
    const pesoLiquidoProduto = item.produto.pesoUnidade;
    const pesoTotal = item.pesoLiquido;
    let quantidade = 0;

    if (item.produto.variavel === 2) {
      if (['CX', 'SC', 'FRD', 'FD'].includes(item.unMedida)) {
        const pesoTotal = item.produto.pesoCaixa * item.quantidade;
        const qtdUnidade = pesoTotal / item.produto.pesoUnidade;
        quantidade = Math.round(qtdUnidade * 100) / 100;
      } else {
        quantidade = item.quantidade;
      }
    } else {
      quantidade = Math.round((pesoTotal / pesoLiquidoProduto) * 100) / 100;
    }

    return {
      ...item,
      quantidade,
      unMedida: 'UN',
    };
  });
}
