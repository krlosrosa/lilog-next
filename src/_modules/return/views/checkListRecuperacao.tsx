'use client';

import { useRef, useMemo } from "react";
import { useCheckListRecuperacao } from "../hooks/useCheckListRecuperacao";
import { DataTableCheckListRecuperacao } from "../components/DataTableCheckListRecuperacao";
import { columnsCheckListRecuperacao } from "../components/columnsCheckListRecuperacao";
import { Loader2, Printer, Truck, UserCheck, FileText, Package, ClipboardCheck } from "lucide-react";
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
    <div className="space-y-6 print:p-0 print:m-0 print:space-y-2">
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

      {/* Conteúdo para Impressão - A4 paisagem: escala para caber em uma página */}
      <div ref={printRef} className="print-fit-a4-landscape">
        <div className="print-fit-a4-landscape-inner">
        {/* Header do Checklist - Redesign completo */}
        <div className="border border-border bg-card print:break-inside-avoid shadow-sm print:shadow-none">
          {/* Cabeçalho principal */}
          <div className="bg-primary px-6 py-4 print:px-4 print:py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary-foreground/10 p-2 rounded-lg">
                  <ClipboardCheck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-primary-foreground text-xl font-bold tracking-tight print:text-lg">
                    CHECKLIST DE RECUPERAÇÃO DE AVARIAS
                  </h1>
                  <p className="text-primary-foreground/80 text-sm mt-1 print:text-xs">
                    Controle de produtos avariados - Processo de recuperação
                  </p>
                </div>
              </div>
              <div className="bg-primary-foreground/10 px-3 py-2 rounded-lg border border-primary-foreground/20">
                <div className="text-center">
                  <p className="text-primary-foreground text-xs font-medium print:text-[10px]">DEMANDA</p>
                  <p className="text-primary-foreground text-2xl font-bold print:text-xl">#{demandaId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="px-6 py-4 print:px-4 print:py-3 border-b border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:grid-cols-3 print:gap-2">
              {/* Placa */}
              <div className="flex items-center gap-2">
                <div className="bg-muted p-2 rounded-md">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium print:text-[10px]">PLACA DO VEÍCULO</p>
                  <p className="text-sm font-semibold text-foreground print:text-xs">
                    {avarias[0]?.placa || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Conferente Original */}
              <div className="flex items-center gap-2">
                <div className="bg-muted p-2 rounded-md">
                  <UserCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium print:text-[10px]">CONFERENTE (RECEPÇÃO)</p>
                  <p className="text-sm font-semibold text-foreground print:text-xs">
                    {avarias[0]?.conferente || 'N/A'}
                    <span className="text-xs text-muted-foreground ml-2 font-normal print:text-[10px]">
                      ID: {avarias[0]?.idConferente || 'N/A'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Data/Hora */}
              <div className="flex items-center gap-2">
                <div className="bg-muted p-2 rounded-md">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium print:text-[10px]">DATA DE IMPRESSÃO</p>
                  <p className="text-sm font-semibold text-foreground print:text-xs">
                    {new Date().toLocaleDateString('pt-BR')}
                    <span className="text-xs text-muted-foreground ml-2 font-normal print:text-[10px]">
                      {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instruções */}
          <div className="px-6 py-3 print:px-4 print:py-2 bg-muted border-b border-border">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                <div className="bg-muted-foreground/10 p-1 rounded">
                  <Package className="h-3 w-3 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground print:text-[10px]">
                  ATENÇÃO CONFERENTE DE RECUPERAÇÃO:
                </p>
                <p className="text-xs text-muted-foreground print:text-[10px]">
                  • Informe as quantidades que foram recuperadas de cada item avariado<br />
                  • Ao concluir, assine no espaço abaixo e entregue este documento ao setor de controle
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Avaria - compacta na impressão para caber em A4 paisagem */}
        <div className="mt-4 print:mt-1 print:break-inside-avoid print:min-h-0 print:flex-1 print:overflow-hidden">
          <DataTableCheckListRecuperacao
            columns={columnsCheckListRecuperacao}
            data={dataWithRecuperacao}
          />
        </div>

        {/* Rodapé para assinaturas - APENAS DO CONFERENTE DE RECUPERAÇÃO */}
        <div className="mt-6 print:mt-4 print:break-inside-avoid">
          <div className="border border-border bg-card p-6 print:p-4">
            {/* Título da seção */}
            <div className="mb-6 print:mb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground print:text-xs">
                  DECLARAÇÃO DE RECUPERAÇÃO
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1 print:text-[10px]">
                A ser preenchida pelo conferente responsável pela recuperação dos itens avariados
              </p>
            </div>

            {/* Assinatura Conferente de Recuperação */}
            <div className="gap-8 flex w-full mt-8">
              <div className="">
                <div className="border-b border-dashed border-border pb-3 print:pb-2">
                </div>
                <p className="text-xs mt-2 font-medium text-foreground mb-2 print:text-[10px]">
                  ID DO COLABORADOR
                </p>
              </div>
              <div className="flex-1">
                <div className="border-b border-dashed border-border pb-3 print:pb-2">

                </div>
                <p className="text-xs mt-2 font-medium text-foreground mb-2 print:text-[10px]">
                  NOME DO CONFERENTE DE RECUPERAÇÃO
                </p>
              </div>
              {/* Observações */}
            </div>
            <div className="mt-6 print:mt-4">
              <p className="text-xs font-medium text-foreground mb-2 print:text-[10px]">
                OBSERVAÇÕES (opcional)
              </p>
              <div className="border border-dashed border-border rounded p-3 print:p-2 min-h-[60px]">
                <p className="text-xs text-muted-foreground print:text-[10px]">
                  Espaço para observações sobre a recuperação realizada...
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}