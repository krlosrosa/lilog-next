import { Button } from "@/_shared/_components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useConfiguracoesStore } from "../../others/stores/configuracoes.store";

type HeaderConfiguracoesProps = {
  setValueTab: (value: string) => void;
  temErro: boolean;
}
export function HeaderConfiguracoes({ setValueTab, temErro }: HeaderConfiguracoesProps) {

  const sincronizado = useConfiguracoesStore((state) => state.sincronizado)

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <h1 className="text-xl font-bold tracking-tight">Configurações de Impressão</h1>
        <p className="text-muted-foreground text-xs">
          Configure as definições para geração de mapas
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setValueTab('validarTransporte')}
          variant="outline"
          size="sm"
          className="gap-1.5 h-9"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Button>
        <Button
          onClick={() => setValueTab('gerarMapas')}
          size="sm"
          className="gap-1.5 h-9"
          disabled={temErro || !sincronizado}
        >
          Gerar Mapas
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}