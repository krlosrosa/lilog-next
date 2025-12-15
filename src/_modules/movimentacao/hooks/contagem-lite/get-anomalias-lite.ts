import { useRelatorioAnomaliasContagemLite } from "@/_services/api/service/movimentacao/movimentacao";

export function useGetAnomaliasLite(centerId: string, data: string) {
  const { data: anomaliasLite, isLoading: isLoadingAnomaliasLite } = useRelatorioAnomaliasContagemLite(centerId, data, {
    query: {
      enabled: !!centerId && !!data,
      queryKey: ['anomaliasLite', centerId, data],
    },
  });

  return {
    anomaliasLite,
    isLoadingAnomaliasLite
  }
}