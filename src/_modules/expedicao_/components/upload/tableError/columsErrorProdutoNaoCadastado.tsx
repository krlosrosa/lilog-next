'use client';

import { ErrorField, ProdutoNaoEncontrado } from '@/_modules/expedicao_/others/types/uploadErro';
import { CenterDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsErrorsExpedicao: ColumnDef<ProdutoNaoEncontrado>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('id')}
        </div>
      );
    },
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('descricao')}</div>
      );
    },
  },
];
