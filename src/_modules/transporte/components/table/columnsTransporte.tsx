'use client';

import { ResultTransporteDtoOutput } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CheckCheck, Repeat, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModalDetalhamentoTransporte from '../cardDetalhamentoTransporte';
import { Badge } from '@/_shared/_components/ui/badge';

type StatusType = 'NAO_INICIADO' | 'EM_PROGRESSO' | 'CONCLUIDO';

export function StatusIcon({ status }: { status: StatusType }) {
  const statusConfig = {
    NAO_INICIADO: {
      icon: Clock,
      className: 'text-muted-foreground',
    },
    EM_PROGRESSO: {
      icon: Repeat,
      className: 'text-blue-800',
    },
    CONCLUIDO: {
      icon: CheckCheck,
      className: 'text-green-600',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return <Icon className={cn('h-5 w-5', config.className)} strokeWidth={1.5} />;
}

export const columnsTransporte: ColumnDef<ResultTransporteDtoOutput>[] = [
  {
    accessorKey: 'numeroTransporte',
    header: 'Transporte',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('numeroTransporte')}
        </div>
      );
    },
  },
  {
    accessorKey: 'nomeTransportadora',
    header: 'Transportadora',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('nomeTransportadora')}
        </div>
      );
    },
  },
  {
    accessorKey: 'placa',
    header: 'Placa',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('placa')}</div>;
    },
  },
  {
    accessorKey: 'dataExpedicao',
    header: 'Expedição',
    cell: ({ row }) => {
      const dataExpedicao = row.getValue('dataExpedicao') as string;
      const dataFormatada = dataExpedicao 
        ? format(new Date(dataExpedicao), 'dd/MM/yyyy', { locale: ptBR })
        : '-';
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {dataFormatada}
        </div>
      );
    },
  },
  {
    accessorKey: 'separacao',
    header: 'Separação',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center font-medium">
          <StatusIcon status={row.getValue('separacao') as StatusType} />
        </div>
      );
    },
  },
  {
    accessorKey: 'conferencia',
    header: 'Conferência',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center font-medium">
          <StatusIcon status={row.getValue('conferencia') as StatusType} />
        </div>
      );
    },
  },
  {
    accessorKey: 'carregamento',
    header: 'Carregamento',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center font-medium">
          <StatusIcon status={row.getValue('carregamento') as StatusType} />
        </div>
      );
    },
  },
  {
    accessorKey: 'cargaParada',
    header: 'Carga Parada',
    cell: ({ row }) => {
      const cargaParada = row.getValue('cargaParada') as boolean;
      if (cargaParada) {
        return (
          <div className="flex items-center justify-center font-medium">
            <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200 text-xs">
              Carga Parada
            </Badge>
          </div>
        );
      }
    },
  },
  {
    accessorKey: 'detalhamento',
    header: 'Detalhamento',
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center font-medium">
          <ModalDetalhamentoTransporte transporteId={row.original.numeroTransporte as string} />
        </div>
      );
    },
  }
];
