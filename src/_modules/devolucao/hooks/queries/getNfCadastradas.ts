import { useGetNotasByDemandaIdDevolucao } from "@/_services/api/service/devolucao/devolucao";

export default function useGetNfCadastradas(demandaId: string) {
  const { data, isLoading, error } = useGetNotasByDemandaIdDevolucao(demandaId, {
    query: {
      queryKey: ['nf-cadastradas', 'demandas', demandaId],
    }
  });
  return { data, isLoading, error };
}