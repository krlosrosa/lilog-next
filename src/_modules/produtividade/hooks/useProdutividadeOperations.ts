import { GetProdutividadeParams } from '@/_services/api/model';
import {
  useAddPausaGeral,
  useAddPausaIndividual,
  useBuscarPausasAtivas,
  useCriarDemandaProdutividade,
  useFinalizarPaleteProdutividade,
  useFinalizarPausaGeral,
  useFinalizarPausaIndividual,
  useGetProdutividade,
  useOverViewProdutividade,
} from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { useListarUsuarios } from '@/_services/api/service/user/user';
import { useUser } from '@/_shared/providers/UserContext';

export const useProdutividadeOperations = () => {
  const { user } = useUser();

  const { mutate: addPausaGeral, isPending: isAdicionandoPausaGeral } =
    useAddPausaGeral();
  const { mutate: finalizarPausaGeral, isPending: isFinalizandoPausaGeral } =
    useFinalizarPausaGeral();

  const useListarUsuariosQuery = () => {
    return useListarUsuarios(
      user?.centerSelect as string,
      {
        role: 'FUNCIONARIO',
      },
      {
        query: {
          enabled: !!user?.centerSelect,
          queryKey: ['funcionarios',`/api/user/userid/${user?.centerSelect}`],
        },
      },
    );
  };

  const { data: pausasAtivas, isLoading: isBuscandoPausas } =
    useBuscarPausasAtivas(user?.centerSelect as string, {
      ativo: 'true',
    });

  const operations = {
    addPausaGeral,
    pausasAtivas,
    finalizarPausaGeral,
    useListarUsuariosQuery,
  };

  return {
    operations,
    isLoading: false,
  };
};
