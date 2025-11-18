import { AlertTriangle, Settings2 } from "lucide-react";

export function NaoSincronizado() {
  return (
    <div className="rounded-lg border-2 border-destructive/30 bg-linear-to-br from-destructive/10 to-destructive/5 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="rounded-full bg-destructive/20 p-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-destructive">
              Configurações não encontradas
            </h3>
            <Settings2 className="h-4 w-4 text-destructive/70" />
          </div>
          
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              Não há configurações de impressão cadastradas para o centro e empresa selecionados.
            </p>
            <p className="text-xs text-muted-foreground/80">
              É necessário criar uma configuração antes de gerar os mapas de separação.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}