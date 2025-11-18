'use client';

import { Loader2, CalendarIcon } from "lucide-react";
import { useBuscarCortesRelatorio } from "../../hooks/useBuscarCortesRelatorio";
import { columnsRelatorioCorte } from "./columnsRelatorioCorte";
import { DataTableRelatorioCorte } from "./data-table-RelatorioCorte";
import { Button } from "@/_shared/_components/ui/button";
import { gerarExcel } from "@/_shared/utils/gerarExcel";
import { useProdutividadeFilter } from "@/_modules/produtividade/hooks/useProdutividadeFilter";
import { useState, useEffect } from "react";
import { Calendar } from "@/_shared/_components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/_shared/_components/ui/popover";
import { Label } from "@/_shared/_components/ui/label";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useUser } from "@/_shared/providers/UserContext";

export default function RelatorioCorte() {
  const { user } = useUser();
  const { cortesAberto, isBuscandoCortesAberto } = useBuscarCortesRelatorio();
  const { filters, setFilter } = useProdutividadeFilter();

  // Bloqueia renderização até o contexto estar pronto (evita erro de hidratação)
  if (!user?.centerSelect) {
    return null;
  }
  
  const [dataInicio, setDataInicio] = useState<Date | undefined>(
    filters.dataInicio ? new Date(filters.dataInicio) : undefined
  );
  const [dataFim, setDataFim] = useState<Date | undefined>(
    filters.dataFim ? new Date(filters.dataFim) : undefined
  );

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

  return (
    <div className="space-y-4 p-2">
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

      {/* Botão Gerar Excel */}
      <div className="flex items-center justify-between">
        <Button 
          onClick={() => gerarExcel(cortesAberto || [], 'relatorio-cortes')}
          disabled={isBuscandoCortesAberto}
        >
          Gerar Excel
        </Button>
      </div>

      {/* Tabela */}
      {isBuscandoCortesAberto ? (
        <div className="flex h-64 items-center justify-center rounded-lg border bg-background">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Carregando cortes...</p>
          </div>
        </div>
      ) : (
        <DataTableRelatorioCorte columns={columnsRelatorioCorte} data={cortesAberto || []} />
      )}
    </div>
  ) 
}