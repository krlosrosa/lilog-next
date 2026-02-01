"use client";

import { useMemo, useState } from "react";
import { useFindAllProdutos, getFindAllProdutosQueryKey } from "@/_services/api/service/produto/produto";
import type { CreateProdutoDto } from "@/_services/api/model";

export function useProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: produtos = [], isLoading, isError, error } = useFindAllProdutos();

  const filteredProdutos = useMemo<CreateProdutoDto[]>(() => {
    if (!searchTerm.trim()) return produtos;
    const term = searchTerm.trim().toLowerCase();
    return produtos.filter(
      (p) =>
        p.sku?.toLowerCase().includes(term) ||
        p.descricao?.toLowerCase().includes(term) ||
        p.codEan?.toLowerCase().includes(term) ||
        p.codDum?.toLowerCase().includes(term) ||
        p.segmento?.toLowerCase().includes(term) ||
        p.empresa?.toLowerCase().includes(term),
    );
  }, [produtos, searchTerm]);

  return {
    produtos: filteredProdutos,
    searchTerm,
    setSearchTerm,
    isLoading,
    isError,
    error,
    queryKey: getFindAllProdutosQueryKey(),
  };
}
