import { useBuscarConfiguracaoPorCentro } from "@/_services/api/service/center/center"
import { useUser } from "@/_shared/providers/UserContext"

export function useBuscarConfiguracaoImpressao(empresa: string) {
  const { user } = useUser()
  const { data: configuracaoImpressao, isLoading: isLoadingConfiguracaoImpressao, error } = useBuscarConfiguracaoPorCentro(user?.centerSelect as string, empresa, {
    query: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },  
      enabled: !!user?.centerSelect && !!empresa,
    }
  })
  return {
    configuracaoImpressao,
    isLoadingConfiguracaoImpressao,
    error
  }
}