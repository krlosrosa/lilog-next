import { useDevolucao } from "../hooks/usedevolucao";
import { columnsDemandaDevolucao } from "./tableDemanda/columnsDemandaDevolucao";
import { DataTableDemandaDevolucao } from "./tableDemanda/data-table-demanda-devolucao";

export default function ListarDemandas() {
  const { demandas, isLoadingDemandas } = useDevolucao();
  return (
    <div>
      <h1>Listar Demandas</h1>
      <DataTableDemandaDevolucao columns={columnsDemandaDevolucao} data={demandas ?? []} />
    </div>
  )
}