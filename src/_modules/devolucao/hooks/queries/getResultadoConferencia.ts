import { useGetResultadoDemandaDevolucao } from "@/_services/api/service/devolucao/devolucao";

export default function useGetResultadoConferenciaQuery(id: string) {
  const { data, isLoading, error } = useGetResultadoDemandaDevolucao(id, {
    query: {
      queryKey: ['resultadoConferencia', id],
    },
  });
  return {
    data,
    isLoading,
    error,
  }
}