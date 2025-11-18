import { useProdutividadeFilter } from "@/_modules/produtividade/hooks/useProdutividadeFilter";
import { useBuscarTodosOsCortesDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useUser } from "@/_shared/providers/UserContext";

export const useBuscarCortesRelatorio = () => {
  const { user } = useUser();
  const { filters } = useProdutividadeFilter();

  const { data: cortesAberto, isLoading: isBuscandoCortesAberto } = useBuscarTodosOsCortesDeProduto(user?.centerSelect as string, {
      inicio: filters.dataInicio,
      fim: filters.dataFim,
    },
    {
      query: {
        queryKey: ['cortes-produto', filters],
        refetchInterval: 10000,
      },
    },
  );

  return {
    cortesAberto,
    isBuscandoCortesAberto,
  }
}