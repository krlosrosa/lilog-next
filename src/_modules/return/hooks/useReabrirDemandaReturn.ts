import { useState } from "react";
import useReabrirDemandaMutation from "@/_modules/devolucao/hooks/mutation/reabrirDemanda";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useReabrirDemandaReturn() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { reabrirDemandaMutation, isReabrindoDemanda } = useReabrirDemandaMutation();
  const [open, setOpen] = useState(false);

  function handleReabrirDemanda(demandaId: string) {
    const promise = reabrirDemandaMutation({ id: demandaId });
    
    // Invalidar queries após sucesso (não bloqueante)
    promise.then(() => {
      queryClient.invalidateQueries({ queryKey: ['demandas'] });
      queryClient.invalidateQueries({ queryKey: ['demanda', 'demandas', id] });
      setOpen(false);
    });

    toast.promise(promise, {
      loading: 'Reabrindo demanda...',
      success: (response: string) => {
        return `Demanda reaberta com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Erro ao reabrir demanda. Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    handleReabrirDemanda,
    isReabrindoDemanda,
  };
}
