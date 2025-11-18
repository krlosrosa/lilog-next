import { columnsTransporte } from './columsTransporte';
import { CreateTransporteDtoOutput } from '@/_services/api/model';
import { DataTableTransporte } from './data-table-transporte';

export function TableTransporte({
  transportes,
}: {
  transportes: CreateTransporteDtoOutput[];
}) {
  return <DataTableTransporte columns={columnsTransporte} data={transportes} />;
}
