import { useGetInfoApenasViagemDevolucao } from "@/_services/api/service/devolucao/devolucao";

export function useGetInfoApenasViagemRavex(viagemId: string) {
  const { data, isLoading, error } = useGetInfoApenasViagemDevolucao(viagemId, {
    query: {
      enabled: !!viagemId,
      queryKey: ['getInfoViagemRavex','demandas', viagemId],
    }
  });
  return { data, isLoading, error };
}