import { useBuscarTodosOsCortesDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useUser } from "@/_shared/providers/UserContext";

export const useBuscarCortesAberto = () => {
  const { user } = useUser();

  const { data: cortesAberto, isLoading: isBuscandoCortesAberto } = useBuscarTodosOsCortesDeProduto(user?.centerSelect as string, {
    realizado: false,
      direcao: 'OPERACIONAL',
    },
    {
      query: {
        queryKey: ['cortes-produto'],
        refetchInterval: 10000,
      },
    },
  );

  return {
    cortesAberto,
    isBuscandoCortesAberto,
  }
}