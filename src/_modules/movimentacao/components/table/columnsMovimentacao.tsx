'use client';

import {
  GetMovimentacaoDto,
} from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import ModalExcluirDemanda from '../modalExcluirDemanda';
import ModalEditarDemanda from '../modalEditarDemanda';

export const columnsMovimentacao: ColumnDef<GetMovimentacaoDto>[] = [
  {
    accessorKey: 'idMov',
    header: 'ID Mov.',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('idMov')}</div>
    ),
  },
  {
    accessorKey: 'palete',
    header: 'SSCC',
    cell: ({ row }) => (
      <div className="text-foreground font-medium">
        {row.getValue('palete')}
      </div>
    ),
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue('descricao')}
      </div>
    ),
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('sku')}</div>
    ),
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
    cell: ({ row }) => (
      <div>{row.getValue('lote')}</div>
    ),
  },
  {
    accessorKey: 'origem',
    header: 'Origem',
    cell: ({ row }) => (
      <div>{row.getValue('origem')}</div>
    ),
  },
  {
    accessorKey: 'destino',
    header: 'Destino',
    cell: ({ row }) => (
      <div>{row.getValue('destino')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: 'prioridade',
    header: 'Prioridade',
    cell: ({ row }) => (
      <div>{row.getValue('prioridade')}</div>
    ),
  },
  {
    accessorKey: 'dataExecucao',
    header: 'Executado em',
    cell: ({ row }) => {
      const value = row.getValue('dataExecucao');
      const date = value ? new Date(value as string) : null;
      return <div>{date ? date.toLocaleString() : '-'}</div>;
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => (
      <div>
        <ModalExcluirDemanda id={row.original.idMov} />
      </div>
    ),
  },
  {
    accessorKey: 'editar',
    header: 'Editar',
    cell: ({ row }) => (
      <div>
        <ModalEditarDemanda demanda={row.original} />
      </div>
    ),
  },
];
