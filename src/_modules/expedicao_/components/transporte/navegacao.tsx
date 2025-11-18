import { Button } from "@/_shared/_components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";

type NavegacaoTransporteProps = {
  setValueTab: (value: string) => void;
  temFaltantes: boolean;
}

export function NavegacaoTransporte({ setValueTab, temFaltantes }: NavegacaoTransporteProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <Button
        variant="outline"
        onClick={() => setValueTab('upload')}
        className="gap-2"
        size="sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
      <Button
        variant="default"
        onClick={() => setValueTab('definicoes')}
        className="gap-2"
        disabled={temFaltantes}
        size="sm"
      >
        <Settings className="h-4 w-4" />
        Configurações
      </Button>
    </div>
  )
}