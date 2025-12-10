import { criarNovaMovimentacaoBody } from "@/_services/api/schema/movimentacao/movimentacao.zod";
import { useCriarNovaMovimentacao } from "@/_services/api/service/movimentacao/movimentacao";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from 'zod';

type CriarNovaMovimentacaoFormSchema = z.infer<typeof criarNovaMovimentacaoBody>

export function useCriarMovimentacao() {
  const { mutateAsync: criarMovimentacaoMutation, isPending: isCriandoMovimentacao } = useCriarNovaMovimentacao();
  const clientQuery = useQueryClient();


  
  function criarMovimentacao(data: CriarNovaMovimentacaoFormSchema) {
    const promise = criarMovimentacaoMutation({ data });
    toast.promise(promise, {
      loading: 'Salvando movimentação...',
      success: 'Movimentação salva com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    criarMovimentacao,
    isCriandoMovimentacao,
  };

}