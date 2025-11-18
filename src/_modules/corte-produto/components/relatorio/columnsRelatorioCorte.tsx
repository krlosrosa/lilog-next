'use client';

import { CorteMercadoriaGetDto } from '@/_services/api/model';
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

const getMotivoLabel = (motivo: string) => {
  const labels: Record<string, string> = {
    FALTA_MERCADORIA: 'Falta Mercadoria',
    FALTA_ESPACO: 'Falta Espaço',
    RECUSA_SEFAZ: 'Recusa SEFAZ',
  };
  return labels[motivo] || motivo;
};

const getDirecaoLabel = (direcao: string) => {
  const labels: Record<string, string> = {
    OPERACIONAL: 'Operacional',
    ADMINISTRATIVO: 'Administrativo',
  };
  return labels[direcao] || direcao;
};

export const columnsRelatorioCorte: ColumnDef<CorteMercadoriaGetDto>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('id')}</div>;
    },
  },
  {
    accessorKey: 'produto',
    header: 'Produto',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('produto')}</div>;
    },
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue('lote')}</div>;
    },
  },
  {
    accessorKey: 'transporteId',
    header: 'Transporte ID',
    cell: ({ row }) => {
      return <div className="text-sm">{row.getValue('transporteId')}</div>;
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
    accessorKey: 'motivo',
    header: 'Motivo',
    cell: ({ row }) => {
      const motivo = row.getValue('motivo') as string;
      return (
        <div className="bg-destructive/10 text-destructive inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {getMotivoLabel(motivo)}
        </div>
      );
    },
  },
  {
    accessorKey: 'direcao',
    header: 'Direção',
    cell: ({ row }) => {
      const direcao = row.getValue('direcao') as string;
      return (
        <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {getDirecaoLabel(direcao)}
        </div>
      );
    },
  },
  {
    accessorKey: 'realizado',
    header: 'Realizado',
    cell: ({ row }) => {
      const realizado = row.getValue('realizado') as boolean;
      return (
        <div className={realizado 
          ? "bg-green-100 text-green-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          : "bg-yellow-100 text-yellow-800 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
        }>
          {realizado ? 'Sim' : 'Não'}
        </div>
      );
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
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => {
      const descricao = row.getValue('descricao') as string | null;
      return (
        <div className="text-sm text-muted-foreground max-w-xs truncate" title={descricao || ''}>
          {descricao || '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'criadoEm',
    header: 'Criado Em',
    cell: ({ row }) => {
      const criadoEm = row.getValue('criadoEm') as string;
      return <div className="text-sm">{formatDate(criadoEm)}</div>;
    },
  },
  {
    accessorKey: 'atualizadoEm',
    header: 'Atualizado Em',
    cell: ({ row }) => {
      const atualizadoEm = row.getValue('atualizadoEm') as string;
      return <div className="text-sm">{formatDate(atualizadoEm)}</div>;
    },
  },
  {
    accessorKey: 'criadoPorId',
    header: 'Criado Por',
    cell: ({ row }) => {
      return <div className="text-sm text-muted-foreground">{row.getValue('criadoPorId')}</div>;
    },
  },
  {
    accessorKey: 'realizadoPorId',
    header: 'Realizado Por',
    cell: ({ row }) => {
      const realizadoPorId = row.getValue('realizadoPorId') as string | null;
      return (
        <div className="text-sm text-muted-foreground">
          {realizadoPorId || '-'}
        </div>
      );
    },
  },
];
