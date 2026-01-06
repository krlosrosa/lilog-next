'use client';
import { CreateProdutoDto } from "@/_services/api/model";
import { useProduto } from "../hooks/useproduto";
import { convertFileToProdutos } from "../services/upload-produto";
import { useState } from "react";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";

export function AddVariosItens() {

  const { handleAddVariosProdutos, isAddingVariosProdutos } = useProduto();
  const [produtos, setProdutos] = useState<CreateProdutoDto[]>([]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const produtos = await convertFileToProdutos(file);
    setProdutos(produtos);
  }

  const handleAdd = () => {
    handleAddVariosProdutos(produtos);
  }

  return (
    <div>
      <h1>Adicionar Vários Itens</h1>
      <Input type="file" onChange={handleUpload} />
      <Button type="button" onClick={handleAdd}>Adicionar</Button>
    </div>
  )
}