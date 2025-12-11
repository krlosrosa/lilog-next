'use client';
import { useGetMovimentacao } from "../../hooks/getMovimentacao";
import { columnsMovimentacao } from "./columnsMovimentacao";
import { DataTableMovimentacao } from "./data-table-movimentacao";

type TableMovimentacaoProps = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function TableMovimentacao({ globalFilter, setGlobalFilter }: TableMovimentacaoProps) {

  const { movimentacoes } = useGetMovimentacao();
  return (
    <DataTableMovimentacao columns={columnsMovimentacao} data={movimentacoes ?? []} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
  )
}