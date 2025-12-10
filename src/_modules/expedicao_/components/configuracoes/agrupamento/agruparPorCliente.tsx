import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/_shared/_components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import RenderGroupSection, { Group, GroupType } from "./gerarAgrupamento";
import { useGroups } from "@/_modules/expedicao_/hooks/useGroups";

type AgruparPorClienteProps = {
  grupoClientes: Group[];
  removeGroup: (tipo: GroupType, id: string) => void;
  addGroup: (tipo: GroupType) => void;
  updateGroupName: (tipo: GroupType, id: string, name: string) => void;
  addItem: (tipo: GroupType, groupId: string, item: string) => void;
  removeItem: (tipo: GroupType, groupId: string, index: number) => void;
}

export function AgruparPorCliente({ grupoClientes, removeGroup, addGroup, updateGroupName, addItem, removeItem }: AgruparPorClienteProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full group">
            <div>
              <h4 className="text-sm font-semibold text-left">
                Agrupar por Cliente
                {grupoClientes.length > 0 && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({grupoClientes.length})
                  </span>
                )}
              </h4>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                }`}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-3 pt-3">
          <RenderGroupSection
            tipo="clientes"
            groups={grupoClientes}
            addGroup={addGroup}
            removeGroup={removeGroup}
            updateGroupName={updateGroupName}
            addItem={addItem}
            removeItem={removeItem}
          />
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}