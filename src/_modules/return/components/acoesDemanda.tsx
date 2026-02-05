'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/_shared/_components/ui/button';
import { Lock, Trash2, RotateCcw, Plus, CheckCircle2, FileWarning } from 'lucide-react';
import { useLiberarDemandaReturn } from '../hooks/useLiberarDemandaReturn';
import { useDeletarDemandaReturn } from '../hooks/useDeletarDemandaReturn';
import { useReabrirDemandaReturn } from '../hooks/useReabrirDemandaReturn';
import { useCadastrarDemandaFaltaReturn } from '../hooks/useCadastrarDemandaFaltaReturn';
import { ModalLiberarDemanda } from './ModalLiberarDemanda';
import { ModalDeletarDemanda } from './ModalDeletarDemanda';
import { ModalReabrirDemanda } from './ModalReabrirDemanda';
import { ModalDemandaFalta } from './ModalDemandaFalta';
import type { GetDemandaByIdDevolucaoQueryResult } from '@/_services/api/service/devolucao/devolucao';

interface AcoesDemandaProps {
  demandaId: string;
  demanda: GetDemandaByIdDevolucaoQueryResult;
}

export default function AcoesDemanda({ demandaId, demanda }: AcoesDemandaProps) {
  const router = useRouter();
  const status = demanda?.status ?? '';

  const handleAddNotaFiscal = () => {
    router.push(`/return/demanda/${demandaId}/cadastrar-nota`);
  };

  const handleFinalizarProcesso = () => {
    router.push(`/return/demanda/${demandaId}/finalizar-demanda`);
  };

  const {
    open: openLiberar,
    setOpen: setOpenLiberar,
    handleLiberarDemanda,
    isLiberandoDemanda,
  } = useLiberarDemandaReturn();

  const {
    open: openDeletar,
    setOpen: setOpenDeletar,
    handleDeletarDemanda,
    isDeletandoDemanda,
  } = useDeletarDemandaReturn();

  const {
    open: openReabrir,
    setOpen: setOpenReabrir,
    handleReabrirDemanda,
    isReabrindoDemanda,
  } = useReabrirDemandaReturn();

  const {
    open: openDemandaFalta,
    setOpen: setOpenDemandaFalta,
    handleCadastrarDemandaFalta,
    isCadastrandoDemandaFalta,
  } = useCadastrarDemandaFaltaReturn();

  const canLiberar = status === 'AGUARDANDO_LIBERACAO';
  const canDemandaFalta = status === 'AGUARDANDO_LIBERACAO';
  const canReabrir =
    status === 'CONFERENCIA_FINALIZADA';

  return (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="default"
          size="sm"
          onClick={handleAddNotaFiscal}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Adicionar Nota Fiscal
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpenLiberar(true)}
          disabled={!canLiberar || isLiberandoDemanda}
          className="gap-2"
        >
          <Lock className="h-4 w-4" />
          Liberar Demanda
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleFinalizarProcesso}
          className="gap-2"
        >
          <CheckCircle2 className="h-4 w-4" />
          Finalizar Processo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpenDemandaFalta(true)}
          disabled={!canDemandaFalta || isCadastrandoDemandaFalta}
          className="gap-2"
        >
          <FileWarning className="h-4 w-4" />
          Adicionar Demanda de Falta
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpenReabrir(true)}
          disabled={!canReabrir || isReabrindoDemanda}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reabrir Demanda
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpenDeletar(true)}
          disabled={isDeletandoDemanda}
          className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          Deletar Demanda
        </Button>
      </div>

      <ModalLiberarDemanda
        open={openLiberar}
        onOpenChange={setOpenLiberar}
        onConfirm={() => handleLiberarDemanda(demandaId)}
        isLoading={isLiberandoDemanda}
      />

      <ModalDeletarDemanda
        open={openDeletar}
        onOpenChange={setOpenDeletar}
        onConfirm={() => handleDeletarDemanda(demandaId)}
        demanda={demanda}
        isLoading={isDeletandoDemanda}
      />

      <ModalReabrirDemanda
        open={openReabrir}
        onOpenChange={setOpenReabrir}
        onConfirm={() => handleReabrirDemanda(demandaId)}
        isLoading={isReabrindoDemanda}
      />

      <ModalDemandaFalta
        open={openDemandaFalta}
        onOpenChange={setOpenDemandaFalta}
        onConfirm={() => handleCadastrarDemandaFalta(demandaId)}
        isLoading={isCadastrandoDemandaFalta}
      />
    </>
  );
}
