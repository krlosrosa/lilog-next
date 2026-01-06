import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import useFinalizarDemandaMutation from "./mutation/finalizarDemanda";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useFinalizarDemanda() {
  const { finalizarDemandaMutation, isFinalizandoDemanda } = useFinalizarDemandaMutation();
  const [open, setOpen] = useState(false);
  function handleFinalizarDemanda(id: string) {
    const promise = finalizarDemandaMutation({ id });
    toast.promise(promise, {
      loading: 'Finalizando demanda...',
      success: (response: string) => {
        setOpen(false);
        return `Demanda finalizada com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleFinalizarDemanda,
    isFinalizandoDemanda,
    open,
    setOpen,
  }
}