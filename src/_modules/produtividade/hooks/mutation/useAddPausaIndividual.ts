// [ARQUIVO DO HOOK]
// (Ex: /hooks/useAddPausaIndividual.ts)

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Importe o schema BASE, não o que você criou no final do arquivo
import { addPausaIndividualBody } from '@/_services/api/schema/gestao-produtividade/gestao-produtividade.zod';
import z from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useProdutividadeFilter } from '../useProdutividadeFilter';
import { useAddPausaIndividual as useAddPausaIndividualService } from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';

// 1. Defina o schema DO FORMULÁRIO.
//    Isso valida os campos que o *usuário* preenche.
const addPausaIndividualFormSchema = z.object({
  paleteId: z.string().min(1, 'O ID do Palete é obrigatório'),
  motivo: z.string().min(1, 'O Motivo é obrigatório'),
  descricao: z.string().nullable().optional(),
});

// 2. Derive o tipo do *formulário*
type AddPausaIndividualFormValues = z.infer<
  typeof addPausaIndividualFormSchema
>;

// 3. Pegue o tipo do schema da API (que você já tinha)
//    Este é o tipo que a a mutation espera.
type ApiPayload = z.infer<typeof addPausaIndividualBody>;

export const useAddPausaIndividual = () => {
  const clientQuery = useQueryClient();
  const { filters } = useProdutividadeFilter();

  const forms = useForm<AddPausaIndividualFormValues>({
    resolver: zodResolver(addPausaIndividualFormSchema),
    // 4. Defina valores padrão para TODOS os campos do formulário
    defaultValues: {
      paleteId: '',
      motivo: '',
      descricao: '',
    },
  });

  const {
    mutateAsync: criarPausaIndividualMutation,
    isPending: isCriandoPausaIndividual,
  } = useAddPausaIndividualService({
    mutation: {
      retry: (failureCount, error) => {
        // Só faz retry se for erro 500
        return error.message.includes('500') && failureCount < 3
      },  
      onSuccess: () => {
        (clientQuery.invalidateQueries({ queryKey: ['produtividade'] }),
          forms.reset()); // Isso agora vai resetar paleteId, motivo e descricao
      },
    },
  });

  // 5. Esta função agora recebe os dados do *formulário* e os transforma no payload da *API*
  function criarPausaIndividual(data: AddPausaIndividualFormValues) {
    // 6. Separe o paleteId (parâmetro da URL) do resto (body)
    const { paleteId, ...formData } = data;

    // 7. Crie o payload final da API, adicionando as datas (como no seu componente antigo)
    const apiData: ApiPayload = {
      ...formData,
      inicio: new Date().toISOString(),
      descricao: formData.descricao || null, // Garante que será null se for string vazia
    };

    const promise = criarPausaIndividualMutation({ paleteId, data: apiData });

    toast.promise(promise, {
      loading: 'Salvando pausa individual...',
      success: 'Pausa individual salva com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    isCriandoPausaIndividual,
    criarPausaIndividual,
    forms,
    filters,
  };
};
