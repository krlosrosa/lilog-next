import { useDashDiaDia } from "@/_services/api/service/produtividade-dash/produtividade-dash";
import { useUser } from "@/_shared/providers/UserContext";
import { useFilterDash } from "../useFilterDash";

export function useDashProdutividade() {
  const { user } = useUser();
  const { filters, setFilter } = useFilterDash();
  const { data: dashDiaDia, isLoading: isBuscandoDashDiaDia } = useDashDiaDia({
    query: {
      enabled: !!user?.centerSelect && !!filters.dataInicio && !!filters.dataFim,
      queryKey: ['dashDiaDia', user?.centerSelect, filters.dataInicio, filters.dataFim, filters.processo],
    },
    request:{ 
      params: {
        dataInicio: filters.dataInicio,
        dataFim: filters.dataFim,
        centerId: user?.centerSelect as string,
        processo: filters.processo,
      }
    }
  });

  return {
    produtividadeDiaDia: dashDiaDia?.produtividade,
    top5ProdutividadeDiaDia: dashDiaDia?.top5Produtividade,
    bottom5ProdutividadeDiaDia: dashDiaDia?.bottom5Produtividade,
    isLoading: isBuscandoDashDiaDia,
    porTurnoEProcesso: dashDiaDia?.produtividadeProcesso,
    listaProdutividadePorFuncionario: dashDiaDia?.listaProdutividadePorFuncionario,
    filters,
    setFilter,
  }
}