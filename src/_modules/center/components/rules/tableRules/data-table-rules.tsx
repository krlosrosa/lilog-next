'use client';

import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import { EditRuleEngine } from '../editRule';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableRules<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true, // Permite que todas as linhas sejam expansíveis
    state: {
      expanded: expanded, // must pass expanded state back to the table
    },
    onExpandedChange: setExpanded
  });

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <TableRow key={`${headerGroup.id}-${index}`} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="h-12 font-semibold text-foreground"
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
            table.getRowModel().rows.map((row) => (
              <>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-2"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>

                {row.getIsExpanded() && (
                  <TableRow>
                    <TableCell
                      colSpan={row.getAllCells().length}
                      className="bg-muted/30 p-0"
                    >
                      <div className="p-4">
                        {/* Seu componente personalizado aqui */}
                        <div className="space-y-2">
                          <EditRuleEngine 
                            id={(row.original as any)?.id}
                            ativo={(row.original as any)?.enabled}
                            name={(row.original as any)?.name}
                            description={(row.original as any)?.description}
                            processo={(row.original as any)?.processo}
                            conditions={(row.original as any)?.conditions}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <div className="bg-muted/50 rounded-full p-3">
                    <Inbox className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Nenhum resultado encontrado
                    </p>
                    <p className="text-xs text-muted-foreground">
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
