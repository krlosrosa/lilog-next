import { useGetProdutividadeById } from "@/_services/api/service/gestao-produtividade/gestao-produtividade";
import { useUser } from "@/_shared/providers/UserContext";

export default function useBuscarProdutividadePorDemanda(demandaId: string, isOpen: boolean) {
  const { user } = useUser();

  const { data: produtividade, isLoading: isBuscandoProdutividade } = useGetProdutividadeById(demandaId, {
    query: {
      enabled: !!demandaId && isOpen,
      queryKey: [
        'produtividade',
        `/api/gestao-produtividade/get-produtividade-by-id/${demandaId}`,
        demandaId,
      ],
    },
  });

  return { produtividade, isBuscandoProdutividade };
}