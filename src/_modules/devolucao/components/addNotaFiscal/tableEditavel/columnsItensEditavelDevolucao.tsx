'use client';

import { ReturnInfoGeralRavexNotasItemItensItem } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';


export const columnsItensEditavelDevolucao: ColumnDef<ReturnInfoGeralRavexNotasItemItensItem>[] = [ 
  {
    accessorKey: 'sku',  
    header: 'SKU',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('sku')}
        </div>
      );
    },
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
            {row.getValue('descricao')}
        </div>
      );
    },
  },
  {
    accessorKey: 'pesoLiquido',
    header: 'Peso Líquido',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('pesoLiquido')}</div>;
    },
  },
  {
    accessorKey: 'quantidadeRavex',
      header: 'Quantidade Ravex',
    cell: ({ row }) => {
      const quantidadeRavex = row.getValue('quantidadeRavex') as string;
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {quantidadeRavex}
        </div>
      );
    },
  },
  {
    accessorKey: 'quantidadeCaixas',
    header: 'Quantidade Caixas',
    cell: ({ row }) => {
      const quantidadeCaixas = row.getValue('quantidadeCaixas') as string;
      return <div className="font-medium">{quantidadeCaixas}</div>;
    },
  },
  {
    accessorKey: 'quantidadeUnidades',
    header: 'Carga Segregada',
    cell: ({ row }) => {
      const cargaSegregada = row.getValue('cargaSegregada') as boolean;
      return <div className="font-medium">{cargaSegregada ? 'Sim' : 'Não'}</div>;
    },
  },
  {
    accessorKey: 'fatorConversao',
    header: 'Fator de Conversão',
    cell: ({ row }) => {
      const fatorConversao = row.getValue('fatorConversao') as number;
      return <div className="font-medium">{fatorConversao}</div>;
    },
  },
  {
      accessorKey: 'unPorCaixa',
    header: 'Unidades por Caixa',
    cell: ({ row }) => {
      const unPorCaixa = row.getValue('unPorCaixa') as string;
      return <div className="font-medium">{unPorCaixa}</div>;
    },
  },
  {
    accessorKey: 'decimal',
    header: 'Decimal',
    cell: ({ row }) => {
      const decimal = row.getValue('decimal') as string;
      return <div className="font-medium">{decimal}</div>;
    },
  },
];
