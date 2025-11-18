'use client';
import { useGetRules } from "@/_modules/center/hooks/queries/useGetRules";
import { DataTableRules } from "./data-table-rules";
import { columnsRules } from "./columnsRules";

export function TableRules() {
  const { regras } = useGetRules();

  return (
    <div>
      <DataTableRules columns={columnsRules} data={regras ?? []} />
    </div>
  )
}