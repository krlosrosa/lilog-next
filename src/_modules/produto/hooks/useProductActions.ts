"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateProduto,
  useUpdateProdutoBySku,
  useDeleteProdutoBySku,
  getFindAllProdutosQueryKey,
} from "@/_services/api/service/produto/produto";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import type { CreateProdutoDto, UpdateProdutoDto } from "@/_services/api/model";

const invalidateProdutos = (queryClient: ReturnType<typeof useQueryClient>) =>
  queryClient.invalidateQueries({ queryKey: getFindAllProdutosQueryKey() });

export function useProductActions() {
  const queryClient = useQueryClient();

  const createMutation = useCreateProduto({
    mutation: {
      onSuccess: () => invalidateProdutos(queryClient),
    },
  });

  const updateMutation = useUpdateProdutoBySku({
    mutation: {
      onSuccess: () => invalidateProdutos(queryClient),
    },
  });

  const deleteMutation = useDeleteProdutoBySku({
    mutation: {
      onSuccess: () => invalidateProdutos(queryClient),
    },
  });

  function handleCreate(data: CreateProdutoDto) {
    const promise = createMutation.mutateAsync({ data });
    toast.promise(promise, {
      loading: "Cadastrando produto...",
      success: "Produto cadastrado com sucesso!",
      error: (err: unknown) =>
        `${getAxiosErrorMessage(err) || "Erro ao cadastrar produto."}`,
    });
    return promise;
  }

  function handleUpdate(sku: string, data: UpdateProdutoDto) {
    const promise = updateMutation.mutateAsync({ sku, data });
    toast.promise(promise, {
      loading: "Atualizando produto...",
      success: "Produto atualizado com sucesso!",
      error: (err: unknown) =>
        `${getAxiosErrorMessage(err) || "Erro ao atualizar produto."}`,
    });
    return promise;
  }

  function handleDelete(sku: string) {
    const promise = deleteMutation.mutateAsync({ sku });
    toast.promise(promise, {
      loading: "Excluindo produto...",
      success: "Produto excluído com sucesso!",
      error: (err: unknown) =>
        `${getAxiosErrorMessage(err) || "Erro ao excluir produto."}`,
    });
    return promise;
  }

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
