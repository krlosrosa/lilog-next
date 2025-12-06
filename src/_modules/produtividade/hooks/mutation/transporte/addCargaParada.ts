import { useMutation, useQueryClient } from "@tanstack/react-query";
import { criarCargaParada, useCriarCargaParada } from "@/_services/api/service/transporte/transporte";
import { criarCargaParadaBody } from "@/_services/api/schema/transporte/transporte.zod";
import z from "zod";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";

export const useAddCargaParada = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: criarCargaParadaMutation, isPending: isCriandoCargaParada } = useCriarCargaParada({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['buscarTransporte'],
        });
      },
    }
  });

  function criarCargaParada(data: z.infer<typeof criarCargaParadaBody>) {
    const promise = criarCargaParadaMutation({ data });
    toast.promise(promise, {
      loading: 'Salvando carga parada...',
      success: 'Carga parada salva com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    isCriandoCargaParada,
    criarCargaParada,
  }
}