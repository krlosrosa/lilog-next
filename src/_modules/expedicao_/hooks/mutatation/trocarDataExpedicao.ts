import { useTrocarDataExpedicaoTransportes } from "@/_services/api/service/transporte/transporte";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useTrocarDataExpedicaoService() {
  const queryClient = useQueryClient();
  const { mutateAsync: trocarDataExpedicao, isPending } = useTrocarDataExpedicaoTransportes({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['buscarTodosTransportesSemTransporte'],
        });
      },
    },
  });

  function trocarDataExpedicaoMutation(dataExpedicao: string, data: string[]) {
    const promise = trocarDataExpedicao({ dataExpedicao, data });
    toast.promise(promise, {
      loading: 'Trocando data de expedição...',
      success: 'Data de expedição trocada com sucesso!',
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }
  return { trocarDataExpedicaoMutation, isPending };
}