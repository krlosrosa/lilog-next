'use client';

import { ResultadoDemandaDtoItensItem } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const columnsItensResult: ColumnDef<ResultadoDemandaDtoItensItem>[] = [ 
  {
    accessorKey: 'sku',  
    header: 'SKU',
    cell: ({ row }) => {
      const sku = row.getValue('sku') as string;
      return (
        <div className="font-mono text-xs font-semibold text-gray-800">
          {sku}
        </div>
      );
    },
    size: 80,
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => {
      const descricao = row.getValue('descricao') as string;
      return (
        <div className="text-xs text-gray-700 line-clamp-2 text-left">
          {descricao}
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: 'quantidadeCaixasContabil',
    header: 'Cx. Contábil',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeCaixasContabil') as number;
      const fisico = row.getValue('quantidadeCaixasFisico') as number;
      const temDivergencia = value !== fisico;
      
      return (
        <div className={`text-xs font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
          {temDivergencia && <AlertTriangle className="inline h-3 w-3 ml-1 text-red-500" />}
        </div>
      );
    },
    size: 50,
  },
  {
    accessorKey: 'quantidadeUnidadesContabil',
    header: 'Un. Contábil',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeUnidadesContabil') as number;
      const fisico = row.getValue('quantidadeUnidadesFisico') as number;
      const temDivergencia = value !== fisico;
      
      return (
        <div className={`text-xs font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
        </div>
      );
    },
    size: 50,
  },
  {
    accessorKey: 'quantidadeCaixasFisico',
    header: 'Cx. Físico',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeCaixasFisico') as number;
      const contabil = row.getValue('quantidadeCaixasContabil') as number;
      const temDivergencia = value !== contabil;
      
      return (
        <div className={`text-xs font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
        </div>
      );
    },
    size: 50,
  },
  {
    accessorKey: 'quantidadeUnidadesFisico',
    header: 'Un. Físico',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeUnidadesFisico') as number;
      const contabil = row.getValue('quantidadeUnidadesContabil') as number;
      const temDivergencia = value !== contabil;
      
      return (
        <div className={`text-xs font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
        </div>
      );
    },
    size: 50,
  },
  {
    accessorKey: 'saldoCaixas',
    header: 'Saldo Cx.',
    cell: ({ row }) => {
      const value = row.getValue('saldoCaixas') as number;
      const temDivergencia = value !== 0;
      
      return (
        <div className={`text-xs font-bold ${
          temDivergencia 
            ? value > 0 ? 'text-green-600' : 'text-red-600'
            : 'text-gray-500'
        }`}>
          {value > 0 ? `+${value}` : value}
        </div>
      );
    },
    size: 50,
  },
  {
    accessorKey: 'saldoUnidades',
    header: 'Saldo Un.',
    cell: ({ row }) => {
      const value = row.getValue('saldoUnidades') as number;
      const temDivergencia = value !== 0;
      
      return (
        <div className={`text-xs font-bold ${
          temDivergencia 
            ? value > 0 ? 'text-green-600' : 'text-red-600'
            : 'text-gray-500'
        }`}>
          {value > 0 ? `+${value}` : value}
        </div>
      );
    },
    size: 50,
  },
  {
    accessorKey: 'avariaCaixas',
    header: 'Avaria',
    cell: ({ row }) => {
      const value = row.getValue('avariaCaixas') as number;
      const temAvaria = value > 0;
      
      return (
        <div className={`text-xs font-medium ${
          temAvaria ? 'text-orange-600 font-bold' : 'text-gray-400'
        }`}>
          {temAvaria ? `${value} cx.` : '-'}
        </div>
      );
    },
    size: 50,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const saldoCaixas = row.getValue('saldoCaixas') as number;
      const saldoUnidades = row.getValue('saldoUnidades') as number;
      const avaria = row.getValue('avariaCaixas') as number;
      
      const temDivergencia = saldoCaixas !== 0 || saldoUnidades !== 0;
      const temAvaria = avaria > 0;
      
      return (
        <div className="flex justify-center">
          {!temDivergencia && !temAvaria ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : temAvaria ? (
            <div className="text-xs font-medium text-orange-600">AVARIA</div>
          ) : (
            <div className="text-xs font-bold text-red-600">DIVERG.</div>
          )}
        </div>
      );
    },
    size: 60,
  },
];