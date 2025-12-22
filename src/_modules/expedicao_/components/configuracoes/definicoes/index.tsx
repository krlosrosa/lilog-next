
// ConfiguracaoGeral.tsx
import { ConfiguracaoImpressao } from "@/_modules/expedicao_/others/types/configuracaoImpressa";
import { QuebraPalete } from "./quebraPalete";
import { TipoEmpresa } from "./tipoEmpresa";
import { Segregacao } from "./segregacao";
import { RangeDataClientesCabecalho } from "./rangeDataClientesCabecalho";
import { Separator } from "@/_shared/_components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/_shared/_components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/_shared/_components/ui/badge";
import { useConfiguracoesStore } from "@/_modules/expedicao_/others/stores/configuracoes.store";
import { NaoSincronizado } from "../naoSincronizado";

type ConfiguracaoGeralProps = {
  setEmpresa: (empresa: 'DPA' | 'ITB' | 'LDB') => void;
  empresa: 'DPA' | 'ITB' | 'LDB';
  setReplicar: (replicar: boolean) => void;
  replicar: boolean;
  setClassificarProduto: (classificarProduto: boolean) => void;
  classificarProduto: boolean;
}

export function ConfiguracaoGeral({ setEmpresa, empresa, setReplicar, replicar, setClassificarProduto, classificarProduto }: ConfiguracaoGeralProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sincronizado = useConfiguracoesStore((state) => state.sincronizado)

  return (
    <div className="space-y-6 p-4 rounded-lg border shadow-sm">
      <TipoEmpresa
        setEmpresa={setEmpresa} 
        empresa={empresa} 
        setReplicar={setReplicar}
        replicar={replicar}
        setClassificarProduto={setClassificarProduto}
        classificarProduto={classificarProduto}
      />
      <Separator />
      {sincronizado ? <Collapsible>
        <CollapsibleTrigger
          className="flex w-full items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className={`bg-primary/10 rounded p-1.5 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
              <ChevronDown className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-semibold">Configurações Avançadas</h3>
              <p className="text-muted-foreground text-xs">
                Quebra de palete, separação e FIFO
              </p>
            </div>
          </div>
          <Badge variant={isOpen ? "default" : "outline"} className="text-xs">
            {isOpen ? 'Expandido' : 'Expandir'}
          </Badge>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-2">
          <QuebraPalete/>
          <Separator />
          <Segregacao />
          <Separator />
          <RangeDataClientesCabecalho />
        </CollapsibleContent>
      </Collapsible > : <NaoSincronizado />}
    </div >
  )
}