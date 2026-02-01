import { useConfirmarCorteDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useConfirmarCorte() {

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {mutateAsync: confirmarCorte}= useConfirmarCorteDeProduto({
    mutation: {
      onSuccess: () => {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['cortes-produto'] });
      },
    },
  });

  function handleAddCorteProduto (id: string){
    const promise = confirmarCorte({
      id,
    });
    toast.promise(promise, {
      loading: 'Confirmando corte de produto...',
        success: 'Corte de produto confirmado com sucesso!',
        error: (err: any) => `Ocorreu um erro: ${err.message || 'Tente novamente.'}`,
    });
  }

  return {
    open,
    setOpen,
    handleAddCorteProduto,
  }
}