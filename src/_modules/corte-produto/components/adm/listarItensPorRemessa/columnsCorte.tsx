'use client';

import { AugmentedZodDto } from '@/_services/api/model';
import { Checkbox } from '@/_shared/_components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { memo } from 'react';
import InserirItemCorte from '../../operacional/inserirItemCorte';

// Memoizar componente de célula para evitar recriação
const CellRenderer = memo(({ value }: { value: string | number | undefined }) => {
  return <div className="font-medium">{value}</div>;
});
CellRenderer.displayName = 'CellRenderer';

// Memoizar componente de ação
const ActionCell = memo(({ item }: { item: AugmentedZodDto }) => {
  return <InserirItemCorte item={item} />;
});
ActionCell.displayName = 'ActionCell';

export const columnsItensPorRemessa: ColumnDef<AugmentedZodDto>[] = [
  {
    accessorKey: 'remessa',
    header: 'Remessa',
    cell: ({ row }) => <CellRenderer value={row.getValue('remessa')} />,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <CellRenderer value={row.getValue('sku')} />,
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => <CellRenderer value={row.getValue('descricao')} />,
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
    cell: ({ row }) => <CellRenderer value={row.getValue('lote')} />,
  },
  {
    accessorKey: 'caixas',
    header: 'Caixas',
    cell: ({ row }) => <CellRenderer value={row.getValue('caixas')} />,
  },
  {
    accessorKey: 'quantidade',
    header: 'Unidades',
    cell: ({ row }) => <CellRenderer value={row.getValue('quantidade')} />,
  },
  {
    accessorKey: 'quantidadeCortada',
    header: 'Unidades Cortadas',
    cell: ({ row }) => <div className={`text-right whitespace-nowrap ${row.original?.quantidadeCortada !== undefined && row.original?.quantidadeCortada > 0 ? 'text-destructive' : ''}`}>{row.getValue('quantidadeCortada')}</div>,
  },
  {
    accessorKey: 'caixasCortadas',
    header: 'Caixas Cortadas',
    cell: ({ row }) => <div className={`text-right whitespace-nowrap ${row.original?.caixasCortadas !== undefined && row.original?.caixasCortadas > 0 ? 'text-destructive' : ''}`}>{row.getValue('caixasCortadas')}</div>,
  },
];
