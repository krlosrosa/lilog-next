import { useReabrirDemandaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { useQueryClient } from "@tanstack/react-query";

export default function useReabrirDemandaMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: reabrirDemandaMutation, isPending: isReabrindoDemanda } = useReabrirDemandaDevolucao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
      },
    },
  });
  return {
    reabrirDemandaMutation,
    isReabrindoDemanda,
  }
}