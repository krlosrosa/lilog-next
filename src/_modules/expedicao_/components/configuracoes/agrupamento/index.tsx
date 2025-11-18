import { AgruparPorCliente } from "./agruparPorCliente";
import { AgruparPorRemessa } from "./agruparPorRemessa";
import { AgruparPorTransporte } from "./agruparPorTransporte";
import { SegregrarClientes } from "./segregrarClientes";
import { useAgrupamentoStore } from "@/_modules/expedicao_/others/stores/agrupamento.store";

export function Agrupamento() {
  const { clientesSegregados, setClientesSegregados, handleSegregedClientes } = useAgrupamentoStore();

  return (
    <div className="space-y-2 p-4 mt-4 rounded-lg border shadow-sm">
      <div>
        <h4 className="text-base font-semibold mb-1">Definir Agrupamentos e segregação</h4>
        <p className="text-sm text-muted-foreground">Configure as opções de definição de agrupamentos e segregação</p>
      </div>
      <SegregrarClientes setClientesSegregados={setClientesSegregados} handleSegregedClientes={handleSegregedClientes} clientesSegregados={clientesSegregados} />
      <AgruparPorCliente />
      <AgruparPorTransporte />
      <AgruparPorRemessa />
    </div>
  )
}