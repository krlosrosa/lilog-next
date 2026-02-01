import {
  CreateManyProdutosMutationBody,
  useCreateManyProdutos,
  getFindAllProdutosQueryKey,
} from "@/_services/api/service/produto/produto";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";

export function useAddVariosProdutos() {
  const queryClient = useQueryClient();
  const { mutateAsync: addVariosProdutos, isPending: isAddingVariosProdutos } =
    useCreateManyProdutos({
      mutation: {
        retry: (failureCount, error) => {
          return error.message.includes("500") && failureCount < 3;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getFindAllProdutosQueryKey() });
        },
      },
    });

  function handleAddVariosProdutos(data: CreateManyProdutosMutationBody) {
    const promise = addVariosProdutos({ data });
    toast.promise(promise, {
      loading: 'Adicionando produtos...',
      success: 'Produtos adicionados com sucesso!',
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleAddVariosProdutos,
    isAddingVariosProdutos,
  }
}