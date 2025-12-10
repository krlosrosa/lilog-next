import { useUser } from "@/_shared/providers/UserContext";
import { uploadDemandamovimentacao } from "../services/uploaddemandamovimentacao";
import { CreateMovimentacaoDto } from "@/_services/api/model";
import { useState } from "react";
import { CriarNovaMovimentacaoMutationBody } from "@/_services/api/service/movimentacao/movimentacao";

export const useMovimentacao = () => {

  const [formData, setFormData] = useState<CreateMovimentacaoDto[]>([]);
  const [items, setItems] = useState<CriarNovaMovimentacaoMutationBody>([]);
  const { user } = useUser();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const movimentacoes = await uploadDemandamovimentacao(file, user?.id as string, user?.centerSelect as string);
      setItems(movimentacoes);
    }
  };

  return {
    handleFileChange,
    formData,
    setFormData,
    items,
    setItems,
  };
}