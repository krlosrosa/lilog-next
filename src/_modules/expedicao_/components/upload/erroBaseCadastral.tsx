import { InconsistenciaBaseCadastral } from '@/_modules/expedicao/others/types/uploadErro';
import { AlertCircle } from 'lucide-react';

export function ErroBaseCadastral({
  item,
}: {
  item: InconsistenciaBaseCadastral;
}) {
  return (
    <div className="border border-destructive/40 rounded-md p-3 hover:bg-destructive/5 transition-colors">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <span className="font-semibold">{item.codItem}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground text-xs">{item.descricao}</span>
          </div>

          <p className="text-sm text-muted-foreground">
            Un/Caixa cadastrada não é compatível com Peso/Caixa e Peso/Unidade.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground bg-muted/30 rounded px-3 py-2">
            <span>
              Un/Caixa:{' '}
              <strong className="text-foreground">{item.unPorCaixaCadastrado}</strong>
            </span>
            <span>
              Peso/Caixa:{' '}
              <strong className="text-foreground">{item.pesoCaixa.toFixed(2)} kg</strong>
            </span>
            <span>
              Peso/Un:{' '}
              <strong className="text-foreground">{item.pesoUnidade.toFixed(2)} kg</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
