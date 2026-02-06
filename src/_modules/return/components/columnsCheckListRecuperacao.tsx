'use client';

import { GetAvariaDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsCheckListRecuperacao: ColumnDef<GetAvariaDto & {
  caixasRecuperadas?: number;
  unidadesRecuperadas?: number;
}>[] = [
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => (
      <div className="font-mono  font-semibold text-gray-800">
        {row.getValue('sku') as string}
      </div>
    ),
    size: 60,
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="text-gray-700 text-left min-w-0 max-w-full overflow-hidden break-words whitespace-normal">
        {row.getValue('descricao') as string}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
    cell: ({ row }) => (
      <div className=" text-gray-700 font-mono">
        {row.getValue('lote') as string || '-'}
      </div>
    ),
    size: 50,
  },
  {
    accessorKey: 'avaria',
    header: 'Avaria',
    cell: ({ row }) => (
      <div className="text-gray-700 min-w-0 max-w-full overflow-hidden break-words whitespace-normal">
        {row.getValue('avaria') as string || '-'}
      </div>
    ),
    size: 80,
  },
  {
    accessorKey: 'quantidadeCaixas',
    header: 'Cx. Avaria',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeCaixas') as number;
      return (
        <div className=" text-gray-800 font-bold text-center">
          {value ?? 0}
        </div>
      );
    },
    size: 45,
  },
  {
    accessorKey: 'quantidadeUnidades',
    header: 'Un. Avaria',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeUnidades') as number;
      return (
        <div className=" text-gray-800 font-bold text-center">
          {value ?? 0}
        </div>
      );
    },
    size: 45,
  },
  {
    id: 'caixasRecuperadas',
    header: 'Cx. Recuperadas',
    cell: ({ row }) => {
      return (
        <div className=" text-gray-600 text-center min-h-[15px]">
          {/* Campo em branco para preenchimento manual */}
        </div>
      );
    },
    size: 50,
  },
  {
    id: 'unidadesRecuperadas',
    header: 'Un. Recuperadas',
    cell: ({ row }) => {
      return (
        <div className=" text-gray-600 text-center min-h-[15px]">
          {/* Campo em branco para preenchimento manual */}
        </div>
      );
    },
    size: 50,
  },
  {
    id: 'saldoCaixa',
    header: 'Saldo Cx.',
    cell: ({ row }) => {
      const quantidadeCaixas = row.original.quantidadeCaixas ?? 0;
      const caixasRecuperadas = (row.original as any).caixasRecuperadas ?? 0;
      const saldo = quantidadeCaixas - caixasRecuperadas;
      return (
        <div className={` font-bold text-center ${saldo !== 0 ? 'text-red-600' : 'text-gray-500'}`}>
      
        </div>
      );
    },
    size: 45,
  },
  {
    id: 'saldoUnidade',
    header: 'Saldo Un.',
    cell: ({ row }) => {
      const quantidadeUnidades = row.original.quantidadeUnidades ?? 0;
      const unidadesRecuperadas = (row.original as any).unidadesRecuperadas ?? 0;
      const saldo = quantidadeUnidades - unidadesRecuperadas;
      return (
        <div className={` font-bold text-center ${saldo !== 0 ? 'text-red-600' : 'text-gray-500'}`}>

        </div>
      );
    },
    size: 45,
  },
];
