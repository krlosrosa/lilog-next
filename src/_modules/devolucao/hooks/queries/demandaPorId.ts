import { useGetDemandaByIdDevolucao } from "@/_services/api/service/devolucao/devolucao";

export default function useDemandaPorIdQuery(id: string) {
  const { data, isLoading } = useGetDemandaByIdDevolucao(id, {
    query: {
      queryKey: ['demanda','demandas', id],
      enabled: !!id,
      retry: (failureCount, error) => {
        return error.message.includes('500') && failureCount < 3
      },
    }
  });
  return { data, isLoading };
}