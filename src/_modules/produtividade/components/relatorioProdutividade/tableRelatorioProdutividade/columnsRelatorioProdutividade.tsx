'use client';

import { ProdutividadeGetDataDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  } catch {
    return dateString;
  }
};

const formatTime = (minutes: number | null | undefined) => {
  if (minutes === null || minutes === undefined || isNaN(minutes)) {
    return '-';
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }
  return value.toLocaleString('pt-BR');
};

export const columnsRelatorioProdutividade: ColumnDef<ProdutividadeGetDataDto>[] = [
  {
    accessorKey: 'idDemanda',
    header: 'ID Demanda',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('idDemanda')}</div>;
    },
  },
  {
    accessorKey: 'nomeFuncionario',
    header: 'Funcionário',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('nomeFuncionario')}
        </div>
      );
    },
  },
  {
    accessorKey: 'funcionarioId',
    header: 'ID Funcionário',
    cell: ({ row }) => {
      return <div className="text-muted-foreground text-sm">{row.getValue('funcionarioId')}</div>;
    },
  },
  {
    accessorKey: 'empresa',
    header: 'Empresa',
    cell: ({ row }) => {
      const empresa = row.getValue('empresa') as string;
      return (
        <div className="font-medium">{empresa}</div>
      );
    },
  },
  {
    accessorKey: 'centerId',
    header: 'Centro',
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue('centerId')}</div>;
    },
  },
  {
    accessorKey: 'processo',
    header: 'Processo',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('processo')}</div>;
    },
  },
  {
    accessorKey: 'segmento',
    header: 'Segmento',
    cell: ({ row }) => {
      const segmento = row.getValue('segmento') as string;
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {segmento}
        </div>
      );
    },
  },
  {
    accessorKey: 'statusDemanda',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('statusDemanda') as string;
      return (
        <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: 'turno',
    header: 'Turno',
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue('turno')}</div>;
    },
  },
  {
    accessorKey: 'inicio',
    header: 'Início',
    cell: ({ row }) => {
      const inicio = row.getValue('inicio') as string;
      return <div className="text-sm">{formatDate(inicio)}</div>;
    },
  },
  {
    accessorKey: 'fim',
    header: 'Fim',
    cell: ({ row }) => {
      const fim = row.getValue('fim') as string | null;
      return <div className="text-sm">{formatDate(fim)}</div>;
    },
  },
  {
    accessorKey: 'caixas',
    header: 'Caixas',
    cell: ({ row }) => {
      const caixas = row.getValue('caixas') as number | null | undefined;
      return <div className="font-semibold">{formatNumber(caixas)}</div>;
    },
  },
  {
    accessorKey: 'unidades',
    header: 'Unidades',
    cell: ({ row }) => {
      const unidades = row.getValue('unidades') as number | null | undefined;
      return <div className="font-semibold">{formatNumber(unidades)}</div>;
    },
  },
  {
    accessorKey: 'paletes',
    header: 'Paletes',
    cell: ({ row }) => {
      const paletes = row.getValue('paletes') as number | null | undefined;
      return <div className="font-semibold">{formatNumber(paletes)}</div>;
    },
  },
  {
    accessorKey: 'visitas',
    header: 'Visitas',
    cell: ({ row }) => {
      const visitas = row.getValue('visitas') as number | null | undefined;
      return <div className="font-semibold">{formatNumber(visitas)}</div>;
    },
  },
  {
    accessorKey: 'pausas',
    header: 'Pausas',
    cell: ({ row }) => {
      const pausas = row.getValue('pausas') as number | null | undefined;
      return <div className="font-semibold">{formatNumber(pausas)}</div>;
    },
  },
  {
    accessorKey: 'tempoTrabalhado',
    header: 'Tempo Trabalhado',
    cell: ({ row }) => {
      const tempo = row.getValue('tempoTrabalhado') as number | null | undefined;
      return <div className="text-sm">{formatTime(tempo)}</div>;
    },
  },
  {
    accessorKey: 'tempoPausas',
    header: 'Tempo Pausas',
    cell: ({ row }) => {
      const tempo = row.getValue('tempoPausas') as number | null | undefined;
      return <div className="text-sm">{formatTime(tempo)}</div>;
    },
  },
  {
    accessorKey: 'tempoTotal',
    header: 'Tempo Total',
    cell: ({ row }) => {
      const tempo = row.getValue('tempoTotal') as number | null | undefined;
      return <div className="text-sm font-medium">{formatTime(tempo)}</div>;
    },
  },
  {
    accessorKey: 'produtividade',
    header: 'Produtividade',
    cell: ({ row }) => {
      const produtividade = row.getValue('produtividade') as number | null | undefined;
      if (produtividade === null || produtividade === undefined || isNaN(produtividade)) {
        return <div className="text-muted-foreground text-sm">-</div>;
      }
      return (
        <div className="bg-green-100 text-green-800 font-semibold inline-flex items-center rounded-full px-2.5 py-0.5 text-xs">
          {produtividade.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: 'cadastradoPorId',
    header: 'Cadastrado Por',
    cell: ({ row }) => {
      return <div className="text-sm text-muted-foreground">{row.getValue('cadastradoPorId')}</div>;
    },
  },
  {
    accessorKey: 'obs',
    header: 'Observações',
    cell: ({ row }) => {
      const obs = row.getValue('obs') as string | null;
      return (
        <div className="text-sm text-muted-foreground max-w-xs truncate" title={obs || ''}>
          {obs || '-'}
        </div>
      );
    },
  },
];
