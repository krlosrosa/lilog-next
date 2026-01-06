import { useState } from "react";
import useAddNota from "./mutation/addNota";
import { AddNotaDto } from "@/_services/api/model";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";

export default function useAddNotaDevolucao() {
  const [open, setOpen] = useState(false);
  const { addNotaMutation, isAddingNota } = useAddNota();

  function handleAddNota(data: AddNotaDto) {
    const promise = addNotaMutation({ data });
    toast.promise(promise, {
      loading: 'Adicionando nota...',
      success: (response: string) => {
        setOpen(false);
        return `Nota adicionada com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    handleAddNota,
    isAddingNota,
  }

}