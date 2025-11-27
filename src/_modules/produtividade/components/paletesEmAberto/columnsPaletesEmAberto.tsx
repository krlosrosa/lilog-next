'use client';

import { PaleteGetDataTransporteDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsPaletesEmAberto: ColumnDef<PaleteGetDataTransporteDto>[] = [
  {
    accessorKey: 'transporteId',
    header: 'Transporte',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('transporteId')}
        </div>
      );
    },
  },
  {
    accessorKey: 'palete_id',
    header: 'Palete',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('palete_id')}
        </div>
      );
    },
  },
  {
    accessorKey: 'empresa',
    header: 'Empresa',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('empresa')}
        </div>
      );
    },
  },
  {
    accessorKey: 'quantidadeCaixas',
    header: 'Quantidade de Caixas',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('quantidadeCaixas')}
        </div>
      );
    },
  },
  {
    accessorKey: 'quantidadeUnidades',
    header: 'Quantidade de Unidades',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('quantidadeUnidades')}</div>;
    },
  },
  {
    accessorKey: 'quantidadePaletes',
    header: 'Quantidade de Paletes',
    cell: ({ row }) => {
      const state = row.getValue('state') as string;
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {row.getValue('quantidadePaletes')}
        </div>
      );
    },
  },
  {
    accessorKey: 'status_palete',
    header: 'Status do Palete',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('status_palete')}
        </div>
      );
    },
  },
];
