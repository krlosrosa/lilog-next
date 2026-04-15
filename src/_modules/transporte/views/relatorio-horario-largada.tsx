'use client';

import { useMemo, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FileSpreadsheet, Inbox } from 'lucide-react';

import { useGetViewTerminoCarregamento } from '@/_services/api/service/transporte/transporte';
import type { TerminoCarregamentoGetDto } from '@/_services/api/model';
import { useUser } from '@/_shared/providers/UserContext';
import { gerarExcel } from '@/_shared/utils/gerarExcel';
import { Alert, AlertDescription, AlertTitle } from '@/_shared/_components/ui/alert';
import { Button } from '@/_shared/_components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import { Input } from '@/_shared/_components/ui/input';
import { Label } from '@/_shared/_components/ui/label';
import { Skeleton } from '@/_shared/_components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/_shared/_components/ui/table';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const formatDataExpedicao = (value: string | null | undefined) => {
  if (!value) return '—';
  try {
    return format(new Date(value), 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return value;
  }
};

const columns: ColumnDef<TerminoCarregamentoGetDto>[] = [
  {
    accessorKey: 'numeroTransporte',
    header: 'Nº Transporte',
    cell: ({ row }) => (
      <div className="text-foreground font-medium">
        {row.original.numeroTransporte ?? '—'}
      </div>
    ),
  },
  {
    accessorKey: 'dataExpedicao',
    header: 'Data Expedição',
    cell: ({ row }) => (
      <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
        {formatDataExpedicao(row.original.dataExpedicao)}
      </div>
    ),
  },
  {
    accessorKey: 'horarioTerminoCarregamento',
    header: 'Horário de Largada',
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.horarioTerminoCarregamento ?? '—'}
      </div>
    ),
  },
  {
    accessorKey: 'centerId',
    header: 'Centro',
    cell: ({ row }) => (
      <div className="text-muted-foreground text-sm">
        {row.original.centerId ?? '—'}
      </div>
    ),
  },
];

const buildExcelRows = (
  rows: TerminoCarregamentoGetDto[],
): Record<string, unknown>[] =>
  rows.map((row) => ({
    'Nº Transporte': row.numeroTransporte ?? '',
    'Data Expedição': row.dataExpedicao ?? '',
    'Horário de Largada': row.horarioTerminoCarregamento ?? '',
    Centro: row.centerId ?? '',
  }));

export default function RelatorioHorarioLargadaView() {
  const { user } = useUser();
  const centerId = user?.centerSelect ?? '';

  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');

  const params = useMemo(
    () => ({
      centerId,
      dataInicial,
      dataFinal,
    }),
    [centerId, dataInicial, dataFinal],
  );

  const datasValidas =
    DATE_RE.test(dataInicial) &&
    DATE_RE.test(dataFinal) &&
    dataInicial <= dataFinal;

  const canQuery = !!centerId && datasValidas;

  const { data, isFetching, isError, error, isSuccess } =
    useGetViewTerminoCarregamento(params, {
      query: {
        enabled: canQuery,
      },
    });

  const rows = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data],
  );
  const rowCount = rows.length;

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleExport = () => {
    if (!canQuery) return;
    if (rowCount === 0) return;
    gerarExcel(
      buildExcelRows(rows),
      `horario-largada-transporte_${dataInicial}_${dataFinal}`,
    );
  };

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Relatório — horário de largada por transporte
        </h1>
        <p className="text-muted-foreground text-sm">
          Informe data inicial e final para carregar os dados e exportar o
          relatório em Excel.
        </p>
      </div>

      {!centerId ? (
        <Alert variant="destructive">
          <AlertTitle>Centro não selecionado</AlertTitle>
          <AlertDescription>
            Selecione um centro na sua conta para consultar os dados.
          </AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileSpreadsheet className="size-5" />
            Período
          </CardTitle>
          <CardDescription>
            Datas no formato exigido pela API (YYYY-MM-DD).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="data-inicial-horario-largada">
                Data inicial <span className="text-destructive">*</span>
              </Label>
              <Input
                id="data-inicial-horario-largada"
                type="date"
                required
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-final-horario-largada">
                Data final <span className="text-destructive">*</span>
              </Label>
              <Input
                id="data-final-horario-largada"
                type="date"
                required
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
                aria-required="true"
              />
            </div>
          </div>

          {dataInicial && dataFinal && !datasValidas ? (
            <Alert variant="destructive">
              <AlertTitle>Período inválido</AlertTitle>
              <AlertDescription>
                A data final deve ser igual ou posterior à data inicial.
              </AlertDescription>
            </Alert>
          ) : null}

          {isError ? (
            <Alert variant="destructive">
              <AlertTitle>Erro ao carregar dados</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : 'Falha na requisição.'}
              </AlertDescription>
            </Alert>
          ) : null}

          {isSuccess && canQuery ? (
            <p className="text-muted-foreground text-sm">
              {rowCount === 0
                ? 'Nenhum registro retornado para o período.'
                : `${rowCount} registro(s) carregado(s).`}
            </p>
          ) : null}

          <Button
            type="button"
            onClick={handleExport}
            disabled={!canQuery || isFetching || isError || rowCount === 0}
            className="gap-2"
            aria-label="Baixar relatório em Excel"
          >
            <FileSpreadsheet className="size-4" aria-hidden />
            {isFetching ? 'Carregando…' : 'Baixar Excel'}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Pré-visualização</h2>
        {canQuery && isFetching ? (
          <div className="bg-card space-y-2 rounded-lg border p-4 shadow-sm">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="bg-card overflow-hidden rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-foreground h-12 font-semibold"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-2 py-8">
                        <div className="bg-muted/50 rounded-full p-3">
                          <Inbox
                            className="text-muted-foreground h-6 w-6"
                            aria-hidden
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-foreground text-sm font-medium">
                            {canQuery && !isFetching
                              ? 'Nenhum resultado encontrado'
                              : 'Informe o período para carregar os dados'}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {canQuery && !isFetching
                              ? 'Não há dados para exibir nesta tabela'
                              : 'Selecione data inicial e final válidas'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
