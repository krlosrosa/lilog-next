import { useResumoContagemLite } from "@/_services/api/service/movimentacao/movimentacao";

export function useStatusContagem(centerId: string) {
  const { data: statusContagem, isLoading: isLoadingStatusContagem } = useResumoContagemLite(centerId,{
    query: {
      enabled: !!centerId,
      queryKey: ['statusContagem', centerId],
      refetchInterval: 1000 * 60,
      refetchIntervalInBackground: true,
    },
  });
  return {
    statusContagem,
    isLoadingStatusContagem,
  }
}