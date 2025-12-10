import { useFindAllPending } from "@/_services/api/service/movimentacao/movimentacao";
import { useUser } from "@/_shared/providers/UserContext";

export function useGetMovimentacao() {
  const { user } = useUser();
  const { data: movimentacoes, isLoading: isLoadingMovimentacoes } = useFindAllPending(
    user?.centerSelect as string,
    {
      query: {
        queryKey: ['movimentacao', user?.centerSelect as string],
        enabled: !!user?.centerSelect,
      },
    }
  );

  return {
    movimentacoes,
    isLoadingMovimentacoes,
  };
}