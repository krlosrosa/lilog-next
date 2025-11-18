import { DivergenciaConversao } from "@/_modules/expedicao/others/types/uploadErro";
import { AlertCircle } from "lucide-react";

export function ErroDivergenciaConversao({ item }: { item: DivergenciaConversao }) {
  const diferenca = item.quantidadeFinal - item.totalUnidadesPostConversao;
  const statusDif = diferenca > 0 ? "text-amber-600" : "text-red-600";
  
  return (
    <div className="border border-destructive/40 rounded-md p-3 hover:bg-destructive/5 transition-colors">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
        
        <div className="flex-1 space-y-2">
          {/* Header com info principal */}
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <span className="font-semibold">{item.codItem}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground text-xs">{item.descricao}</span>
            <div className="ml-auto flex gap-3 text-xs text-muted-foreground">
              <span>Transp: <strong className="text-foreground">{item.transportId}</strong></span>
              <span>Lote: <strong className="text-foreground">{item.lote}</strong></span>
            </div>
          </div>

          {/* Divergência principal */}
          <div className="flex items-center gap-4 text-sm bg-muted/30 rounded px-3 py-2">
            <div>
              <span className="text-muted-foreground text-xs">Esperado:</span>
              <span className="ml-2 font-semibold">{item.totalUnidadesPostConversao.toFixed(0)} un</span>
            </div>
            <span className="text-muted-foreground">→</span>
            <div>
              <span className="text-muted-foreground text-xs">Recebido:</span>
              <span className="ml-2 font-semibold">{item.quantidadeFinal} un</span>
              <span className="ml-1 text-xs text-muted-foreground">
                ({item.quantidade} {item.unMedida})
              </span>
            </div>
            <div className={`ml-auto font-bold ${statusDif}`}>
              {diferenca > 0 ? "+" : ""}{diferenca.toFixed(0)} un
            </div>
          </div>

          {/* Detalhes técnicos */}
          <div className="flex gap-4 text-xs text-muted-foreground pt-1">
            <span>Un/Caixa: <strong className="text-foreground">{item.unidadesNaCaixa}</strong></span>
            <span>Peso/Un: <strong className="text-foreground">{item.pesoPorUnidade.toFixed(2)} kg</strong></span>
            <span>Peso Total: <strong className="text-foreground">{item.pesoPedido.toFixed(2)} kg</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}