'use client';

import { Button } from "@/_shared/_components/ui/button";
import { Plus, CheckCircle2, Trash2, Lock, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/_shared/_components/ui/tooltip";
import { useLiberarDemandaReturn } from "../hooks/useLiberarDemandaReturn";
import { useReabrirDemandaReturn } from "../hooks/useReabrirDemandaReturn";
import { useDeletarDemandaReturn } from "../hooks/useDeletarDemandaReturn";
import { ModalLiberarDemanda } from "./ModalLiberarDemanda";
import { ModalReabrirDemanda } from "./ModalReabrirDemanda";
import { ModalDeletarDemanda } from "./ModalDeletarDemanda";
import { GetDemandaByIdDevolucaoQueryResult } from "@/_services/api/service/devolucao/devolucao";
import { GetNotasDto } from "@/_services/api/model";

interface DemandaActionsProps {
  demandaId: string;
  demanda?: GetDemandaByIdDevolucaoQueryResult;
  notasCadastradas?: GetNotasDto[];
}

export function DemandaActions({ demandaId, demanda, notasCadastradas = [] }: DemandaActionsProps) {
  const router = useRouter();
  const { open: openLiberar, setOpen: setOpenLiberar, handleLiberarDemanda, isLiberandoDemanda } = useLiberarDemandaReturn();
  const { open: openReabrir, setOpen: setOpenReabrir, handleReabrirDemanda, isReabrindoDemanda } = useReabrirDemandaReturn();
  const { open: openDeletar, setOpen: setOpenDeletar, handleDeletarDemanda, isDeletandoDemanda } = useDeletarDemandaReturn();

  const handleAddNotaFiscal = () => {
    // Não passa viagemId - vai sem referência de viagem
    router.push(`/return/demanda/${demandaId}/cadastrar-nota`);
  };

  // Verificar se há pelo menos uma nota cadastrada
  const hasNotas = notasCadastradas && notasCadastradas.length > 0;

  // Regras de habilitação das ações
  const canLiberar = hasNotas && demanda?.status === 'AGUARDANDO_LIBERACAO';
  const canReabrir = hasNotas && demanda?.status === 'CONFERENCIA_FINALIZADA';
  const canFinalizar = hasNotas && (demanda?.status === 'CONFERENCIA_FINALIZADA' || demanda?.status === 'EM_CONFERENCIA');

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Adicionar Nota Fiscal - Funcional */}
        <Button
          onClick={handleAddNotaFiscal}
          className="gap-2"
          variant="default"
        >
          <Plus className="h-4 w-4" />
          Adicionar Nota Fiscal
        </Button>

        {/* Liberar Demanda - Funcional se status for AGUARDANDO_LIBERACAO e tiver notas */}
        {canLiberar ? (
          <Button
            onClick={() => setOpenLiberar(true)}
            variant="outline"
            className="gap-2"
            disabled={isLiberandoDemanda}
          >
            <Lock className="h-4 w-4" />
            Liberar Demanda
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  variant="outline"
                  disabled
                  className="gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Liberar Demanda
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {!hasNotas 
                  ? 'Adicione pelo menos uma nota fiscal para liberar a demanda'
                  : 'Disponível apenas para demandas aguardando liberação'}
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Reabrir Demanda - Funcional se status for CONFERENCIA_FINALIZADA e tiver notas */}
        {canReabrir ? (
          <Button
            onClick={() => setOpenReabrir(true)}
            variant="outline"
            className="gap-2"
            disabled={isReabrindoDemanda}
          >
            <RotateCcw className="h-4 w-4" />
            Reabrir Demanda
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  variant="outline"
                  disabled
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reabrir Demanda
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {!hasNotas 
                  ? 'Adicione pelo menos uma nota fiscal para reabrir a demanda'
                  : 'Disponível apenas para demandas com conferência finalizada'}
              </p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Finalizar Demanda - Funcional se status for CONFERENCIA_FINALIZADA ou EM_CONFERENCIA e tiver notas */}
        {canFinalizar ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/return/demanda/${demandaId}/finalizar-demanda`)}
            className="gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Finalizar Demanda
          </Button>
        ) : (
          hasNotas && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Finalizar Demanda
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Disponível apenas para demandas em conferência ou com conferência finalizada</p>
              </TooltipContent>
            </Tooltip>
          )
        )}

        {/* Deletar Demanda - Sempre disponível */}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpenDeletar(true)}
          disabled={isDeletandoDemanda}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Deletar Demanda
        </Button>
      </div>

      {/* Modal de Confirmação para Liberar Demanda */}
      <ModalLiberarDemanda
        open={openLiberar}
        onOpenChange={setOpenLiberar}
        onConfirm={() => handleLiberarDemanda(demandaId)}
        isLoading={isLiberandoDemanda}
      />

      {/* Modal de Confirmação para Reabrir Demanda */}
      <ModalReabrirDemanda
        open={openReabrir}
        onOpenChange={setOpenReabrir}
        onConfirm={() => handleReabrirDemanda(demandaId)}
        isLoading={isReabrindoDemanda}
      />

      {/* Modal de Confirmação para Deletar Demanda */}
      <ModalDeletarDemanda
        open={openDeletar}
        onOpenChange={setOpenDeletar}
        onConfirm={() => handleDeletarDemanda(demandaId)}
        demanda={demanda}
        isLoading={isDeletandoDemanda}
      />
    </>
  );
}
