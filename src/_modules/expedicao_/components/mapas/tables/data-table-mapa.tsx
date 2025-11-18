'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Inbox } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_shared/_components/ui/table';
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnsExibir?: string[];
  transporteId?: string;
}

export function DataTableMapa<TData, TValue>({
  columns,
  data,
  columnsExibir,
  transporteId,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState({
    endereco: columnsExibir?.includes('endereco') ? true : false,
    sku: columnsExibir?.includes('sku') ? true : false,
    descricao: columnsExibir?.includes('descricao') ? true : false,
    lote: columnsExibir?.includes('lote') ? true : false,
    dtFabricacao: columnsExibir?.includes('dtFabricacao') ? true : false,
    dtMaxima: columnsExibir?.includes('dtMaxima') ? true : false,
    quantidadeCaixas: columnsExibir?.includes('quantidadeCaixas')
      ? true
      : false,
    quantidade: columnsExibir?.includes('quantidade') ? true : false,
    quantidadePaletes: columnsExibir?.includes('quantidadePaletes')
      ? true
      : false,
    faixa: columnsExibir?.includes('faixa') ? true : false,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
      columnOrder: columnsExibir,
    },
  });

  return (
    <div className="overflow-hidden border shadow-sm">
      <Table className="m-0 w-full p-0">
        <TableHeader>
          {transporteId && (
            <TableRow className="m-0 h-auto! border-0 p-0 leading-none">
              <TableHead
                colSpan={table.getVisibleLeafColumns().length}
                className="text-foreground m-0! h-auto! p-0! px-0! py-1! text-center align-middle text-[10px] leading-none! font-semibold"
              >
                {transporteId}
              </TableHead>
            </TableRow>
          )}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-foreground text-center text-[12px] font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const item = row.original as any;
              const faixa = item?.faixa;
              const isVerde = faixa?.toUpperCase() === 'VERDE';
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`hover:bg-muted/50 transition-colors ${!isVerde ? 'font-bold' : ''}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-0 py-1 text-center text-[11px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <div className="bg-muted/50 rounded-full p-3">
                    <Inbox className="text-muted-foreground h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-foreground text-sm font-medium">
                      Nenhum resultado encontrado
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Não há dados para exibir nesta tabela
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
