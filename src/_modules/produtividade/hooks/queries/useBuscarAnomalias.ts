import { useGetAnomalias } from "@/_services/api/service/anomalias-produtividade/anomalias-produtividade"
import { useUser } from "@/_shared/providers/UserContext";
import { useProdutividadeFilter } from "../useProdutividadeFilter";

export const useBuscarAnomalias = () => {
  const { user } = useUser();
  const { filters } = useProdutividadeFilter();

  const hasDates = !!filters.dataInicio && !!filters.dataFim;
  const hasCenter = !!user?.centerSelect;

  const { data: anomalias, isLoading: isBuscandoAnomalias } = useGetAnomalias(user?.centerSelect as string, {
    query: {
      enabled: hasDates && hasCenter,
      queryKey: [
        `/api/anomalias-produtividade/${user?.centerSelect}`,
        filters,
      ],
    },
    request: {
      params: {
        inicio: filters.dataInicio,
        fim: filters.dataFim,
      }
    }
  });
   
  return {
    anomalias,
    isBuscandoAnomalias,
  };
}