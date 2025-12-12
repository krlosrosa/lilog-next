import { addContagemLiteValidationBody } from "@/_services/api/schema/movimentacao/movimentacao.zod";
import { useAddContagemLiteValidation } from "@/_services/api/service/movimentacao/movimentacao";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";

export type ContagemLiteFormSchema = z.infer<typeof addContagemLiteValidationBody>

export default function useCadastrarContagem() {
  const queryClient = useQueryClient();
  const { mutateAsync: cadastrarContagem, isPending: isCadastrandoContagem } = useAddContagemLiteValidation({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contagem-lite'] });
      },
    },
  });
  function handleCadastrarContagem(data: ContagemLiteFormSchema) {
    const promise = cadastrarContagem({ data });
    toast.promise(promise, {
      loading: 'Cadastrando contagem...',
      success: 'Contagem cadastrada com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    handleCadastrarContagem,
    isCadastrandoContagem,
  }
}