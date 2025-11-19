import { useProdutividadeOperations } from '../useProdutividadeOperations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { criarDemandaProdutividadeBody } from '@/_services/api/schema/gestao-produtividade/gestao-produtividade.zod';
import z from 'zod';
import { useCriarDemandaProdutividade } from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useUser } from '@/_shared/providers/UserContext';
import { useProdutividadeFilter } from '../useProdutividadeFilter';
import { useEffect, useState } from 'react';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';

type InferZod = z.infer<typeof criarDemandaProdutividadeBody>;

export const useAddProdutividade = () => {
  const clientQuery = useQueryClient();
  const { filters } = useProdutividadeFilter();
  const { user } = useUser();
  const [currentTab, setCurrentTab] = useState<'palete' | 'funcionario'>(
    'palete',
  );

  const forms = useForm({
    resolver: zodResolver(criarDemandaProdutividadeBody),
    defaultValues: {
      centerId: user?.centerSelect as string,
      dataExpedicao: filters.dataRegistro as string,
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
    mutateAsync: criarDemandaProdutividadeMutation,
    isPending: isCriandoDemanda,
  } = useCriarDemandaProdutividade({
    mutation: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },    
      onSuccess: () => {
        setCurrentTab('palete');
        clientQuery.invalidateQueries({ queryKey: ['produtividade'] });
          forms.reset();
          forms.setValue('centerId', user?.centerSelect as string);
          forms.setValue('processo', filters.processo as 'SEPARACAO' | 'CARREGAMENTO' | 'CONFERENCIA');
          forms.setValue('dataExpedicao', filters.dataRegistro as string);
        },
    },
  });

  function criarDemandaProdutividade(data: InferZod) {
    const promise = criarDemandaProdutividadeMutation({ data });
    // 3. Passe a promise para o toast.promise()
    toast.promise(promise, {
      loading: 'Salvando demanda...',
      success: 'Demanda salva com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    isCriandoDemanda,
    criarDemandaProdutividade,
    forms,
    filters,
    currentTab,
    setCurrentTab,
  };
};
