import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import { Truck, MapPin, Building2, Calendar, AlertCircle, Package, ClipboardCheck } from "lucide-react";
import { StatusIcon } from "../table/columnsTransporte";
import { TransporteComRelacionamentosGetDto } from "@/_services/api/model";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type StatusType = 'NAO_INICIADO' | 'EM_PROGRESSO' | 'CONCLUIDO';

const StatusProcesso = ({ 
  status, 
  label, 
  icon: Icon,
  color 
}: { 
  status: StatusType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) => (
  <div className="flex items-center justify-between p-2 rounded-lg border bg-muted/30">
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${color}`} />
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground/70 capitalize">
          {status === 'NAO_INICIADO' && 'Não iniciado'}
          {status === 'EM_PROGRESSO' && 'Em progresso'}
          {status === 'CONCLUIDO' && 'Concluído'}
        </p>
      </div>
    </div>
    <StatusIcon status={status} />
  </div>
);

export default function InfoTransporte({ transporte }: { transporte: TransporteComRelacionamentosGetDto }) {
  const dataExpedicaoFormatada = transporte?.dataExpedicao
    ? format(new Date(transporte.dataExpedicao), 'dd/MM/yyyy', { locale: ptBR })
    : '-';

  return(
    <div className="space-y-3">
      {/* Card Principal - Informações Compactas */}
      <Card className="p-3">
        <CardContent className="p-0 space-y-3">
                    {/* Status dos Processos em linha */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
            <StatusProcesso
              status={(transporte?.separacao as StatusType) || 'NAO_INICIADO'}
              label="Separação"
              icon={Package}
              color="text-blue-600"
            />
            <StatusProcesso
              status={(transporte?.conferencia as StatusType) || 'NAO_INICIADO'}
              label="Conferência"
              icon={ClipboardCheck}
              color="text-purple-600"
            />
            <StatusProcesso
              status={(transporte?.carregamento as StatusType) || 'NAO_INICIADO'}
              label="Carregamento"
              icon={Truck}
              color="text-green-600"
            />
          </div>
          {/* Primeira linha - Header compacto */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Truck className="h-4 w-4 text-blue-600 flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">
                    {transporte?.numeroTransporte || 'N/A'}
                  </span>
                  <Badge 
                    variant={transporte?.prioridade >= 3 ? 'destructive' : 'secondary'}
                    className="text-xs h-5"
                  >
                    P{transporte?.prioridade || 0}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {transporte?.nomeTransportadora || 'Transportadora não informada'}
                </p>
              </div>
            </div>
            
            {transporte?.placa && (
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Badge variant="outline" className="font-mono text-xs h-5">
                  {transporte.placa}
                </Badge>
              </div>
            )}
          </div>

        </CardContent>
      </Card>

      {/* Observações (condicional) */}
      {transporte?.obs && (
        <Card className="p-3">
          <CardContent className="p-0">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground mb-1">OBSERVAÇÕES</p>
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {transporte.obs}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}