import { useState } from "react";
import useLiberarDemandaMutation from "@/_modules/devolucao/hooks/mutation/liberarDemanda";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useLiberarDemandaReturn() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { liberarDemandaMutation, isLiberandoDemanda } = useLiberarDemandaMutation();
  const [open, setOpen] = useState(false);

  function handleLiberarDemanda(demandaId: string) {
    const promise = liberarDemandaMutation({ demandaId });
    
    // Invalidar queries após sucesso (não bloqueante)
    promise.then(() => {
      queryClient.invalidateQueries({ queryKey: ['demandas'] });
      queryClient.invalidateQueries({ queryKey: ['demanda', 'demandas', id] });
      setOpen(false);
    });

    toast.promise(promise, {
      loading: 'Liberando demanda para o armazém...',
      success: (response: string) => {
        return `Demanda liberada com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Erro ao liberar demanda. Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    handleLiberarDemanda,
    isLiberandoDemanda,
  };
}
