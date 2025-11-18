import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/_shared/_components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import RenderGroupSection from "./gerarAgrupamento";
import { useGroups } from "@/_modules/expedicao_/hooks/useGroups";

export function AgruparPorRemessa() {
  const { grupoRemessas, addGroup, removeGroup, updateGroupName, addItem, removeItem } = useGroups();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full group">
            <div>
              <h4 className="text-sm font-semibold text-left">
                Agrupar por Remessa
                {grupoRemessas.length > 0 && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({grupoRemessas.length})
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
            tipo="remessas"
            groups={grupoRemessas}
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