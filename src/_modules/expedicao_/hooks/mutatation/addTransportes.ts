import { CreateTransporteDto } from "@/_services/api/model";
import { useCriarTransporteEmMassa } from "@/_services/api/service/transporte/transporte"
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddTransportes() {
  const queryClient = useQueryClient()
  const { mutateAsync: addTransportes, isPending } = useCriarTransporteEmMassa({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['transportes'],
        });
      },
    },
  })
  function addTransportesMutation(data: CreateTransporteDto[]) {
    const promise = addTransportes({ data })
    toast.promise(promise, {
      loading: 'Salvando transportes...',
      success: 'Transportes salvos com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }
  return { addTransportesMutation, isPending }
}