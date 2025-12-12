'use client';
import { CreateContagemDto } from "@/_services/api/model";
import { ContagemLiteFormSchema } from "../../hooks/contagem-lite/cadastrar-contagem";
import { columnsCadastroContagemLite } from "./columnsLite";  
import { DataTableCadastroContagemLite } from "./data-table-lite";

type TableCadastroContagemLiteProps = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  items: CreateContagemDto[];
}

export function TableCadastroContagemLite({ globalFilter, setGlobalFilter, items }: TableCadastroContagemLiteProps) {

  return (
    <DataTableCadastroContagemLite columns={columnsCadastroContagemLite} data={items ?? []} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
  )
}