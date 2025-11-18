import { useDeletarDemanda } from "@/_services/api/service/gestao-produtividade/gestao-produtividade";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useDeletarDemandaProdutividade() {
  const queryClient = useQueryClient();
  const [internalOpen, setInternalOpen] = useState(false);
  const [paleteId, setPaleteId] = useState<string>('');
  const { mutateAsync: deletarDemanda, isPending: isDeletandoDemanda } = useDeletarDemanda({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['produtividade'] });
      },
    },
  })

  function handleDeletarDemanda() {
    if (!paleteId) {
      toast.error('ID do palete é obrigatório');
      return;
    }

    const promise = deletarDemanda({ paleteId });
    toast.promise(promise, {
      loading: 'Deletando demanda...',
      success: 'Demanda deletada com sucesso!',
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleDeletarDemanda,
    isDeletandoDemanda,
    paleteId,
    setPaleteId,
    internalOpen,
    setInternalOpen,
  }
}