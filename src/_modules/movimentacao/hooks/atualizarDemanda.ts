import { UpdateMovimentacaoDto } from "@/_services/api/model";
import { useUpdateMovimentacao } from "@/_services/api/service/movimentacao/movimentacao"
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAtualizarDemandaMutation = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: atualizarDemandaMutation, isPending: isAtualizandoDemanda } = useUpdateMovimentacao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['movimentacao'] });
      },
    },
  })

  function atualizarDemanda(id: number, demanda: UpdateMovimentacaoDto) {
    const promise = atualizarDemandaMutation({ id, data: demanda });
    toast.promise(promise, {
      loading: 'Atualizando demanda...',
      success: 'Demanda atualizada com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    atualizarDemanda,
    isAtualizandoDemanda,
  }
}