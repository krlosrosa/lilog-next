import { EditUserDtoTurno, UserDtoOutput } from "@/_services/api/model";
import { useAtualizarUsuario } from "@/_services/api/service/user/user";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useEditarFuncionario = (user: UserDtoOutput) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(user.name);
  const [turno, setTurno] = useState<string>(user.turno);
  const { mutateAsync: editarFuncionario, isPending: isEditing } = useAtualizarUsuario({
    mutation: {
      retry: (failureCount, error) => {
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
        setOpen(false);
      },
    },
  });

  function handleEdit() {
    const promise = editarFuncionario({ id: user.id, data: { name, turno: turno as EditUserDtoTurno } });
      toast.promise(promise, {
      loading: 'Editando funcionário...',
      success: 'Funcionário editado com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    name,
    setName,
    turno,
    setTurno,
    handleEdit,
    isEditing,
  }
}