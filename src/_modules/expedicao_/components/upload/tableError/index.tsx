import { DataTableError } from './data-table-error-expedicao';
import { columnsErrorsExpedicao } from './columsErrorExpedicao';
import { ErrorField } from '@/_modules/expedicao_/others/types/uploadErro';

export function TableErrorExpedicao({ errors }: { errors: ErrorField[] }) {
  return (
    <DataTableError columns={columnsErrorsExpedicao} data={errors} />
  );
}
