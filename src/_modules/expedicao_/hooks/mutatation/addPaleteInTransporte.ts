import { PaleteCreateDataDto } from "@/_services/api/model";
import { useAdicionarPaletesAoTransporte } from "@/_services/api/service/transporte/transporte";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddPaleteInTransporte() {
  const queryClient = useQueryClient();
  const { mutateAsync: addPaleteInTransporte, isPending } = useAdicionarPaletesAoTransporte({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['buscarTodosTransportes'],
        });
      },
    },
  });

 async function addPaleteInTransporteMutation(data: PaleteCreateDataDto[]) {
    const promise = addPaleteInTransporte({ data })
    return toast.promise(promise, {
      loading: 'Salvando paletes no transporte...',
      success: 'Paletes salvas com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }
  return { 
    addPaleteInTransporteMutation, 
    isPending,
  }

}