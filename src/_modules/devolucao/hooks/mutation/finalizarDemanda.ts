import { useFinalizarDemandaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { useQueryClient } from "@tanstack/react-query";

export default function useFinalizarDemandaMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: finalizarDemandaMutation, isPending: isFinalizandoDemanda } = useFinalizarDemandaDevolucao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
      },
    },
  });
  return {
    finalizarDemandaMutation,
    isFinalizandoDemanda,
  }
}