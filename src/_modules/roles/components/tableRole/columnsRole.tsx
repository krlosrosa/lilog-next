'use client';

import { RoleDtoOutput } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsRole: ColumnDef<RoleDtoOutput>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'containerId',
    header: 'Container ID',
  },
];
