import type { EnrichedPickingMapItem } from '../../others/types/items';

export interface Groups {
  id: string;
  name: string;
  items: string[];
}
/**
 * Determina a chave de grupo para o TIPO: TRANSPORTE
 * Prioridade:
 * 1. Agrupamento de Transportes (transportesAgrupar)
 * 2. Segregação de Clientes (segregarClientes)
 * 3. Padrão (agrupar por transportId)
 */
function getTransporteGroupKey(
  shipment: EnrichedPickingMapItem,
  transportesAgrupar: Groups[],
  segregarClientes: string[],
  remessasAgrupar: Groups[],
): string {
  // Prioridade 1: O transporte está em um grupo explícito?
  const remessaGroup = remessasAgrupar.find((g) =>
    g.items.includes(shipment.remessa),
  );
  if (remessaGroup) {
    return remessaGroup.name; // Usa o nome do grupo global de remessa
  }
  
  const transporteGroup = transportesAgrupar.find((g) =>
    g.items.includes(shipment.transportId),
  );
  if (transporteGroup) {
    return transporteGroup.name; // Usa o nome do grupo e ignora o resto
  }


  // Prioridade 2: O cliente deve ser segregado?
  if (segregarClientes.includes(shipment.codCliente)) {
    // Gera uma chave única para este cliente dentro deste transporte
    return `${shipment.transportId}-[${shipment.codCliente}]`;
  }

  // Padrão: Agrupar pelo ID do transporte
  return `${shipment.transportId}`;
}

/**
 * Determina a chave de grupo para o TIPO: CLIENTE
 * Prioridade:
 * 1. Agrupamento de Remessas (remessasAgrupar)
 * 2. Agrupamento de Clientes (clientesAgrupar)
 * 3. Padrão (agrupar por transportId + codCliente)
 */
function getClienteGroupKey(
  shipment: EnrichedPickingMapItem,
  clientesAgrupar: Groups[],
  remessasAgrupar: Groups[],
): string {
  // Prioridade 1: A remessa está em um grupo explícito?
  // (Note: Movi esta lógica para 'CLIENTE' baseado na sua descrição)
  const remessaGroup = remessasAgrupar.find((g) =>
    g.items.includes(shipment.remessa),
  );
  if (remessaGroup) {
    return remessaGroup.name; // Usa o nome do grupo global de remessa
  }

  // Prioridade 2: O cliente está em um grupo explícito?
  const clienteGroup = clientesAgrupar.find((g) =>
    g.items.includes(shipment.codCliente),
  );
  if (clienteGroup) {
    // Agrupa o cliente dentro do seu transporte
    return `${shipment.transportId}-${clienteGroup.name}`;
  }

  // Padrão: Agrupar por cliente individual, dentro do seu transporte
  return `${shipment.transportId}-[${shipment.codCliente}]`;
}

/**
 * Função principal refatorada
 */
export function gerarGrupos(
  shipments: EnrichedPickingMapItem[],
  tipo: string,
  segregarClientes: string[] = [], // Valor padrão melhorado (de [""] para [])
  clientesAgrupar: Groups[] = [],
  transportesAgrupar: Groups[] = [],
  remessasAgrupar: Groups[] = [],
): EnrichedPickingMapItem[] {
  // Filtra valores vazios que podem vir do default antigo [""]
  const clientesASegregar = segregarClientes.filter((c) => c);

  return shipments.map((shipment) => {
    let groupKey = '';

    if (tipo === 'TRANSPORTE') {
      groupKey = getTransporteGroupKey(
        shipment,
        transportesAgrupar,
        clientesASegregar,
        remessasAgrupar,
      );
    } else if (tipo === 'TRANSPORTE') {
      groupKey = getClienteGroupKey(shipment, clientesAgrupar, remessasAgrupar);
    } else if (tipo === 'REMESSA') {
      groupKey = `${shipment.remessa}`;
    } else {
      // Fallback ou erro para tipo desconhecido
      // Usando o agrupamento mais granular como padrão
      groupKey = `${shipment.transportId}-[${shipment.codCliente}]`;
    }

    return {
      id: groupKey,
      ...shipment,
    };
  });
}
