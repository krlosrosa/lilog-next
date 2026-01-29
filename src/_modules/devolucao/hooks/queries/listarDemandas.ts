import { useListarDemandasDevolucao } from "@/_services/api/service/devolucao/devolucao";

export default function useListarDemandasquery(centerId: string, dataRef: string) {
  const { data, isLoading } = useListarDemandasDevolucao(centerId, dataRef, {
    query: {
      // A queryKey será gerada automaticamente incluindo centerId e dataRef
      // Isso garante que a query seja refeita quando os parâmetros mudarem
      enabled: !!(centerId && dataRef),
    }
  })

  return { data, isLoading };
}