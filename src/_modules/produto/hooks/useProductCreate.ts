"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCreateProduto, getFindAllProdutosQueryKey } from "@/_services/api/service/produto/produto";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import type { CreateProdutoDto } from "@/_services/api/model";
import type { ProdutoFormValues } from "../schemas/produto-form.schema";

function formValuesToCreateDto(values: ProdutoFormValues): CreateProdutoDto {
  return {
    ...values,
    criadoEm: new Date().toISOString(),
  };
}

export function useProductCreate() {
  const queryClient = useQueryClient();
  const { mutateAsync: createProduto, isPending: isCreating } = useCreateProduto({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getFindAllProdutosQueryKey() });
      },
    },
  });

  async function handleCreateProduct(values: ProdutoFormValues) {
    const dto = formValuesToCreateDto(values);
    const promise = createProduto({ data: dto });
    toast.promise(promise, {
      loading: "Cadastrando produto...",
      success: "Produto cadastrado com sucesso!",
      error: (err: unknown) =>
        `${getAxiosErrorMessage(err) || "Erro ao cadastrar produto. Tente novamente."}`,
    });
    return promise;
  }

  return {
    handleCreateProduct,
    isCreating,
  };
}
