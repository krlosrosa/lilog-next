"use client";

import { useMemo } from "react";
import { useFindAllProdutos } from "@/_services/api/service/produto/produto";
import { useProductActions } from "./useProductActions";
import type { CreateProdutoDto } from "@/_services/api/model";
import type { ProdutoFormValues } from "../schemas/produto-form.schema";

function produtoToFormValues(produto: CreateProdutoDto): ProdutoFormValues {
  return {
    codDum: produto.codDum ?? "",
    codEan: produto.codEan ?? "",
    sku: produto.sku ?? "",
    descricao: produto.descricao ?? "",
    shelf: produto.shelf ?? 0,
    pesoLiquidoCaixa: produto.pesoLiquidoCaixa ?? "",
    pesoLiquidoUnidade: produto.pesoLiquidoUnidade ?? "",
    tipoPeso: (produto.tipoPeso === "PVAR" || produto.tipoPeso === "PPAR"
      ? produto.tipoPeso
      : "") as ProdutoFormValues["tipoPeso"],
    unPorCaixa: produto.unPorCaixa ?? 1,
    caixaPorPallet: produto.caixaPorPallet ?? 1,
    segmento: (produto.segmento === "SECO" || produto.segmento === "REFR"
      ? produto.segmento
      : "") as ProdutoFormValues["segmento"],
    empresa: (produto.empresa === "LDB" || produto.empresa === "ITB" || produto.empresa === "DPA"
      ? produto.empresa
      : "") as ProdutoFormValues["empresa"],
  };
}

export function useProductEdit(sku: string | null) {
  const { data: produtos = [], isLoading, isError, error } = useFindAllProdutos();
  const { handleUpdate, isUpdating } = useProductActions();

  const produto = useMemo<CreateProdutoDto | null>(() => {
    if (!sku) return null;
    return produtos.find((p) => p.sku === sku) ?? null;
  }, [produtos, sku]);

  const initialValues = useMemo<ProdutoFormValues | null>(() => {
    return produto ? produtoToFormValues(produto) : null;
  }, [produto]);

  async function handleUpdateProduct(values: ProdutoFormValues) {
    if (!sku) throw new Error("SKU não informado");
    const updateData = {
      codDum: values.codDum,
      codEan: values.codEan,
      sku: values.sku,
      descricao: values.descricao,
      shelf: values.shelf,
      pesoLiquidoCaixa: values.pesoLiquidoCaixa,
      pesoLiquidoUnidade: values.pesoLiquidoUnidade,
      unPorCaixa: values.unPorCaixa,
      caixaPorPallet: values.caixaPorPallet,
      segmento: values.segmento,
      empresa: values.empresa,
    };
    return handleUpdate(sku, updateData);
  }

  return {
    produto,
    initialValues,
    isLoading,
    isError,
    error,
    handleUpdateProduct,
    isUpdating,
  };
}
