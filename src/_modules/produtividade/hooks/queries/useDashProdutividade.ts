import { useDashDiaDia } from "@/_services/api/service/produtividade-dash/produtividade-dash";
import { useUser } from "@/_shared/providers/UserContext";

export function useDashProdutividade(dataInicio: string, dataFim: string) {
  const { user } = useUser();
  const { data: dashDiaDia, isLoading: isBuscandoDashDiaDia } = useDashDiaDia({
    query: {
      enabled: !!user?.centerSelect,
      queryKey: ['dashDiaDia', user?.centerSelect],
    },
    request:{ 
      params: {
        dataInicio: dataInicio,
        dataFim: dataFim,
        centerId: user?.centerSelect as string,
      }
    }
  });

  return {
    produtividadeDiaDia: dashDiaDia?.produtividade,
    top5ProdutividadeDiaDia: dashDiaDia?.top5Produtividade,
    bottom5ProdutividadeDiaDia: dashDiaDia?.bottom5Produtividade,
    isLoading: isBuscandoDashDiaDia,
  }
}