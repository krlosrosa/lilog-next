import { UnidadeMedidaDesconhecida } from '@/_modules/expedicao/others/types/uploadErro';
import { AlertCircle } from 'lucide-react';

export function ErroUnidadeMedidaDesconhecida({
  item,
}: {
  item: UnidadeMedidaDesconhecida;
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
            <div className="ml-auto flex gap-3 text-xs text-muted-foreground">
              <span>
                Transp:{' '}
                <strong className="text-foreground">{item.transportId}</strong>
              </span>
            </div>
          </div>

          <div className="text-sm bg-muted/30 rounded px-3 py-2">
            <span className="text-muted-foreground text-xs">Unidade de medida:</span>
            <span className="ml-2 font-semibold text-destructive">{item.unMedida}</span>
          </div>

          <p className="text-xs text-muted-foreground">
            Unidade de medida não cadastrada. Fale com o administrador.
          </p>
        </div>
      </div>
    </div>
  );
}
