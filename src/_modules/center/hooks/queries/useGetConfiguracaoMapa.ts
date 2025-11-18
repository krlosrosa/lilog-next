import { useBuscarConfiguracaoPorCentro } from "@/_services/api/service/center/center";
import { useUser } from "@/_shared/providers/UserContext";
import { Empresa } from "../../components/config/types";

export function useGetConfiguracaoMapa(empresa: Empresa) {
  const { user } = useUser();

  const { data: configuracaoImpressa, isLoading: isLoadingConfiguracaoImpressa, error } =
  useBuscarConfiguracaoPorCentro(user?.centerSelect as string, empresa , {

      query: { 
        enabled: !!user?.centerSelect && !!empresa,
        retry: (failureCount, error) => {
          // Só faz retry se for erro 500
          return error.message.includes('500') && failureCount < 3
        },  
      },
    });

  return {
    configuracaoImpressa,
    isLoadingConfiguracaoImpressa,
    error,
  };
}