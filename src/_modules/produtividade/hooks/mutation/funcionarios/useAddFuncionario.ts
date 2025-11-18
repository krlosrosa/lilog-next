import { useCriarUsuario } from "@/_services/api/service/user/user";
import { CreateUserDto } from "@/_services/api/model";
import { criarUsuarioBody } from "@/_services/api/schema/user/user.zod";
import toast from "react-hot-toast";
import z from "zod";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/_shared/providers/UserContext";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useAddFuncionario = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutateAsync: addUFuncionario, isPending: isCreating } = useCriarUsuario({
    mutation: {
      retry: (failureCount, error) => {
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
        form.reset();
        setOpen(false);
      },
    },
  });

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof criarUsuarioBody>>({
    resolver: zodResolver(criarUsuarioBody),
    defaultValues: {
      centerId: user?.centerSelect as string,
      role: 'FUNCIONARIO' as const,
    },
  });


  const handleAddFuncionario = (data: z.infer<typeof criarUsuarioBody>) => {
    const promise = addUFuncionario({ data });
    toast.promise(promise, {
      loading: 'Salvando funcionário...',
      success: 'Funcionário salvo com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  };

  return {
    form,
    handleAddFuncionario,
    isCreating,
    open,
    setOpen,
  };
}