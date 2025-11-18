'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ProtocoloMapa } from '@/_modules/expedicao/services/protocolo-mapa';

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const columnsProtocolo: ColumnDef<ProtocoloMapa>[] = [
  {
    accessorKey: 'transporteId',
    header: 'Transporte',
    cell: ({ row }) => {
      const value = row.getValue('transporteId') as number;
      return <div className="font-medium">{value}</div>;
    },
  },
  {
    accessorKey: 'pesoLiquido',
    header: 'Peso Líquido',
    cell: ({ row }) => {
      const value = row.getValue('pesoLiquido') as number;
      return <div className="font-medium">{formatNumber(value)}</div>;
    },
  },
  {
    accessorKey: 'pesoBruto',
    header: 'Peso Bruto',
    cell: ({ row }) => {
      const value = row.getValue('pesoBruto') as number;
      return <div className="font-medium">{formatNumber(value)}</div>;
    },
  },
]