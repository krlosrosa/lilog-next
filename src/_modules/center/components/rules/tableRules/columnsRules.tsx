'use client';

import { EngineRuleGetDto } from '@/_services/api/model';
import { BuscarTodasRegrasDeMotorQueryResult } from '@/_services/api/service/center/center';
import { ColumnDef } from '@tanstack/react-table';
import { DeleteRule } from '../deleteRule';

export const columnsRules: ColumnDef<EngineRuleGetDto>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">{row.getValue('id')}</div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Descrição',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">{row.getValue('name')}</div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('description')}</div>;
    },
  },
  {
    accessorKey: 'processo',
    header: 'Processo',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('processo')}</div>;
    },
  },
  {
    accessorKey: 'enabled',
    header: 'Ativo',
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.getValue('enabled')}
          {row.getValue('enabled') ? 'Sim' : 'Não'}
        </div>
      );
    },
  },
  {
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <button
          onClick={row.getToggleExpandedHandler()}
          className="hover:bg-muted cursor-pointer rounded p-1 transition-colors"
          aria-label={
            row.getIsExpanded() ? 'Recolher detalhes' : 'Expandir detalhes'
          }
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </button>
      );
    },
  },

  {
    header: 'Deletar',
    cell: ({ row }) => {
      return (
        <div>
          
          <DeleteRule id={row.original.id.toString()} />
          </div>
      );
    },
  },
];
