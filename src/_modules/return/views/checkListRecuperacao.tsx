'use client';

import { useRef, useMemo } from "react";
import { useCheckListRecuperacao } from "../hooks/useCheckListRecuperacao";
import { DataTableCheckListRecuperacao } from "../components/DataTableCheckListRecuperacao";
import { columnsCheckListRecuperacao } from "../components/columnsCheckListRecuperacao";
import { Loader2, Printer } from "lucide-react";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Button } from "@/_shared/_components/ui/button";
import { GetAvariaDto } from "@/_services/api/model";
import { usePrintLandscape } from "../hooks/usePrintLandscape";

export default function CheckListRecuperacao() {
  const printRef = useRef<HTMLDivElement>(null);
  const { demandaId, avarias, isLoading, error } = useCheckListRecuperacao();
  const handlePrint = usePrintLandscape({ printRef });

  // Preparar dados com campos de recuperação inicializados em 0
  const dataWithRecuperacao = useMemo(() => {
    if (!avarias) return [];
    return avarias.map((avaria: GetAvariaDto) => ({
      ...avaria,
      caixasRecuperadas: 0,
      unidadesRecuperadas: 0,
    }));
  }, [avarias]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12 no-print">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">
            Carregando checklist de recuperação...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="no-print">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <p className="text-destructive font-semibold">Erro ao carregar dados</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!avarias || avarias.length === 0) {
    return (
      <Card className="no-print">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Nenhuma avaria encontrada para esta demanda
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 print:p-0 print:m-0 print:space-y-1">
      {/* Botão de Impressão - Não imprime */}
      <div className="flex justify-end no-print">
        <Button
          variant="outline"
          onClick={handlePrint}
          className="gap-2"
        >
          <Printer className="h-4 w-4" />
          Imprimir Checklist
        </Button>
      </div>

      {/* Conteúdo para Impressão */}
      <div ref={printRef} className="print:p-0 print:m-0">
        {/* Header do Checklist */}
        <div className="border-2 border-slate-800 bg-white print:break-inside-avoid">
          <div className="bg-slate-800 px-2 py-1 border-b-2 border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-[10px] font-bold uppercase tracking-wide">
                  Checklist de Recuperação
                </h1>
                <p className="text-slate-300 text-[8px] mt-0.5">
                  Demanda #{demandaId}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Avaria */}
        <div className="print:break-inside-avoid">
          <DataTableCheckListRecuperacao 
            columns={columnsCheckListRecuperacao} 
            data={dataWithRecuperacao} 
          />
        </div>
      </div>
    </div>
  );
}
