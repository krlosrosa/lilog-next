import { useState } from "react";
import useFinalizarDemandaMutation from "@/_modules/devolucao/hooks/mutation/finalizarDemanda";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useFinalizarDemandaReturn() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { finalizarDemandaMutation, isFinalizandoDemanda } = useFinalizarDemandaMutation();
  const [open, setOpen] = useState(false);

  function handleFinalizarDemanda(demandaId: string) {
    const promise = finalizarDemandaMutation({ id: demandaId });
    
    // Invalidar queries após sucesso (não bloqueante)
    promise.then(() => {
      queryClient.invalidateQueries({ queryKey: ['demandas'] });
      queryClient.invalidateQueries({ queryKey: ['demanda', 'demandas', demandaId] });
      queryClient.invalidateQueries({ queryKey: ['resultadoConferencia', demandaId] });
      setOpen(false);
      // Redirecionar para a página de resultado
      router.push(`/return/demanda/${demandaId}/finalizar-demanda`);
    });

    toast.promise(promise, {
      loading: 'Finalizando demanda...',
      success: () => {
        return `Demanda finalizada com sucesso!`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Erro ao finalizar demanda. Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    handleFinalizarDemanda,
    isFinalizandoDemanda,
  };
}
