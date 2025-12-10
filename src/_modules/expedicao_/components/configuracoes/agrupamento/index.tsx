import { AgruparPorCliente } from "./agruparPorCliente";
import { AgruparPorRemessa } from "./agruparPorRemessa";
import { AgruparPorTransporte } from "./agruparPorTransporte";
import { SegregrarClientes } from "./segregrarClientes";
import { useAgrupamentoStore } from "@/_modules/expedicao_/others/stores/agrupamento.store";

export function Agrupamento() {
  const { clientesSegregados, setClientesSegregados, handleSegregedClientes, removeGroup, grupoClientes, grupoRemessas, addGroup, updateGroupName, addItem, removeItem } = useAgrupamentoStore();

  return (
    <div className="space-y-2 p-4 mt-4 rounded-lg border shadow-sm">
      <div>
        <h4 className="text-base font-semibold mb-1">Definir Agrupamentos e segregação</h4>
        <p className="text-sm text-muted-foreground">Configure as opções de definição de agrupamentos e segregação</p>
      </div>
      <SegregrarClientes setClientesSegregados={setClientesSegregados} handleSegregedClientes={handleSegregedClientes} clientesSegregados={clientesSegregados} />
      <AgruparPorCliente
        grupoClientes={grupoClientes}
        removeGroup={removeGroup}
        addGroup={addGroup}
        updateGroupName={updateGroupName}
        addItem={addItem}
        removeItem={removeItem}
      />
      <AgruparPorTransporte />
      <AgruparPorRemessa
        grupoRemessas={grupoRemessas}
        removeGroup={removeGroup}
        addGroup={addGroup}
        updateGroupName={updateGroupName}
        addItem={addItem}
        removeItem={removeItem}
      />
    </div>
  )
}