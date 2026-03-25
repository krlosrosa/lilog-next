'use client';

import { useMemo, useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { useListVwProdutividadeDash } from '@/_services/api/service/produtividade-dash/produtividade-dash';
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

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function normalizeRows(raw: unknown): Record<string, unknown>[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw.filter(
      (r) => r != null && typeof r === 'object',
    ) as Record<string, unknown>[];
  }
  if (typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    for (const v of Object.values(obj)) {
      if (
        Array.isArray(v) &&
        v.every(
          (item) =>
            item != null && typeof item === 'object' && !Array.isArray(item),
        )
      ) {
        return v as Record<string, unknown>[];
      }
    }
    return [obj];
  }
  return [];
}

export default function DashboardXlsxView() {
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
    useListVwProdutividadeDash(params, {
      query: {
        enabled: canQuery,
      },
    });

  const rows = normalizeRows(data as unknown);
  const rowCount = rows.length;

  const handleExport = () => {
    if (!canQuery) return;
    if (rowCount === 0) return;
    gerarExcel(rows, `produtividade-dash_${dataInicial}_${dataFinal}`);
  };

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Relatório Excel — dashboard produtividade
        </h1>
        <p className="text-muted-foreground text-sm">
          Informe data inicial e final (obrigatórios) para carregar os dados da
          view e gerar o arquivo .xlsx.
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
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="data-inicial">
                Data inicial <span className="text-destructive">*</span>
              </Label>
              <Input
                id="data-inicial"
                type="date"
                required
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-final">
                Data final <span className="text-destructive">*</span>
              </Label>
              <Input
                id="data-final"
                type="date"
                required
                value={dataFinal}
                onChange={(e) => setDataFinal(e.target.value)}
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
            disabled={
              !canQuery || isFetching || isError || rowCount === 0
            }
            className="gap-2"
          >
            <FileSpreadsheet className="size-4" />
            {isFetching ? 'Carregando…' : 'Baixar Excel'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
