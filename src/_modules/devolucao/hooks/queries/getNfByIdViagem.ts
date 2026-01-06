import { useGetNotaByNfAndIdViagemDevolucao } from "@/_services/api/service/devolucao/devolucao";

export default function useGetNfByIdViagem(nf: string, viagemId: string) {
  const { data, isLoading, error } = useGetNotaByNfAndIdViagemDevolucao(nf, viagemId, {
    query: {
      enabled: !!viagemId,
      queryKey: ['nf', 'demandas', nf, viagemId],
    }
  });
  return { data, isLoading, error };
}