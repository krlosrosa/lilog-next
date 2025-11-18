import {
  useAtualizarPermissoes,
  useBuscarTodasPermissoesPorCentro,
} from '@/_services/api/service/user/user';

export const usePermissionsOperations = () => {
  const { mutate: updatePermissoes, isPending: isUpdatingPermissoes } =
    useAtualizarPermissoes();

  function useGetPermissoes(userId: string, centerId: string) {
    return useBuscarTodasPermissoesPorCentro(userId, centerId, {
      query: { enabled: !!userId && !!centerId },
    });
  }

  const operations = {
    updatePermissoes,
    useGetPermissoes,
  };

  return {
    operations,
    isLoading: isUpdatingPermissoes,
  };
};
