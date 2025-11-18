import { DataTableErrorExpedicao } from './data-table-error-expedicao';
import { columnsErrorsExpedicao } from './columsErrorExpedicao';
import { ErrorField } from '../../others/types/uploadErro';

export function TableErrorExpedicao({ errors }: { errors: ErrorField[] }) {
  return (
    <DataTableErrorExpedicao columns={columnsErrorsExpedicao} data={errors} />
  );
}
