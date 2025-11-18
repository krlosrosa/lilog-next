import { useUser } from '@/_shared/providers/UserContext';
import {
  useBuscarConfiguracaoPorCentro,
  useBuscarTodosCentros,
  useCriarConfiguracaoImpressao,
  useCriarNovoCentro,
} from '@/_services/api/service/center/center';

export const useCentroOperations = () => {
  const { user } = useUser();
  const { mutate: addCentro, isPending: isCreating } = useCriarNovoCentro();
  const { data: getAllCenters, isLoading } = useBuscarTodosCentros();

  const {
    mutate: criarConfiguracaoImpressao,
    isPending: isCreatingConfiguracaoImpressao,
  } = useCriarConfiguracaoImpressao();

  const useBuscarConfiguracaoImpressao = (
    centerId: string,
    empresa: string,
  ) => {
    return useBuscarConfiguracaoPorCentro(centerId, empresa, {
      query: { enabled: !!centerId && !!empresa },
    });
  };

  const operations = {
    criarCentro: addCentro,
    buscarTodosCentros: getAllCenters,
    criarConfiguracaoImpressao,
    useBuscarConfiguracaoImpressao,
  };

  return {
    operations,
    isLoading: isCreating || isLoading || isCreatingConfiguracaoImpressao,
  };
};
