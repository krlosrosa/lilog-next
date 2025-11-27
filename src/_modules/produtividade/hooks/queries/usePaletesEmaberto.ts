import { useGetPaletesEmAberto } from "@/_services/api/service/produtividade-dash/produtividade-dash";
import { useUser } from "@/_shared/providers/UserContext";

export const usePaletesEmabertoQuery = (data: string, processo: string) => {
  const { user } = useUser();

  const { data: paletesEmAberto, isLoading: isBuscandoPaletesEmAberto } = useGetPaletesEmAberto(
    user?.centerSelect as string,
    data,
    processo,
    {
      query: {
        enabled: !!user?.centerSelect && !!data && !!processo,
        queryKey: ['paletes-em-aberto', user?.centerSelect, data, processo],
      },
    },
  );

  return {
    paletesEmAberto,
    isBuscandoPaletesEmAberto,
  };
}