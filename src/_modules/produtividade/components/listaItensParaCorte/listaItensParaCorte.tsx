import { CorteMercadoriaGetDto } from "@/_services/api/model";
import { columnsItensParaCorte } from "./columnsCorte";
import { DataTableItensParaCorte } from "./data-table-corte";

type ListaItensParaCorteProps = {
  cortes: CorteMercadoriaGetDto[];
}

export default function ListaItensParaCorte({ cortes }: ListaItensParaCorteProps) {
  return (
    <DataTableItensParaCorte columns={columnsItensParaCorte} data={cortes ?? []} />
  )
}