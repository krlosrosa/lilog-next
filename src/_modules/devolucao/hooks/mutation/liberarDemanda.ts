import { useLiberarDemandaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { useQueryClient } from "@tanstack/react-query";

export default function useLiberarDemandaMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: liberarDemandaMutation, isPending: isLiberandoDemanda } = useLiberarDemandaDevolucao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
      },
    },
  })
  return {
    liberarDemandaMutation,
    isLiberandoDemanda,
  }
}