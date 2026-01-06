import { useState } from "react";
import useReabrirDemandaMutation from "./mutation/reabrirDemanda";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";

export default function useReabrirDemanda() {
  const { reabrirDemandaMutation, isReabrindoDemanda } = useReabrirDemandaMutation();
  const [open, setOpen] = useState(false);
  function handleReabrirDemanda(id: string) {
    const promise = reabrirDemandaMutation({ id });
    toast.promise(promise, {
      loading: 'Reabrindo demanda...',
      success: (response: string) => {
        setOpen(false);
        return `Demanda reaberta com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleReabrirDemanda,
    isReabrindoDemanda,
    open,
    setOpen,
  }
}