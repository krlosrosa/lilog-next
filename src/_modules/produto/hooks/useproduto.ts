import { CreateProdutoDto } from "@/_services/api/model";
import { useAddVariosProdutos } from "./queries/add-varios-produtos";

export function useProduto() {
  const { handleAddVariosProdutos: handleAddVariosProdutosQuery, isAddingVariosProdutos } = useAddVariosProdutos();

  function handleAddVariosProdutos(data: CreateProdutoDto[]) {
    handleAddVariosProdutosQuery(data);
  }

  return {
    handleAddVariosProdutos,
    isAddingVariosProdutos,
  }
}