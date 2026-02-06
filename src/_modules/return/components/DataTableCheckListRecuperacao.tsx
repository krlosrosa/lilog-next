'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AlertTriangle } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_shared/_components/ui/table';
import { GetAvariaDto } from '@/_services/api/model';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableCheckListRecuperacao<TData, TValue>({  
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border-2 border-slate-800 print:border print:border-border print:max-w-full print:overflow-hidden">
      <Table className="print:table-fixed print:w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-slate-800 hover:bg-slate-800 border-b-2 border-slate-800 print:border-b print:border-border">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-white h-6 font-bold text-[12px] uppercase tracking-wide px-1 py-0.5 text-center border-r border-slate-600 last:border-r-0 overflow-hidden print:h-auto print:py-1 print:px-1 print:text-[9px] print:font-semibold"
                  style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`hover:bg-transparent border-b border-slate-300 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} print:border-b print:border-border`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-2 px-1 text-[12px] border-r border-slate-200 last:border-r-0 align-top overflow-hidden print:py-0.5 print:px-1 print:text-[9px]"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-12 text-center bg-slate-50">
                <div className="flex flex-col items-center justify-center gap-1 py-1">
                  <AlertTriangle className="h-3 w-3 text-slate-400" />
                  <p className="text-slate-600 text-[8px] font-semibold">Nenhuma avaria encontrada</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
