import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Badge } from "@/_shared/_components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/_shared/_components/ui/collapsible";
import { Plus, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { UploadClientesSegregados } from "./uploadClientesSegregados";

type SegregrarClientesProps = {
  handleSegregedClientes: (clientes: string[]) => void;
  clientesSegregados: string[];
  setClientesSegregados: (clientes: string[]) => void;
}

export function SegregrarClientes({ handleSegregedClientes, clientesSegregados, setClientesSegregados }: SegregrarClientesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAddCliente = () => {
    const cliente = inputValue.trim();
    if (cliente && !clientesSegregados.includes(cliente)) {
      const novosClientes = [...clientesSegregados, cliente];
      setClientesSegregados(novosClientes);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCliente();
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <CollapsibleTrigger asChild>
          <button className="flex items-center justify-between w-full group">
            <div>
              <h4 className="text-sm font-semibold text-left">
                Segregar Clientes
                {clientesSegregados.length > 0 && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({clientesSegregados.length})
                  </span>
                )}
              </h4>
            </div>
            <ChevronDown 
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-3 pt-3">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input 
                placeholder="Digite o código do cliente" 
                className="h-9"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            
            <Button size="sm" onClick={handleAddCliente} disabled={!inputValue.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
            
            <UploadClientesSegregados
              handleSegregedClientes={handleSegregedClientes}
            />
          </div>

          {clientesSegregados.length > 0 && (
            <div className="flex flex-wrap gap-1.5 p-2 rounded-md border bg-muted/30">
              {clientesSegregados.map((cliente, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 px-2 py-0.5 text-xs"
                >
                  {cliente}
                  <button
                    type="button"
                    onClick={() => {
                      const novosClientes = clientesSegregados.filter((_, i) => i !== index);
                      setClientesSegregados(novosClientes);
                    }}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}