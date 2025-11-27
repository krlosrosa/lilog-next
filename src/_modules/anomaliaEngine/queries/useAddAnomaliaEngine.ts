import { criarNovaRegraDeMotorBody } from "@/_services/api/schema/center/center.zod";
import { useCriarNovaRegraDeMotor } from "@/_services/api/service/center/center"
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

export const useAddAnomaliaEngine = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: addAnomaliaEngine, isPending: isAddingAnomaliaEngine } = useCriarNovaRegraDeMotor({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anomaliaEngine'] });
      },
    },
  })

  function handleAddAnomaliaEngine(data: z.infer<typeof criarNovaRegraDeMotorBody>) {
    const promise = addAnomaliaEngine({ data });
    toast.promise(promise, {
      loading: 'Salvando anomalia engine...',
      success: 'Anomalia engine salva com sucesso!',
      error: (err) => `Ocorreu um erro: ${err.message || 'Tente novamente.'}`,
    });
  }

  return {
    handleAddAnomaliaEngine,
    isAddingAnomaliaEngine,
  }
}