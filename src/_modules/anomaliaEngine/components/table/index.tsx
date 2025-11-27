'use client';
import { useGetRules } from "@/_modules/center/hooks/queries/useGetRules";
import { DataTableRules } from "./data-table-";
import { columnsRules } from "./columnsAnomaliaEngine";
import { EngineRuleGetDto } from "@/_services/api/model";


type TableRulesProps = {
  data: EngineRuleGetDto[];
}

export function TableRules({ data }: TableRulesProps) {
  return (
    <div>
      <DataTableRules columns={columnsRules} data={data} />
    </div>
  )
}