import { useDeletarDemandaAnomalia } from "@/_services/api/service/gestao-produtividade/gestao-produtividade";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useExcluirDemanda() {
  const queryClient = useQueryClient();
  const { mutateAsync: excluirDemanda, isPending: isExcluindoDemanda } = useDeletarDemandaAnomalia({
   
    mutation: {
      retry: (failureCount, error) => {
        return error.message.includes('500') && failureCount < 3
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['produtividade'] });
      },
    },
  })

  function handleExcluirDemanda(id: string) {
    const promise = excluirDemanda({ idDemanda: id });
    toast.promise(promise, {
      loading: 'Excluindo demanda...',
      success: 'Demanda excluída com sucesso!',
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleExcluirDemanda,
    isExcluindoDemanda,
  }
}