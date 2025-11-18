import { useCriarUsuario as useCriarUsuarioService } from "@/_services/api/service/user/user";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { z } from "zod";
import { criarUsuarioBody } from "@/_services/api/schema/user/user.zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/_shared/providers/UserContext";

export const useCriarUsuario = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const form = useForm<z.infer<typeof criarUsuarioBody>>({
    resolver: zodResolver(criarUsuarioBody),
    defaultValues: {
      centerId: user?.centerSelect as string,
      role: 'ADMIN' as const,
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync: addUser, isPending: isCreating } = useCriarUsuarioService({
    mutation: {
      onSuccess: () => {
        form.reset({
          centerId: user?.centerSelect as string,
          role: 'ADMIN' as const,
        });
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        centerId: user?.centerSelect as string,
        role: 'ADMIN' as const,
      });
    }
  }, [open, user?.centerSelect, form]);

  function handleAddUser(data: z.infer<typeof criarUsuarioBody>) {
    const promise = addUser({ data });
    toast.promise(promise, {
      loading: 'Salvando usuário...',
      success: 'Usuário salvo com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleAddUser,
    isCreating,
    form,
    open,
    setOpen,
  };
}