import { useFinalizarPausaIndividual } from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useFinalizarPausa = () => {
  const [paleteId, setPaleteId] = useState<string>('');
  const [internalOpen, setInternalOpen] = useState(false);

  const clientQuery = useQueryClient();

  const {
    mutateAsync: finalizarPausaIndividualMutation,
    isPending: isFinalizandoPausaIndividual,
  } = useFinalizarPausaIndividual({
    mutation: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        clientQuery.invalidateQueries({ queryKey: ['pausas'] });
        clientQuery.invalidateQueries({ queryKey: ['produtividade'] });
        setPaleteId('');
        setInternalOpen(false);
      },
    },
  });

  function finalizarPausa() {
    if (!paleteId) {
      toast.error('O ID do palete é obrigatório');
      return;
    }
    const promise = finalizarPausaIndividualMutation({ paleteId });
    toast.promise(promise, {
      loading: 'Finalizando pausa...',
      success: 'Pausa finalizada com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    finalizarPausa,
    isFinalizandoPausaIndividual,
    paleteId,
    setPaleteId,
    internalOpen,
    setInternalOpen,
  };
};
