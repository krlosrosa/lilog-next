import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useState } from "react";
import toast from "react-hot-toast";
import useDeletarDemandaDevolucaoMutation from "./mutation/deletarDemandaDevolucao";
import { useRouter } from "next/navigation";

export default function useDeletarDemanda() {
  const router = useRouter();
  const { deletarDemandaDevolucaoMutation, isDeletandoDemandaDevolucao } = useDeletarDemandaDevolucaoMutation();
  const [open, setOpen] = useState(false);
  function handleDeletarDemanda(id: string) {
    const promise = deletarDemandaDevolucaoMutation({ id });
    toast.promise(promise, {
      loading: 'Deletando demanda...',
      success: (response: string) => {
        router.push(`/devolucao`);
        setOpen(false);
        return `Demanda deletada com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }
  return {
    handleDeletarDemanda,
    isDeletandoDemandaDevolucao,
    open,
    setOpen,
  }
}