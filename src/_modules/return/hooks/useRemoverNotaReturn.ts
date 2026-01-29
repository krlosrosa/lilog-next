import { useState } from "react";
import useRemoveNotaMutation from "@/_modules/devolucao/hooks/mutation/removeNota";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useRemoverNotaReturn() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { removeNotaMutation, isRemovingNota } = useRemoveNotaMutation();
  const [open, setOpen] = useState(false);
  const [notaId, setNotaId] = useState<string>('');

  function handleRemoverNota(notaIdToRemove: string) {
    const promise = removeNotaMutation({ id: notaIdToRemove });
    
    // Invalidar queries após sucesso (não bloqueante)
    promise.then(() => {
      // Invalidar lista de notas cadastradas para esta demanda
      queryClient.invalidateQueries({ queryKey: ['nf-cadastradas', 'demandas', id] });
      // Invalidar lista geral de demandas
      queryClient.invalidateQueries({ queryKey: ['demandas'] });
      // Invalidar demanda individual
      queryClient.invalidateQueries({ queryKey: ['demanda', 'demandas', id] });
      setOpen(false);
      setNotaId('');
    });

    toast.promise(promise, {
      loading: 'Removendo nota fiscal...',
      success: () => {
        return `Nota fiscal removida com sucesso!`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Erro ao remover nota fiscal. Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    notaId,
    setNotaId,
    handleRemoverNota,
    isRemovingNota,
  };
}
