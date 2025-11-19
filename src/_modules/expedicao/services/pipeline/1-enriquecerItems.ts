import type {
  EnrichedPickingMapItem,
  ProductsPickingMapItem,
  RoutingPickingMapItem,
  ShipmentPickingMapItem,
} from '../../others/types/items';

export function enriquecerItems(
  shipments: ShipmentPickingMapItem[],
  products: ProductsPickingMapItem[],
  routingPlans?: RoutingPickingMapItem[],
): EnrichedPickingMapItem[] {
  return shipments.map((shipment) => {
    const rota =
      routingPlans?.find((route) => route.codCliente === shipment.codCliente) ||
      routingPlans?.find(
        (route) => route.transportId === shipment.transportId,
      ) ||
      null;
    const produto = products.find(
      (product) => product.codItem === shipment.codItem,
    );

    return {
      caixa: 0,
      tipo: 'picking',
      ...shipment,
      visitas: 1,
      rota,
      produto: produto as ProductsPickingMapItem,
      alocacao: {
        paletesCompletos: 0,
        caixasSoltas: 0,
        unidadesSoltas: 0,
        pesoTotalCalculado: 0,
        pesoPaletes: 0,
        pesoCaixas: 0,
        pesoUnidades: 0,
        percentualProximoPalete: 0,
        totalCaixas: 0,
      },
    };
  });
}
