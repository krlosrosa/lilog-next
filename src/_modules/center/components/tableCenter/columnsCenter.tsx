'use client';

import { CenterDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsCenter: ColumnDef<CenterDto>[] = [
  {
    accessorKey: 'centerId',
    header: 'Centro',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('centerId')}
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('description')}
        </div>
      );
    },
  },
  {
    accessorKey: 'cluster',
    header: 'Cluster',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('cluster')}</div>;
    },
  },
  {
    accessorKey: 'state',
    header: 'Estado',
    cell: ({ row }) => {
      const state = row.getValue('state') as string;
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {state}
        </div>
      );
    },
  },
];
