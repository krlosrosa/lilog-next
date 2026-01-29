'use client';

import { ResultadoDemandaDtoItensItem } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import { AlertTriangle } from 'lucide-react';

export const columnsItensResultReturn: ColumnDef<ResultadoDemandaDtoItensItem>[] = [ 
  {
    accessorKey: 'sku',  
    header: 'SKU',
    cell: ({ row }) => {
      const sku = row.getValue('sku') as string;
      return (
        <div className="font-mono text-[10px] font-semibold text-gray-800">
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
        <div className="text-[10px] text-gray-700 text-left max-w-[150px]" title={descricao}>
          {descricao}
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: 'quantidadeCaixasContabil',
    header: 'Cx. Cont.',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeCaixasContabil') as number;
      const fisico = row.getValue('quantidadeCaixasFisico') as number;
      const temDivergencia = value !== fisico;
      
      return (
        <div className={`text-[10px] font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
          {temDivergencia && <AlertTriangle className="inline h-3 w-3 ml-0.5 text-red-500" />}
        </div>
      );
    },
    size: 55,
  },
  {
    accessorKey: 'quantidadeUnidadesContabil',
    header: 'Un. Cont.',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeUnidadesContabil') as number;
      const fisico = row.getValue('quantidadeUnidadesFisico') as number;
      const temDivergencia = value !== fisico;
      
      return (
        <div className={`text-[10px] font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
        </div>
      );
    },
    size: 55,
  },
  {
    accessorKey: 'quantidadeCaixasFisico',
    header: 'Cx. Fís.',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeCaixasFisico') as number;
      const contabil = row.getValue('quantidadeCaixasContabil') as number;
      const temDivergencia = value !== contabil;
      
      return (
        <div className={`text-[10px] font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
        </div>
      );
    },
    size: 55,
  },
  {
    accessorKey: 'quantidadeUnidadesFisico',
    header: 'Un. Fís.',
    cell: ({ row }) => {
      const value = row.getValue('quantidadeUnidadesFisico') as number;
      const contabil = row.getValue('quantidadeUnidadesContabil') as number;
      const temDivergencia = value !== contabil;
      
      return (
        <div className={`text-[10px] font-medium ${
          temDivergencia ? 'text-red-600 font-bold' : 'text-gray-700'
        }`}>
          {value}
        </div>
      );
    },
    size: 55,
  },
  {
    id: 'saldo',
    header: 'Saldo',
    cell: ({ row }) => {
      const saldoCaixas = row.original.saldoCaixas ?? 0;
      const saldoUnidades = row.original.saldoUnidades ?? 0;
      
      const temDivergenciaCaixas = saldoCaixas !== 0;
      const temDivergenciaUnidades = saldoUnidades !== 0;
      
      if (!temDivergenciaCaixas && !temDivergenciaUnidades) {
        return <div className="text-[10px] text-gray-400">-</div>;
      }
      
      const partes: string[] = [];
      if (temDivergenciaCaixas) {
        partes.push(`${saldoCaixas > 0 ? '+' : ''}${saldoCaixas}cx`);
      }
      if (temDivergenciaUnidades) {
        partes.push(`${saldoUnidades > 0 ? '+' : ''}${saldoUnidades}un`);
      }
      
      const texto = partes.join(' | ');
      const temDivergencia = temDivergenciaCaixas || temDivergenciaUnidades;
      
      return (
        <div className={`text-[10px] font-bold ${
          temDivergencia 
            ? (saldoCaixas < 0 || saldoUnidades < 0) ? 'text-red-600' : 'text-green-600'
            : 'text-gray-500'
        }`}>
          {texto}
        </div>
      );
    },
    size: 90,
  },
  {
    accessorKey: 'avariaCaixas',
    header: 'Avaria',
    cell: ({ row }) => {
      const value = row.getValue('avariaCaixas') as number;
      const temAvaria = value > 0;
      
      return (
        <div className={`text-[10px] font-medium ${
          temAvaria ? 'text-orange-600 font-bold' : 'text-gray-400'
        }`}>
          {temAvaria ? `${value}` : '-'}
        </div>
      );
    },
    size: 50,
  },
];
