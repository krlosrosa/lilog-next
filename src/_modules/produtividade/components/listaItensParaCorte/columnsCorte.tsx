'use client';

import { AugmentedZodDto, CenterDto, CorteMercadoriaGetDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsItensParaCorte: ColumnDef<CorteMercadoriaGetDto>[] = [
  {
    accessorKey: 'transporteId',
    header: 'Transporte ID',
  },
  {
    accessorKey: 'produto',
    header: 'Produto',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('produto')}
        </div>
      );
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
    accessorKey: 'unidades',
    header: 'Unidades',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('unidades')}</div>;
    },
  },
  {
    accessorKey: 'motivo',
    header: 'Motivo',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('motivo')}</div>;
    },
  },
];
