import { useUser } from "@/_shared/providers/UserContext";
import { useState } from "react";
import { AddContagemLiteValidationMutationBody, CriarNovaMovimentacaoMutationBody } from "@/_services/api/service/movimentacao/movimentacao";
import useCadastrarContagem, { ContagemLiteFormSchema } from "./cadastrar-contagem";
import { uploadContagemLite } from "../../services/upload-demanda-";
import { useDeleteContagemLiteMutation } from "./detele-contagem-lite";
import { useStatusContagem } from "./statusContagem";
import { useGetAnomaliasLite } from "./get-anomalias-lite";

export const useContagemLite = () => {

  const [formData, setFormData] = useState<ContagemLiteFormSchema[]>([]);
  const [items, setItems] = useState<AddContagemLiteValidationMutationBody>([]);
  const { user } = useUser();
  const [dataRef, setDataRef] = useState<string>('');
  const { handleCadastrarContagem } = useCadastrarContagem();
  const { deleteContagemLiteFunction, isDeletingContagemLite } = useDeleteContagemLiteMutation();
  const { statusContagem, isLoadingStatusContagem } = useStatusContagem(user?.centerSelect as string);
  const { anomaliasLite, isLoadingAnomaliasLite } = useGetAnomaliasLite(user?.centerSelect as string, dataRef);

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

  const handleDeleteContagemLite = async () => {
    await deleteContagemLiteFunction(user?.centerSelect as string);
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
    handleDeleteContagemLite,
    isDeletingContagemLite,
    statusContagem,
    isLoadingStatusContagem,
    anomaliasLite,
    isLoadingAnomaliasLite,
  };
}