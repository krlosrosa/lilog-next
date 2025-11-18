import { useUser } from '@/_shared/providers/UserContext';
import { useBuscarTodasRegrasDeMotor } from '@/_services/api/service/center/center';

export const useGetRules = () => {
  const { user } = useUser();

  const { data: regras, isLoading: isBuscandoRegras } =
    useBuscarTodasRegrasDeMotor(user?.centerSelect as string, {
      query: {
        enabled: !!user?.centerSelect,
        queryKey: [
          'regras',
          `/api/center/engine-rules/${user?.centerSelect}`,
          'rules',
        ],
      },
    });

  return {
    regras,
    isBuscandoRegras,
  };
};
