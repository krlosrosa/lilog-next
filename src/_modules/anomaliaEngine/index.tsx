'use client';
import DefinicaoRegra from "./components/definicaoRegra";
import { TableRules } from "./components/table";
import { useBuscarAnomaliaEngine } from "./hooks/useBuscarAnomaliaEngine";

export default function AnomaliaEngine() {
  const { regras } = useBuscarAnomaliaEngine();
  return (
    <div>
      <h1>Anomalia Engine</h1>
      <DefinicaoRegra />
      <TableRules data={regras ?? []} />
    </div>
  )
}