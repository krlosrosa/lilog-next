import { useDeletarCorteDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";

export function useDeletarCorteProduto() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: deletarCorte, isPending: isDeletando } = useDeletarCorteDeProduto();

  function handleDeletarCorte(id: string) {
    const promise = deletarCorte({ id }).then(() => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["cortes-produto"] });
    });
    toast.promise(promise, {
      loading: "Excluindo corte...",
      success: "Corte excluído com sucesso!",
      error: (err: unknown) =>
        getAxiosErrorMessage(err) ?? "Erro ao excluir corte. Tente novamente.",
    });
    return promise;
  }

  return {
    open,
    setOpen,
    handleDeletarCorte,
    isDeletando,
  };
}
