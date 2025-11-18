import { useUser } from '@/_shared/providers/UserContext';
import { useBuscarPausasAtivas as useBuscarPausasAtivasService } from '@/_services/api/service/gestao-produtividade/gestao-produtividade';

export const useGetPausasAtivas = () => {
  const { user } = useUser();

  const { data: pausasAtivas, isLoading: isBuscandoPausasAtivas } =
    useBuscarPausasAtivasService(
      user?.centerSelect as string,
      {
        ativo: 'true',
      },
      {
        query: {
          enabled: !!user?.centerSelect,
          queryKey: [
            'pausas-ativas',
            `/api/gestao-produtividade/buscar-pausas-ativas/${user?.centerSelect}`,
          ],
        },
      },
    );

  return {
    pausasAtivas,
    isBuscandoPausasAtivas,
  };
};
