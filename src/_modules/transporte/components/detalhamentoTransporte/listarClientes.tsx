import { TransporteComRelacionamentosGetDtoClientesItem } from "@/_services/api/model";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/_shared/_components/ui/collapsible";
import { Button } from "@/_shared/_components/ui/button";
import { ChevronDown, Users } from "lucide-react";

export default function ListarClientes({ clientes }: { clientes: TransporteComRelacionamentosGetDtoClientesItem[] }) {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Clientes</span>
            <span className="inline-flex items-center justify-center px-2 py-1 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full min-w-6">
              {clientes.length}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        <div className="border border-t-0 rounded-b-md bg-white">
          <div className="max-h-64 overflow-y-auto">
            <div className="space-y-0.5 p-1">
              {clientes.map((cliente) => (
                <div 
                  key={cliente.cliente}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-medium text-gray-900 truncate">
                      {cliente.nomeCliente}
                    </h3>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {cliente.cliente}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {clientes.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                Nenhum cliente encontrado
              </div>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}