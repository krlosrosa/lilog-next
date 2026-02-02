'use client';

import { useRef } from "react";
import { useFinalizarDemandaPage } from "../hooks/useFinalizarDemandaPage";
import { HeaderResultadoReturn } from "../components/HeaderResultadoReturn";
import { DataTableItensResultReturn } from "../components/DataTableItensResultReturn";
import { columnsItensResultReturn } from "../components/columnsItensResultReturn";
import { useFinalizarDemandaReturn } from "../hooks/useFinalizarDemandaReturn";
import { usePrintDevolucao } from "../hooks/usePrint";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_shared/_components/ui/tabs";
import { Button } from "@/_shared/_components/ui/button";
import { Loader2, CheckCircle2, Printer, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { AssinaturasFinalizacao } from "../components/AssinaturasFinalizacao";
import CheckListRecuperacao from "./checkListRecuperacao";

export default function FinalizarDemandaView() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  
  const {
    demandaId,
    demanda,
    isLoadingDemanda,
    resultadoConferencia,
    isLoadingResultado,
    statusConferencia,
  } = useFinalizarDemandaPage();

  const { handleFinalizarDemanda, isFinalizandoDemanda } = useFinalizarDemandaReturn();
  const handlePrint = usePrintDevolucao({ printRef });

  const isFinalizado = demanda?.status !== 'CONFERENCIA_FINALIZADA' ;

  const handleFinalizar = () => {
    // Se já estiver finalizado, não faz nada (apenas navegação)
    if (isFinalizado) {
      return;
    }
    
    if (demandaId) {
      handleFinalizarDemanda(demandaId);
    }
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 space-y-6">
      {/* Header com botão voltar - Não imprime */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/return/demanda/${demandaId}`)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Finalizar Demanda</h1>
            <p className="text-muted-foreground">
              Revise a conferência e finalize a demanda
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="gap-2"
          >
            <Printer className="h-4 w-4" />
            Imprimir Demanda
          </Button>
          <Button
            onClick={handleFinalizar}
            disabled={isFinalizandoDemanda || !demandaId || isFinalizado}
            className="gap-2"
            variant={isFinalizado ? "outline" : "default"}
          >
            {isFinalizandoDemanda ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Finalizando...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                {isFinalizado ? 'Demanda Finalizada' : 'Finalizar Demanda'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Loading */}
      {(isLoadingDemanda || isLoadingResultado) && (
        <div className="flex items-center justify-center py-12 no-print">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Carregando informações da conferência...
            </p>
          </div>
        </div>
      )}

      {/* Conteúdo Principal - Área de Impressão */}
      {demandaId && !isLoadingDemanda && (
        <div ref={printRef} className="print:p-0 print:m-0">
          <Tabs defaultValue="conferencia" className="w-full print:m-0 print:p-0">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 no-print">
              <TabsTrigger value="conferencia">Conferência</TabsTrigger>
              <TabsTrigger value="anomalias">Anomalias</TabsTrigger>
              <TabsTrigger value="checkListRecuperacao">Check List de Recuperação</TabsTrigger>
            </TabsList>

            {/* Tab Conferência */}
            {resultadoConferencia && !isLoadingResultado ? (
              <TabsContent value="conferencia" className="space-y-6 mt-6 print:mt-0 print:space-y-4 print:p-0 print:m-0">
                {/* Container para Header e Tabela - Sempre juntos na impressão */}
                <div className="print:break-inside-avoid print:mb-0">
                  {/* Header com Informações */}
                  <HeaderResultadoReturn 
                    resultadoConferencia={resultadoConferencia}
                    statusConferencia={statusConferencia}
                  />

                  {/* Tabela de Itens */}
                  <DataTableItensResultReturn 
                    columns={columnsItensResultReturn} 
                    data={resultadoConferencia?.itens ?? []} 
                  />
                </div>

                {/* Assinaturas */}
                <AssinaturasFinalizacao />
              </TabsContent>
            ) : (
              <TabsContent value="conferencia" className="space-y-6 mt-6 no-print">
                <Card>
                  <CardContent className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">
                        Nenhum resultado de conferência encontrado
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Tab Anomalias */}
            <TabsContent value="anomalias" className="space-y-6 mt-6 no-print">
              <Card>
                <CardHeader>
                  <CardTitle>Anomalias</CardTitle>
                  <CardDescription>
                    Anomalias encontradas durante a conferência
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-2">
                      <p className="text-muted-foreground">
                        Funcionalidade em desenvolvimento
                      </p>
                      <p className="text-sm text-muted-foreground">
                        As anomalias serão exibidas aqui em breve
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Check List de Recuperação */}
            <TabsContent value="checkListRecuperacao" className="space-y-6 mt-6 print:mt-0 print:space-y-4 print:p-0 print:m-0">
              <CheckListRecuperacao />
            </TabsContent>
          </Tabs>
        </div>
      )}

    </div>
  );
}
