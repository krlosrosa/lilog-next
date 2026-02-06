import { useGetInfoByViagemId } from "@/_services/api/service/devolucao/devolucao";

export function useGetInfoViagemRavex(viagemId: string) {
  const { data, isLoading, error } = useGetInfoByViagemId(viagemId, {
    query: {
      enabled: !!viagemId,
      queryKey: ['getInfoViagemRavexByNf','demandasByNf', viagemId],
    }
  });
  return { data, isLoading, error };
}