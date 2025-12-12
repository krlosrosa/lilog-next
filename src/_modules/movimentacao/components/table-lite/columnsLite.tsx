'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CreateContagemDto } from '@/_services/api/model';

export const columnsCadastroContagemLite: ColumnDef<CreateContagemDto>[] = [
  {
    accessorKey: 'dataRef',
    header: 'Data Ref',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('dataRef')}</div>
    ),
  },
  {
    accessorKey: 'endereco',
    header: 'SSCC',
    cell: ({ row }) => (
      <div className="text-foreground font-medium">
        {row.getValue('endereco')}
      </div>
    ),
  },
  {
    accessorKey: 'sku',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue('sku')}
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
    accessorKey: 'descricao',
    header: 'Origem',
    cell: ({ row }) => (
      <div>{row.getValue('descricao')}</div>
    ),
  },
  {
    accessorKey: 'dataValidade',
    header: 'Data Validade',
    cell: ({ row }) => (
      <div>{row.getValue('dataValidade')}</div>
    ),
  },
  {
      accessorKey: 'peso',
    header: 'Peso',
    cell: ({ row }) => (
      <div>{row.getValue('peso')}</div>
    ),
  },
  {
    accessorKey: 'caixas',
    header: 'Caixas',
    cell: ({ row }) => (
      <div>{row.getValue('caixas')}</div>
    ),
  },
];
