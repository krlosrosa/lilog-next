'use client';

import { CreateTransporteDtoOutput } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsTransporte: ColumnDef<CreateTransporteDtoOutput>[] = [
  {
    accessorKey: 'numeroTransporte',
    header: 'DT',
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue('numeroTransporte')}</div>
      );
    },
  },
  {
    accessorKey: 'qtdImpressoes',
    header: 'Impressoes',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('qtdImpressoes')}</div>;
    },
  },
  {
    accessorKey: 'nomeTransportadora',
    header: 'Transportadora',
    cell: ({ row }) => {
      const nomeTransportadora = row.getValue('nomeTransportadora') as string;
      return (
        <div className="text-muted-foreground">{nomeTransportadora || '-'}</div>
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
      const dataFormatada = dataExpedicao ? dataExpedicao.split(' ')[0] : '-';
      return <div className="font-medium">{dataFormatada}</div>;
    },
  },
  {
    accessorKey: 'prioridade',
    header: 'Prioridade',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('prioridade')}</div>;
    },
  },
  {
    accessorKey: 'separacao',
    header: 'Separação',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('separacao')}</div>;
    },
  },
  {
    accessorKey: 'conferencia',
    header: 'Conferência',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('conferencia')}</div>;
    },
  },
  {
    accessorKey: 'carregamento',
    header: 'Carregamento',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('carregamento')}</div>;
    },
  },
  {
    accessorKey: 'obs',
    header: 'Observações',
    cell: ({ row }) => {
      const obs = row.getValue('obs') as string;
      return <div className="text-muted-foreground">{obs || '-'}</div>;
    },
  },
];
