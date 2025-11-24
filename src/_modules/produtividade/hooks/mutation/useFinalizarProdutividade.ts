import { useFinalizarPaleteProdutividade } from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useFinalizarProdutividade = () => {
  const clientQuery = useQueryClient();
  const [paletes, setPaletes] = useState<string[]>([]);

  const {
    mutateAsync: finalizarProdutividadeMutation,
    isPending: isFinalizandoProdutividade,
  } = useFinalizarPaleteProdutividade({
    mutation: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },    
      onSuccess: () => {
        clientQuery.invalidateQueries({ queryKey: ['produtividade'] });
        setPaletes([]);
      },  
    },
  });

  function finalizarProdutividade() {
    const promise = finalizarProdutividadeMutation({ data: paletes });
    toast.promise(promise, {
      loading: 'Salvando demanda...',
      success: 'Demanda salva com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    finalizarProdutividade,
    isFinalizandoProdutividade,
    paletes,
    setPaletes,
  };
};
