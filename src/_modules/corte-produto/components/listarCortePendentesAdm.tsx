'use client';

import { useMemo } from "react";
import { useBuscarCortesAberto } from "../hooks/useBuscarCortesAbertoAdm";
import { columnsCortePendentes } from "./tabelaCortesPendentes/columnsCortePendentes";
import { DataTableCortePendentes } from "./tabelaCortesPendentes/data-table-cortePendentes";

interface ListarCortePendentesAdmProps {
  filter?: string;
}

export default function ListarCortePendentesAdm({ filter = "" }: ListarCortePendentesAdmProps) {
  const { cortesAberto } = useBuscarCortesAberto();

  const filteredData = useMemo(() => {
    const data = cortesAberto || [];
    if (!filter.trim()) return data;
    const term = filter.trim().toLowerCase();
    return data.filter(
      (item) =>
        (item.transporteId?.toLowerCase().includes(term) ?? false) ||
        (item.produto?.toLowerCase().includes(term) ?? false)
    );
  }, [cortesAberto, filter]);

  return (
    <div>
      <DataTableCortePendentes columns={columnsCortePendentes} data={filteredData} />
    </div>
  );
}