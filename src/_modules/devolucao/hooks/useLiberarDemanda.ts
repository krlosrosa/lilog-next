import { useState } from "react";
import useLiberarDemandaMutation from "./mutation/liberarDemanda";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";

export default function useLiberarDemanda() {
  const { liberarDemandaMutation, isLiberandoDemanda } = useLiberarDemandaMutation();
  const [open, setOpen] = useState(false);
  function handleLiberarDemanda(demandaId: string) {
    const promise = liberarDemandaMutation({ demandaId });
    toast.promise(promise, {
      loading: 'Liberando demanda...',
      success: (response: string) => {
        setOpen(false);
        return `Demanda liberada com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }
  return {
    open,
    setOpen,
    liberarDemandaMutation,
    isLiberandoDemanda,
    handleLiberarDemanda,
  }
}