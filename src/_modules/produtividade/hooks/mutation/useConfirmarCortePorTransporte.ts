import { useConfirmarCorteDeProdutoPorTransporte } from "@/_services/api/service/corte-produto/corte-produto";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export default function useConfirmarCortePorTransporte() {
  const queryClient = useQueryClient();
  const { mutateAsync: confirmarCortePorTransporteMutation, isPending: isConfirmandoCortePorTransporte } = useConfirmarCorteDeProdutoPorTransporte({
    mutation: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['buscarCortesPendentesOp'] });
      },
    },
  });

  function confirmarCortePorTransporte(transporteId: string, setOpen: Dispatch<SetStateAction<boolean>>) {
    const promise = confirmarCortePorTransporteMutation({ transporteId });
    toast.promise(promise, {
      loading: 'Confirmando corte por transporte...',
      success: 'Corte por transporte confirmado com sucesso!',
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
    setOpen(false);
  }

  return {
    confirmarCortePorTransporte,
    isConfirmandoCortePorTransporte,
  }
}