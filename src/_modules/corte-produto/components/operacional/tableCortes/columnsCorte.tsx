'use client';

import { AugmentedZodDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import InserirItemCorte from '../inserirItemCorte';

export const columnsCorte: ColumnDef<AugmentedZodDto>[] = [
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('sku')}</div>;
    },
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('descricao')}</div>;
    },
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('lote')}</div>;
    },
  },
  {
    accessorKey: 'caixas',
    header: 'Caixas',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('caixas')}</div>;
    },
  },
  {
    accessorKey: 'quantidade',
    header: 'Unidades',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('quantidade')}</div>;
    },
  },
  {
    accessorKey: 'quantidadeCortada',
    header: 'Unidades Cortadas',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('quantidadeCortada')}</div>;
    },
  },
  {
    accessorKey: 'caixasCortadas',
    header: 'Caixas Cortadas',  
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('quantidadeCortada')}</div>;
    },
  },
  {
    accessorKey: 'segmento',
    header: 'Segmento',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('segmento')}</div>;
    },
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('tipo')}</div>;
    },
  },

  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return <InserirItemCorte item={row.original} />;
    },
  },
];
