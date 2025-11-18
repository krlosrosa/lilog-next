import { useDeletarUsuario } from "@/_services/api/service/user/user"
import { useUser } from "@/_shared/providers/UserContext";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useExcluirFuncionario = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteFuncionario, isPending: isDeleting } = useDeletarUsuario  ({

    mutation: {
      retry: (failureCount, error) => {
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
      },
    },
  });

  function handleDeleteFuncionario(id: string) {
    const promise = deleteFuncionario({ id, centerId: user?.centerSelect as string });
    toast.promise(promise, {
      loading: 'Deletando funcionário...',
      success: 'Funcionário deletado com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    deleteFuncionario,
    isDeleting,
    handleDeleteFuncionario,
    open,
    setOpen,
  }
}