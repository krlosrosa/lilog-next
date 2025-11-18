import { ResultTransporteDtoOutput } from "@/_services/api/model";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";

type CardKanbamProps = {
  item: ResultTransporteDtoOutput;
  processo: 'separacao' | 'conferencia' | 'carregamento';
}

const getStatusBadgeVariant = (status: string) => {
  if (status.includes('CONCLUIDO') || status === 'FATURADO' || status === 'LIBERADO_PORTARIA') {
    return 'default';
  }
  if (status.includes('EM_') || status === 'EM_PROGRESSO') {
    return 'secondary';
  }
  if (status === 'CANCELADO') {
    return 'destructive';
  }
  return 'outline';
};

const getStatusLabel = (status: string) => {
  return status.replace(/_/g, ' ').toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getStatusBorderColor = (status: string) => {
  if (status.includes('CONCLUIDO') || status === 'FATURADO' || status === 'LIBERADO_PORTARIA') {
    return 'border-l-4 border-l-primary';
  }
  if (status.includes('EM_') || status === 'EM_PROGRESSO') {
    return 'border-l-4 border-l-blue-500';
  }
  if (status === 'CANCELADO') {
    return 'border-l-4 border-l-destructive';
  }
  if (status === 'NAO_INICIADO' || status.includes('NAO_INICIADO')) {
    return 'border-l-4 border-l-muted-foreground';
  }
  if (status === 'EM_PAUSA' || status.includes('EM_PAUSA')) {
    return 'border-l-4 border-l-yellow-500';
  }
  return 'border-l-4 border-l-border';
};

export default function CardKanbam({ item, processo }: CardKanbamProps) {
  const status = item[processo] || '';
  const borderColorClass = getStatusBorderColor(status);
  const placaLimitada = item.placa.substring(0, 7);

  return (
    <Card className={`hover:shadow-md transition-shadow p-0 ${borderColorClass}`}>
      <CardContent className="px-2 py-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex gap-2 min-w-0">
            <p className="font-semibold text-base truncate">{item.numeroTransporte} | {placaLimitada} - {item.nomeTransportadora} </p>
          </div>
          <Badge variant={getStatusBadgeVariant(status)} className="shrink-0">
            {getStatusLabel(status)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}