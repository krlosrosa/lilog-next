import { useBuscarTodasRegrasDeMotor } from "@/_services/api/service/center/center";
import { useUser } from "@/_shared/providers/UserContext";

export const useBuscarAnomaliasEngineQuery = () => {
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
}