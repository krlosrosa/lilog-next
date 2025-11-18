import { AddItemsTransporteDto } from "@/_services/api/model";
import { useAdicionarItensAoTransporte } from "@/_services/api/service/transporte/transporte";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddIntesTransporte() {
  const queryClient = useQueryClient();
  const { mutateAsync: addIntesTransporte, isPending } = useAdicionarItensAoTransporte({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['buscarTodosTransportes'],
        });
      },
    },
  });
  function addIntesTransporteMutation(data: AddItemsTransporteDto[]) {
    const promise = addIntesTransporte({ data });
    toast.promise(promise, {
      loading: 'Salvando itens no transporte...',
      success: 'Itens salvos com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }
  return { addIntesTransporteMutation, isPending };
}