'use client';

import { DemandaDtoPaletesItem } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsPaletesDemanda: ColumnDef<DemandaDtoPaletesItem>[] = [  
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
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('id')}</div>
      );
    },
  },
  {
    accessorKey: 'transporteId',
    header: 'Transporte',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('transporteId')}</div>
      );
    },
  },
  {
    accessorKey: 'tipoProcesso',
    header: 'Tipo de Processo',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('tipoProcesso')}</div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('status')}</div>
      );
    },
  },
  {
    accessorKey: 'enderecoVisitado',
    header: 'Endereço Visitado',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('enderecoVisitado')}</div>
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
];
