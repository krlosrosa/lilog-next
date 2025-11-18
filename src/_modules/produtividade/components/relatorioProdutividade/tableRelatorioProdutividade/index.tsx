'use client';

import { columnsRelatorioProdutividade } from "./columnsRelatorioProdutividade";
import { DataTableRelatorioProdutividade } from "./data-table-RelatorioProdutividade";
import { useGetProdutividadeRelatorio } from "@/_modules/produtividade/hooks/queries/useGetProdutividadeRelatorio";
import { useProdutividadeFilter } from "@/_modules/produtividade/hooks/useProdutividadeFilter";
import { Button } from "@/_shared/_components/ui/button";
import { gerarExcel } from "@/_shared/utils/gerarExcel";
import { useEffect, useState } from "react";
import { Calendar } from "@/_shared/_components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/_shared/_components/ui/popover";
import { Label } from "@/_shared/_components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export function TableRelatorioProdutividade() {

  const { filters, setFilters, setFilter } = useProdutividadeFilter();
  const { produtividade, isBuscandoProdutividade, table } = useGetProdutividadeRelatorio();
  
  const [dataInicio, setDataInicio] = useState<Date | undefined>(
    filters.dataInicio ? new Date(filters.dataInicio) : undefined
  );
  const [dataFim, setDataFim] = useState<Date | undefined>(
    filters.dataFim ? new Date(filters.dataFim) : undefined
  );

  useEffect(() => {
    setFilters({ dataInicio: '2025-10-01', dataFim: '2025-11-30', processo: 'SEPARACAO' });
  },[setFilters])

  // Atualiza filtros quando as datas mudarem
  useEffect(() => {
    if (dataInicio) {
      setFilter('dataInicio', format(dataInicio, 'yyyy-MM-dd'));
    } else {
      setFilter('dataInicio', null);
    }
  }, [dataInicio, setFilter]);

  useEffect(() => {
    if (dataFim) {
      setFilter('dataFim', format(dataFim, 'yyyy-MM-dd'));
    } else {
      setFilter('dataFim', null);
    }
  }, [dataFim, setFilter]);

  if (isBuscandoProdutividade) {
    return <div>Carregando...</div>;
  }


  return (
    <div className="space-y-4">
      {/* Filtro de Intervalo de Datas */}
      <div className="bg-card rounded-lg border p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="dataInicio" className="text-sm font-medium">
              Data Início
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dataInicio"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataInicio && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataInicio ? (
                    format(dataInicio, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione a data inicial</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataInicio}
                  onSelect={setDataInicio}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataFim" className="text-sm font-medium">
              Data Fim
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dataFim"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataFim && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataFim ? (
                    format(dataFim, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Selecione a data final</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataFim}
                  onSelect={setDataFim}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Botão Gerar Excel e Tabela */}
      <div className="flex items-center justify-between">
        <Button onClick={() => gerarExcel(produtividade || [], 'relatorio-produtividade')}>
          Gerar Excel
        </Button>
      </div>

      <DataTableRelatorioProdutividade
        columns={columnsRelatorioProdutividade}
        data={produtividade || []}
      />
    </div>
  )
}