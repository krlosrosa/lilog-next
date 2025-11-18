import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { finalizarPausaGeralParams } from '@/_services/api/schema/gestao-produtividade/gestao-produtividade.zod';
import z from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useProdutividadeFilter } from '../useProdutividadeFilter';
import {
  getBuscarPausasAtivasQueryKey,
  useFinalizarPausaGeral as useFinalizarPausaGeralService,
} from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { useUser } from '@/_shared/providers/UserContext';
import { useEffect } from 'react';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';

export const useFinalizarPausaGeral = () => {
  const { user } = useUser();

  const clientQuery = useQueryClient();
  const { filters } = useProdutividadeFilter();

  const forms = useForm({
    resolver: zodResolver(finalizarPausaGeralParams),
    defaultValues: {
      centerId: user?.centerSelect as string,
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
    mutateAsync: finalizarPausaGeralMutation,
    isPending: isFinalizandoPausaGeral,
  } = useFinalizarPausaGeralService({
    mutation: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        clientQuery.invalidateQueries({
          queryKey: [
            getBuscarPausasAtivasQueryKey(user?.centerSelect as string),
          ],
        });
        clientQuery.invalidateQueries({ queryKey: ['pausas-ativas'] });
        clientQuery.invalidateQueries({ queryKey: ['produtividade'] });
      },
    },
  });
  // 5. Esta função agora recebe os dados do *formulário* e os transforma no payload da *API*
  function finalizarPausaGeral(
    data: z.infer<typeof finalizarPausaGeralParams>,
  ) {
    const promise = finalizarPausaGeralMutation(data);
    toast.promise(promise, {
      loading: 'Finalizando pausa geral...',
      success: 'Pausa geral finalizada com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    isFinalizandoPausaGeral,
    finalizarPausaGeral,
    forms,
    filters,
  };
};
