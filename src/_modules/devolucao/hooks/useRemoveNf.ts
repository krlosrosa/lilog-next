import toast from "react-hot-toast";
import useRemoveNotaMutation from "./mutation/removeNota";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useState } from "react";

export default function useRemoveNf() {
  const { removeNotaMutation, isRemovingNota } = useRemoveNotaMutation();
  const [open, setOpen] = useState(false);

  function handleRemoveNf(id: string) {
    const promise = removeNotaMutation({ id });
    toast.promise(promise, {
      loading: 'Removendo nota...',
      success: 'Nota removida com sucesso!',
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }
  return {
    handleRemoveNf,
    isRemovingNota,
  }
}