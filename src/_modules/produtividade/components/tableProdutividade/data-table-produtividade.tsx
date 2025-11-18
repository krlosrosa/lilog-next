'use client';

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Inbox } from 'lucide-react';

import { ProdutividadeGetDataDto } from '@/_services/api/model';
import { CardProdutividade } from './cardProdutividade';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableProdutividade<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasRows = table.getRowModel().rows?.length > 0;

  return (
    // 1. Substituímos o <Table> por uma <div>.
    //    Mantive as classes de borda e sombra do seu wrapper original.
    <div className="">
      {hasRows ? (
        // 2. Criamos um container de lista para os cards.
        <div className="flex flex-col">
          {table.getRowModel().rows.map((row) => {
            const item = row.original as ProdutividadeGetDataDto;
            return <CardProdutividade key={row.id} produtividade={item} />;
          })}
        </div>
      ) : (
        // 3. Sua lógica de "Nenhum resultado" adaptada para
        //    funcionar fora de uma tabela.
        <div className="h-48 text-center">
          <div className="flex flex-col items-center justify-center gap-2 py-8">
            <div className="bg-muted/50 rounded-full p-3">
              <Inbox className="text-muted-foreground h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-foreground text-sm font-medium">
                Nenhum resultado encontrado
              </p>
              <p className="text-muted-foreground text-xs">
                Não há dados para exibir
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
