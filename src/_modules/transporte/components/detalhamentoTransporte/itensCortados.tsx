import { TransporteComRelacionamentosGetDtoCortesItem } from "@/_services/api/model";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/_shared/_components/ui/collapsible";
import { Button } from "@/_shared/_components/ui/button";
import { ChevronDown, Scissors } from "lucide-react";

export default function ItensCortados({ cortes }: { cortes: TransporteComRelacionamentosGetDtoCortesItem[] }) {
  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="h-4 w-4" />
            <span>Itens Cortados</span>
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold bg-destructive text-destructive-foreground rounded-full min-w-6">
              {cortes.length}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="CollapsibleContent">
        <div className="border border-t-0 rounded-b-md bg-white">
          <div className="max-h-64 overflow-y-auto">
            <div className="space-y-0.5 p-1">
              {cortes.map((corte) => (
                <div 
                  key={corte.id}
                  className="flex flex-col p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  {/* Linha 1: Produto e Lote */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex-1 min-w-0 flex gap-4">
                      <h3 className="text-xs font-medium text-gray-900 truncate">
                        {corte.produto}
                      </h3>
                      <h3 className="text-xs font-medium text-gray-900 truncate">
                        {corte.descricao}
                      </h3>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Lote: {corte.lote}
                      </span>
                    </div>
                  </div>
                  
                  {/* Linha 2: Motivo e Realizado */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 truncate flex-1">
                      {corte.motivo}
                    </span>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                      {corte.realizado}
                    </span>
                  </div>
                  
                  {/* Linha 3: Direção e Quantidades */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {corte.direcao}
                    </span>
                    <div className="flex gap-2 text-gray-600">
                      {corte.caixas && (
                        <span>Caixas: {corte.caixas}</span>
                      )}
                      {corte.unidades && (
                        <span>Unidades: {corte.unidades}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {cortes.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                Nenhum item cortado
              </div>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}