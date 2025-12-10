'use client';
import { useGetMovimentacao } from "../../hooks/getMovimentacao";
import { columnsMovimentacao } from "./columnsMovimentacao";
import { DataTableMovimentacao } from "./data-table-movimentacao";

export function TableMovimentacao() {

  const { movimentacoes } = useGetMovimentacao();
  return (
    <DataTableMovimentacao columns={columnsMovimentacao} data={movimentacoes ?? []} />
  )
}