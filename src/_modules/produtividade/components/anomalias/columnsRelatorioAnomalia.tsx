'use client';

import { AnomaliaProdutividadeGetDataDto } from '@/_services/api/model';
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

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }
  return value.toLocaleString('pt-BR');
};

export const columnsRelatorioAnomalia: ColumnDef<AnomaliaProdutividadeGetDataDto>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('id')}</div>;
    },
  },
  {
    accessorKey: 'demandaId',
    header: 'ID Demanda',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('demandaId')}</div>;
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
    accessorKey: 'centerId',
    header: 'Centro',
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue('centerId')}</div>;
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
    accessorKey: 'paletesNaDemanda',
    header: 'Paletes na Demanda',
    cell: ({ row }) => {
      const paletesNaDemanda = row.getValue('paletesNaDemanda') as number | null | undefined;
      return <div className="font-semibold">{formatNumber(paletesNaDemanda)}</div>;
    },
  },
  {
    accessorKey: 'enderecosVisitado',
    header: 'Endereços Visitados',
    cell: ({ row }) => {
      const enderecosVisitado = row.getValue('enderecosVisitado') as number | null | undefined;
      return <div className="font-semibold">{formatNumber(enderecosVisitado)}</div>;
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
    accessorKey: 'motivoAnomalia',
    header: 'Motivo Anomalia',
    cell: ({ row }) => {
      const motivo = row.getValue('motivoAnomalia') as string;
      return (
        <div className="bg-destructive/10 text-destructive inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {motivo}
        </div>
      );
    },
  },
  {
    accessorKey: 'motivoAnomaliaDescricao',
    header: 'Descrição do Motivo',
    cell: ({ row }) => {
      const descricao = row.getValue('motivoAnomaliaDescricao') as string | null;
      return (
        <div className="text-sm text-muted-foreground max-w-xs truncate" title={descricao || ''}>
          {descricao || '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'criadoPorId',
    header: 'Criado Por',
    cell: ({ row }) => {
      return <div className="text-sm text-muted-foreground">{row.getValue('criadoPorId')}</div>;
    },
  },
];
