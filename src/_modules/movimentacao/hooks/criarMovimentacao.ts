import { criarNovaMovimentacaoBody } from "@/_services/api/schema/movimentacao/movimentacao.zod";
import { useCriarNovaMovimentacao } from "@/_services/api/service/movimentacao/movimentacao";
import { useUser } from "@/_shared/providers/UserContext";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from 'zod';

export type CriarNovaMovimentacaoFormSchema = z.infer<typeof criarNovaMovimentacaoBody>

export function useCriarMovimentacao() {

  const clientQuery = useQueryClient();
  const { mutateAsync: criarMovimentacaoMutation, isPending: isCriandoMovimentacao } = useCriarNovaMovimentacao({
    mutation: {
      onSuccess: () => {
        clientQuery.invalidateQueries({ queryKey: ['movimentacao'] });
      },
    },
  });


  const { user } = useUser();
  function criarMovimentacao(data: CriarNovaMovimentacaoFormSchema) {
    const addMap = data.map(item => {
      const {...rest } = item;
      return {
        ...rest,
        idCentro: user?.centerSelect as string,
      }
    });
    const promise = criarMovimentacaoMutation({ data: addMap });
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