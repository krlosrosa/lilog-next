import { useDeletarRegraDeMotor } from "@/_services/api/service/center/center";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export function useDeleteEngineRules() {

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteEngineRules, isPending: isDeletingEngineRules } =
    useDeletarRegraDeMotor({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['regras'] });
        },
      },
    });

  function deleteEngineRulesFunction(id: string) {
    const promise = deleteEngineRules({ id: id });
    toast.promise(promise, {
      loading: 'Deletando regra de motor...',
      success: 'Regra de motor deletada com sucesso!',
      error: (err) => `Ocorreu um erro: ${err.message || 'Tente novamente.'}`,
    });
  }

  return {
    deleteEngineRules,
    deleteEngineRulesFunction,
    isDeletingEngineRules,
    open,
    setOpen,
  }
}