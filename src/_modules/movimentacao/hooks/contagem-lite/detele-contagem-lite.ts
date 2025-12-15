import { useDeleteContagemLite } from "@/_services/api/service/movimentacao/movimentacao";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteContagemLiteMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteContagemLite, isPending: isDeletingContagemLite } = useDeleteContagemLite({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contagemLite'] });
      },
    },
  });
  function deleteContagemLiteFunction(centerId: string) {
    const promise = deleteContagemLite({ centerId });
    toast.promise(promise, {
      loading: 'Deletando contagem lite...',
      success: 'Contagem lite deletada com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    deleteContagemLiteFunction,
    isDeletingContagemLite,
  }
}