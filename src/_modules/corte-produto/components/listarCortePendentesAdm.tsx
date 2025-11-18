'use client';
import { useBuscarCortesAberto } from "../hooks/useBuscarCortesAbertoAdm";
import { columnsCortePendentes } from "./tabelaCortesPendentes/columnsCortePendentes";
import { DataTableCortePendentes } from "./tabelaCortesPendentes/data-table-cortePendentes";

export default function ListarCortePendentesAdm() {
  const { cortesAberto } = useBuscarCortesAberto();
  return (
    <div>
      <DataTableCortePendentes columns={columnsCortePendentes} data={cortesAberto || []} />
    </div>
  )
}