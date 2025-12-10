import { useRemoverMovimentacao } from "@/_services/api/service/movimentacao/movimentacao";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeletarMovimentacaoMutation() {
  const clientQuery = useQueryClient();
  const { mutateAsync: deletarMovimentacaoMutation, isPending: isDeletandoMovimentacao } = useRemoverMovimentacao({
    mutation: {
      onSuccess: () => {
        clientQuery.invalidateQueries({ queryKey: ['movimentacao'] });
      },
    },
  });

  function deletarMovimentacao(id: number) {
    const promise = deletarMovimentacaoMutation({ id });
    toast.promise(promise, {
      loading: 'Deletando movimentação...',
      success: 'Movimentação deletada com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    deletarMovimentacao,
    isDeletandoMovimentacao,
  }
}