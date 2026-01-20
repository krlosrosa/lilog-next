import { criarNovoCentroBody } from "@/_services/api/schema/center/center.zod";
import { useCriarNovoCentro } from "@/_services/api/service/center/center";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const useAddNewCenter = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof criarNovoCentroBody>>({
    resolver: zodResolver(criarNovoCentroBody),
  });

  const queryClient = useQueryClient();

  const { mutateAsync: addCentro, isPending: isCreating } = useCriarNovoCentro({
    mutation: {
      onSuccess: () => {
        form.reset();
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['centers'] });
      },
    },
  });

  function handleAddNewCenter(data: z.infer<typeof criarNovoCentroBody>) {
    const promise = addCentro({ data });
    toast.promise(promise, {
      loading: 'Salvando centro...',
      success: 'Centro salvo com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleAddNewCenter,
    isCreating,
    form,
    open,
    setOpen,
  };
}