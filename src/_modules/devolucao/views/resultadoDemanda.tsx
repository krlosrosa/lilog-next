"use client";
import { useParams } from "next/navigation";
import { useDevolucao } from "../hooks/usedevolucao";
import { useEffect } from "react";
import HeaderResultado from "../components/resultado/headerResultado";
import { DataTableItensResult } from "../components/resultado/table/data-table-itens-result";
import { columnsItensResult } from "../components/resultado/table/columnsItensResult";

export default function ResultadoDemanda() {
  const { id } = useParams();
  const { resultadoConferencia, isLoadingResultadoConferencia, setDemandaId } = useDevolucao();

  useEffect(() => {
    setDemandaId(id as string);
  }, [id]);


  return (
    <div>
      <h1>Resultado Demanda</h1>
      {resultadoConferencia && <HeaderResultado resultadoConferencia={resultadoConferencia} />}
      <DataTableItensResult columns={columnsItensResult} data={resultadoConferencia?.itens ?? []} />
    </div>
  )
}