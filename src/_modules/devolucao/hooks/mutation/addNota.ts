import { useAddNotaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { useQueryClient } from "@tanstack/react-query";

export default function useAddNota() {
  const queryClient = useQueryClient();
  const { mutateAsync: addNotaMutation, isPending: isAddingNota } = useAddNotaDevolucao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
      },
    },
  });
  return { addNotaMutation, isAddingNota };
}