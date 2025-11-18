import { columnsProtocolo } from './columsProtocolo';
import { ProtocoloMapa } from '../../services/protocolo-mapa';
import { DataTableProtocolo } from './data-table-protocolo';

export function TableProtocolo({
  protocolos,
}: {
  protocolos: ProtocoloMapa[];
}) {
  return <DataTableProtocolo columns={columnsProtocolo} data={protocolos} />;
}
