import { Badge } from "@/_shared/_components/ui/badge";
import { CardTitle } from "@/_shared/_components/ui/card";
import { Truck } from "lucide-react";

type HeaderTransporteProps = {
  temFaltantes: boolean;
  qtdTransportes: number;
  qtdTransportesIds: number;
}

export function HeaderTransporte({ temFaltantes, qtdTransportes, qtdTransportesIds }: HeaderTransporteProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary/10 rounded-lg p-2">
        <Truck className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <CardTitle className="text-lg font-semibold">Validação de Transportes</CardTitle>
        <p className="text-muted-foreground text-sm">
          Verificação dos transportes encontrados no sistema
        </p>
      </div>
      <Badge variant={temFaltantes ? "destructive" : "default"} className="text-xs">
        {qtdTransportes || 0}/{qtdTransportesIds} encontrados
      </Badge>
    </div>
  )
}