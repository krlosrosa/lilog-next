'use client';

import { ErrorField } from '@/_modules/expedicao_/others/types/uploadErro';
import { CenterDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsErrorsExpedicao: ColumnDef<ErrorField>[] = [
  {
    accessorKey: 'message',
    header: 'Erro',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('message')}
        </div>
      );
    },
  },
  {
    accessorKey: 'arquivo',
    header: 'Arquivo',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('arquivo')}</div>
      );
    },
  },
  {
    accessorKey: 'codigo',
    header: 'Código',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('codigo')}</div>;
    },
  },
  {
    accessorKey: 'linha',
    header: 'Linha',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('linha')}</div>;
    },
  },
  {
    accessorKey: 'campo',
    header: 'Campo',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('campo')}</div>;
    },
  },
];
