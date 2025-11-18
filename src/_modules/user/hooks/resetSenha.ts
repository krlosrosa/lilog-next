import { useResetarSenha } from "@/_services/api/service/user/user";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useResetSenha = () => {
  const [open, setOpen] = useState(false);
  const client = useQueryClient();
  const { mutateAsync: resetPassword, isPending: isResetPassword } =
  useResetarSenha ({
    mutation: {
      onSuccess: () => {
        setOpen(false);
        client.invalidateQueries({ queryKey: ['users'] });
      },
    },
  });

  function handleResetPassword(id: string, password: string) {
    const promise = resetPassword({ id, password });
    toast.promise(promise, {
      loading: 'Resetando senha...',
      success: 'Senha resetada com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    handleResetPassword,
    isResetPassword,
  }
}