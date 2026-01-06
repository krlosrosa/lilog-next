'use client';

import { CenterDto, ReturnInfoGeralRavexNotasItemItensItem } from '@/_services/api/model';
import { Input } from '@/_shared/_components/ui/input';
import { ColumnDef } from '@tanstack/react-table';

export const columnsItensRavex: ColumnDef<ReturnInfoGeralRavexNotasItemItensItem>[] = [
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
      const quantidadeRavex = row.getValue('quantidadeRavex') as number;
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
      const quantidadeCaixas = row.getValue('quantidadeCaixas') as number;
      return <div className="font-medium">{quantidadeCaixas}</div>;
    },
  },
  {
    accessorKey: 'quantidadeUnidades',
    header: 'Quantidade Unidades',
    cell: ({ row }) => {
      const quantidadeUnidades = row.getValue('quantidadeUnidades') as number;
      return <div className="font-medium">{quantidadeUnidades}</div>;
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
      const unPorCaixa = row.getValue('unPorCaixa') as number;
      return <div className="font-medium">{unPorCaixa}</div>;
    },
  },
  {
    id: 'inputDecimal',
    header: 'Decimal',
    cell: ({ row }) => {
      const decimal = row.getValue('decimal') as number;
      return <Input className="font-medium p-0 m-0" onChange={(e) => {
        console.log(e.target.value);
      }} />;
    },
  },
];
