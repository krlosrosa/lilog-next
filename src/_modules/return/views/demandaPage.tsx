'use client';

import { useDemandaReturn } from "../hooks/useDemandaReturn";
import { DemandaHeader } from "../components/DemandaHeader";

import { ViagemInfo } from "../components/ViagemInfo";
import { NotasFiscaisList } from "../components/NotasFiscaisList";
import { ModalRemoverNota } from "../components/ModalRemoverNota";
import { useRemoverNotaReturn } from "../hooks/useRemoverNotaReturn";
import { Loader2 } from "lucide-react";
import { Button } from "@/_shared/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { GetNotasDto } from "@/_services/api/model";
import AcoesDemanda from "../components/acoesDemanda";

export default function DemandaReturnPage() {
  const router = useRouter();
  const {
    demanda,
    isLoadingDemanda,
    notasCadastradas,
    
    isLoadingNotas,
    infoViagem,
    isLoadingViagem,
    viagemId,
  } = useDemandaReturn();

  const {
    open: openRemoverNota,
    setOpen: setOpenRemoverNota,
    notaId,
    setNotaId,
    handleRemoverNota,
    isRemovingNota,
  } = useRemoverNotaReturn();

  const handleOpenRemoverNota = (nota: GetNotasDto) => {
    setNotaId(nota.id.toString());
    setOpenRemoverNota(true);
  };

  const notaToRemove = notasCadastradas?.find(n => n.id.toString() === notaId);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 space-y-6">
      {/* Header com botão voltar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/return')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Detalhes da Demanda</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie todas as informações da demanda
            </p>
          </div>
        </div>
      </div>

      {/* Loading da Demanda */}
      {isLoadingDemanda && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Carregando informações da demanda...
            </p>
          </div>
        </div>
      )}

      {/* Header da Demanda com Informações */}
      {demanda && !isLoadingDemanda && (
        <>
          {/* Ações da Demanda - No topo */}
          <div className="flex items-center justify-end">
            <AcoesDemanda demandaId={demanda.id.toString()} demanda={demanda} />
          </div>

          <DemandaHeader demanda={demanda} />

          {/* Informações da Viagem */}
          {viagemId && (
            <ViagemInfo 
              infoViagem={infoViagem} 
              isLoading={isLoadingViagem}
            />
          )}

          {/* Lista de Notas Fiscais */}
          <NotasFiscaisList 
            notas={notasCadastradas}
            isLoading={isLoadingNotas}
            onRemoveNota={handleOpenRemoverNota}
          />
        </>
      )}

      {/* Modal de Remover Nota Fiscal */}
      {notaToRemove && (
        <ModalRemoverNota
          open={openRemoverNota}
          onOpenChange={setOpenRemoverNota}
          onConfirm={() => handleRemoverNota(notaId)}
          nota={notaToRemove}
          isLoading={isRemovingNota}
        />
      )}

      {/* Estado quando não há demanda */}
      {!demanda && !isLoadingDemanda && (
        <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Demanda não encontrada
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
