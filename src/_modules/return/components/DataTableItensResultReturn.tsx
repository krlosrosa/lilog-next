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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface ResultadoDemandaDtoItensItem {
  saldoCaixas?: number;
  saldoUnidades?: number;
  avariaCaixas?: number;
  avariaUnidades?: number;
}

export function DataTableItensResultReturn<TData, TValue>({  
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Calcular totais de saldo separando falta e sobra
  const totalFaltaCaixas = (data as ResultadoDemandaDtoItensItem[]).reduce((acc, item) => {
    const saldo = item.saldoCaixas ?? 0;
    return acc + (saldo < 0 ? Math.abs(saldo) : 0);
  }, 0);

  const totalSobraCaixas = (data as ResultadoDemandaDtoItensItem[]).reduce((acc, item) => {
    const saldo = item.saldoCaixas ?? 0;
    return acc + (saldo > 0 ? saldo : 0);
  }, 0);

  const totalFaltaUnidades = (data as ResultadoDemandaDtoItensItem[]).reduce((acc, item) => {
    const saldo = item.saldoUnidades ?? 0;
    return acc + (saldo < 0 ? Math.abs(saldo) : 0);
  }, 0);

  const totalSobraUnidades = (data as ResultadoDemandaDtoItensItem[]).reduce((acc, item) => {
    const saldo = item.saldoUnidades ?? 0;
    return acc + (saldo > 0 ? saldo : 0);
  }, 0);

  // Formatar faltas
  const partesFalta: string[] = [];
  if (totalFaltaCaixas > 0) partesFalta.push(`-${totalFaltaCaixas}cx`);
  if (totalFaltaUnidades > 0) partesFalta.push(`-${totalFaltaUnidades}un`);
  const textoFalta = partesFalta.length > 0 ? partesFalta.join(' | ') : '-';

  // Formatar sobras
  const partesSobra: string[] = [];
  if (totalSobraCaixas > 0) partesSobra.push(`+${totalSobraCaixas}cx`);
  if (totalSobraUnidades > 0) partesSobra.push(`+${totalSobraUnidades}un`);
  const textoSobra = partesSobra.length > 0 ? partesSobra.join(' | ') : '-';

  // Calcular total de avaria
  const totalAvariaCaixas = (data as ResultadoDemandaDtoItensItem[]).reduce((acc, item) => {
    return acc + (item.avariaCaixas ?? 0);
  }, 0);

  const totalAvariaUnidades = (data as ResultadoDemandaDtoItensItem[]).reduce((acc, item) => {
    return acc + (item.avariaUnidades ?? 0);
  }, 0);

  // Formatar avaria
  const partesAvaria: string[] = [];
  if (totalAvariaCaixas > 0) partesAvaria.push(`${totalAvariaCaixas}cx`);
  if (totalAvariaUnidades > 0) partesAvaria.push(`${totalAvariaUnidades}un`);
  const textoAvaria = partesAvaria.length > 0 ? partesAvaria.join(' | ') : '-';

  const temFalta = totalFaltaCaixas > 0 || totalFaltaUnidades > 0;
  const temSobra = totalSobraCaixas > 0 || totalSobraUnidades > 0;
  const temAvaria = totalAvariaCaixas > 0 || totalAvariaUnidades > 0;
  const temDivergencia = temFalta || temSobra || temAvaria;

  return (
    <div className="border-2 border-slate-800">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-slate-800 hover:bg-slate-800 border-b-2 border-slate-800">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-white h-2 font-bold text-[10px] uppercase tracking-wide px-2 py-1 text-center border-r border-slate-600 last:border-r-0"
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
            <>
              {table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`hover:bg-transparent border-b border-slate-300 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1 px-2 text-[10px] text-center border-r border-slate-200 last:border-r-0">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* Linha de Total - Falta */}
              {(temFalta || temSobra) && (
                <TableRow className="bg-slate-100 border-t-2 border-slate-800 font-bold">
                  <TableCell colSpan={6} className="py-1.5 px-2 text-[10px] text-right border-r border-slate-300 font-bold">
                    TOTAL FALTA:
                  </TableCell>
                  <TableCell className="py-1 px-2 text-[10px] text-center border-r border-slate-300">
                    <div className={`font-bold ${
                      temFalta ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {textoFalta}
                    </div>
                  </TableCell>
                  <TableCell className="py-1.5 px-2 text-[10px] text-center"></TableCell>
                </TableRow>
              )}
              {/* Linha de Total - Sobra */}
              {(temFalta || temSobra) && (
                <TableRow className="bg-slate-100 font-bold">
                  <TableCell colSpan={6} className="py-1.5 px-2 text-[10px] text-right border-r border-slate-300 font-bold">
                    TOTAL SOBRA:
                  </TableCell>
                  <TableCell className="py-1.5 px-2 text-[10px] text-center border-r border-slate-300">
                    <div className={`font-bold ${
                      temSobra ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {textoSobra}
                    </div>
                  </TableCell>
                  <TableCell className="py-1.5 px-2 text-[10px] text-center"></TableCell>
                </TableRow>
              )}
              {/* Linha de Total - Avaria */}
              {(temFalta || temSobra || temAvaria) && (
                <TableRow className="bg-slate-100 font-bold">
                  <TableCell colSpan={6} className="py-1.5 px-2 text-[10px] text-right border-r border-slate-300 font-bold">
                    TOTAL AVARIA:
                  </TableCell>
                  <TableCell className="py-1.5 px-2 text-[10px] text-center border-r border-slate-300"></TableCell>
                  <TableCell className="py-1.5 px-2 text-[10px] text-center">
                    <div className={`font-bold ${
                      temAvaria ? 'text-orange-600' : 'text-gray-400'
                    }`}>
                      {textoAvaria}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-16 text-center bg-slate-50">
                <div className="flex flex-col items-center justify-center gap-1 py-2">
                  <AlertTriangle className="h-4 w-4 text-slate-400" />
                  <p className="text-slate-600 text-[9px] font-semibold">
                    Nenhuma Divergência Encontrada
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
