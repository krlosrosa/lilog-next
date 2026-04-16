import { useMemo } from "react";
import { useProdutividadeFilter } from "@/_modules/produtividade/hooks/useProdutividadeFilter";
import { useBuscarTodosOsCortesDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useUser } from "@/_shared/providers/UserContext";

export const useBuscarCortesRelatorio = () => {
  const { user } = useUser();
  const { filters } = useProdutividadeFilter();

  const intervaloCompleto = useMemo(() => {
    const inicio = filters.dataInicio?.trim() ?? "";
    const fim = filters.dataFim?.trim() ?? "";
    return Boolean(inicio && fim);
  }, [filters.dataInicio, filters.dataFim]);

  const params = useMemo(() => {
    if (!intervaloCompleto) {
      return undefined;
    }
    const inicio = filters.dataInicio?.trim() ?? "";
    const fim = filters.dataFim?.trim() ?? "";
    return { inicio, fim };
  }, [intervaloCompleto, filters.dataInicio, filters.dataFim]);

  const { data: cortesAberto, isLoading: isBuscandoCortesAberto } =
    useBuscarTodosOsCortesDeProduto(user?.centerSelect as string, params, {
      query: {
        queryKey: ["cortes-produto", filters],
        enabled: Boolean(user?.centerSelect && intervaloCompleto),
        refetchInterval: intervaloCompleto ? 10_000 : false,
      },
    });

  return {
    cortesAberto,
    isBuscandoCortesAberto,
  };
};