import { useState } from "react";
import useDeletarDemandaDevolucaoMutation from "@/_modules/devolucao/hooks/mutation/deletarDemandaDevolucao";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useDeletarDemandaReturn() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { deletarDemandaDevolucaoMutation, isDeletandoDemandaDevolucao } = useDeletarDemandaDevolucaoMutation();
  const [open, setOpen] = useState(false);

  function handleDeletarDemanda(demandaId: string) {
    const promise = deletarDemandaDevolucaoMutation({ id: demandaId });
    
    // Invalidar queries após sucesso (não bloqueante)
    promise.then(() => {
      queryClient.invalidateQueries({ queryKey: ['demandas'] });
      setOpen(false);
      // Redirecionar para a lista de demandas
      router.push('/return');
    });

    toast.promise(promise, {
      loading: 'Deletando demanda...',
      success: () => {
        return `Demanda deletada com sucesso!`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Erro ao deletar demanda. Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    handleDeletarDemanda,
    isDeletandoDemanda: isDeletandoDemandaDevolucao,
  };
}
