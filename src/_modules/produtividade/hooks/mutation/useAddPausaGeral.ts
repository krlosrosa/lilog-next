import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addPausaGeralBody } from '@/_services/api/schema/gestao-produtividade/gestao-produtividade.zod';
import z from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useProdutividadeFilter } from '../useProdutividadeFilter';
import {
  getBuscarPausasAtivasQueryKey,
  useAddPausaGeral as useAddPausaGeralService,
} from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { useUser } from '@/_shared/providers/UserContext';
import { useEffect } from 'react';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';

export const useAddPausaGeral = () => {
  const { user } = useUser();

  const clientQuery = useQueryClient();
  const { filters } = useProdutividadeFilter();

  const forms = useForm({
    resolver: zodResolver(addPausaGeralBody),
    defaultValues: {
      centerId: user?.centerSelect as string,
      inicio: new Date().toISOString(),
      processo: filters.processo as
        | 'SEPARACAO'
        | 'CARREGAMENTO'
        | 'CONFERENCIA',
    },
  });

  // 2. [SOLUÇÃO] Sincroniza o filtro 'processo' com o formulário
  useEffect(() => {
    if (filters.processo) {
      forms.setValue(
        'processo',
        filters.processo as 'SEPARACAO' | 'CARREGAMENTO' | 'CONFERENCIA',
        {
          shouldValidate: true, // Opcional: valida o campo ao mudar
        },
      );
    }
  }, [filters.processo, forms.setValue]); // Depende da mudança do filtro

  const {
    mutateAsync: criarPausaGeralMutation,
    isPending: isCriandoPausaGeral,
  } = useAddPausaGeralService({
    mutation: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        (clientQuery.invalidateQueries({
          queryKey: [
            getBuscarPausasAtivasQueryKey(user?.centerSelect as string),
          ],
        }),
          clientQuery.invalidateQueries({ queryKey: ['pausas-ativas'] }),
          clientQuery.invalidateQueries({ queryKey: ['produtividade'] }),
          forms.reset()); // Isso agora vai resetar paleteId, motivo e descricao
      },
    },
  });

  // 5. Esta função agora recebe os dados do *formulário* e os transforma no payload da *API*
  function criarPausaGeral(data: z.infer<typeof addPausaGeralBody>) {
    const promise = criarPausaGeralMutation({ data });
    toast.promise(promise, {
      loading: 'Salvando pausa individual...',
      success: 'Pausa individual salva com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    isCriandoPausaGeral,
    criarPausaGeral,
    forms,
    filters,
  };
};
