import { useUser } from "@/_shared/providers/UserContext";
import { uploadDemandamovimentacao } from "../../services/uploaddemandamovimentacao";
import { CreateMovimentacaoDto } from "@/_services/api/model";
import { useState } from "react";
import { AddContagemLiteValidationMutationBody, CriarNovaMovimentacaoMutationBody } from "@/_services/api/service/movimentacao/movimentacao";
import useCadastrarContagem, { ContagemLiteFormSchema } from "./cadastrar-contagem";
import { uploadContagemLite } from "../../services/upload-demanda-";

export const useContagemLite = () => {

  const [formData, setFormData] = useState<ContagemLiteFormSchema[]>([]);
  const [items, setItems] = useState<AddContagemLiteValidationMutationBody>([]);
  const { user } = useUser();
  const [dataRef, setDataRef] = useState<string>('2025-12-12');
  const { handleCadastrarContagem } = useCadastrarContagem();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const contagemLite = await uploadContagemLite(file, user?.id as string, user?.centerSelect as string, dataRef);
      console.log('contagemLite', contagemLite);
      setItems(contagemLite);
    }
  };

  const handleCadastrarContagemLite = async () => {
    await handleCadastrarContagem(items);
  };

  return {
    dataRef,
    setDataRef,
    handleFileChange,
    handleCadastrarContagemLite,
    formData,
    setFormData,
    items,
    setItems,
  };
}