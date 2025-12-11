import { useGetDemandaById } from "@/_services/api/service/gestao-produtividade/gestao-produtividade";

export default function useBuscarDemandaQuery(id: string) {
  const { data: demanda, isLoading: isBuscandoDemanda } = useGetDemandaById(id, {
    query: {
      enabled: !!id,
      queryKey: ['demanda', id],
      retry: (failureCount, error) => {
        return error.message.includes('500') && failureCount < 3
      },
    }
  });
  return { demanda, isBuscandoDemanda };
}