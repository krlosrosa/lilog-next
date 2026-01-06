import { useListarDemandasDevolucao } from "@/_services/api/service/devolucao/devolucao";

export default function useListarDemandasquery(centerId: string, dataRef: string) {
  const { data, isLoading } = useListarDemandasDevolucao(centerId, dataRef, {
    query: {
      queryKey: ['demandas'],
    }
  })

  return { data, isLoading };
}