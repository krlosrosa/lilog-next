
import { useRemoverNotaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { useQueryClient } from "@tanstack/react-query";

export default function useRemoveNotaMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: removeNotaMutation, isPending: isRemovingNota } = useRemoverNotaDevolucao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
      },
    },
  });

  return {
    removeNotaMutation,
    isRemovingNota,
  }
}