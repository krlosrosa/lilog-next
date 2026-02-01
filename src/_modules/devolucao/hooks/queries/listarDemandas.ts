import { useListarDemandasDevolucao } from "@/_services/api/service/devolucao/devolucao";

export default function useListarDemandasquery(centerId: string, dataRef: string) {
  const { data, isLoading } = useListarDemandasDevolucao(centerId, dataRef, {
    query: {
      enabled: !!(centerId && dataRef),
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
    },
  });

  return { data, isLoading };
}