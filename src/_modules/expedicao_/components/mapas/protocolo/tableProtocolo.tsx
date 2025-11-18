import { ProtocoloMapa } from "@/_modules/expedicao/services/protocolo-mapa";
import { DataTableMapa } from "../tables/data-table-mapa";
import { columnsProtocolo } from "./columsProtocolo";

export function TableProtocolo({
  protocolos,
}: {
  protocolos: ProtocoloMapa[];
}) {
  return <DataTableMapa columns={columnsProtocolo} data={protocolos} />;
}