import { useDeletarDemandaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { useQueryClient } from "@tanstack/react-query";

export default function useDeletarDemandaDevolucaoMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: deletarDemandaDevolucaoMutation, isPending: isDeletandoDemandaDevolucao } = useDeletarDemandaDevolucao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
      },
    },
  });
  
  return {
    deletarDemandaDevolucaoMutation,
    isDeletandoDemandaDevolucao,
  }
}