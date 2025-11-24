import { useCriarConfiguracaoImpressao } from "@/_services/api/service/center/center";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { criarConfiguracaoImpressaoBody } from "@/_services/api/schema/center/center.zod";
import { z } from "zod";
import { useUser } from "@/_shared/providers/UserContext";
import { useEffect, useState } from "react";
import { useDragSensors } from "../use-drag-sensors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Empresa, FormValues, OrdemOpenState } from "../../components/config/types";
import { useGetConfiguracaoMapa } from "../queries/useGetConfiguracaoMapa";

export function useCriarConfiguracaoCentro() {
  const { user } = useUser();
  const [empresa, setEmpresa] = useState<Empresa>('LDB');
  const [ordemOpen, setOrdemOpen] = useState<OrdemOpenState>({
    conferencia: false,
    fifo: false,
    paletes: false,
    picking: false,
    unidades: false,
  });
  const { configuracaoImpressa, isLoadingConfiguracaoImpressa, error } = useGetConfiguracaoMapa(empresa);

  const sensors = useDragSensors();

  const defaultValues = {
    id: '',
    tipoImpressao: 'CLIENTE',
    empresa: empresa,
    quebraPalete: false,
    tipoQuebra: null,
    valorQuebra: null,
    separarPaleteFull: false,
    separarUnidades: false,
    exibirInfoCabecalho: null,
    segregarFifo: null,
    dataMaximaPercentual: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    centerId: user?.centerSelect || '',
    atribuidoPorId: user?.id || null,
    tipoImpressaoConferencia: 'CLIENTE',
    ordemConferencia: null,
    ordemFifo: null,
    ordemPaletes: null,
    ordemPicking: null,
    ordemUnidades: null,
  } as FormValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(criarConfiguracaoImpressaoBody),
    defaultValues: defaultValues,
  });

  // Atualiza o campo empresa no form quando o state empresa mudar
  useEffect(() => {
    form.setValue('empresa', empresa);
  }, [empresa, form]);

  const onSubmit = (data: FormValues) => {
    // Garante que a empresa do state seja usada
    const dataToSend = {
      ...data,
      empresa: empresa,
      updatedAt: new Date().toISOString(),
    };
    criarConfiguracaoCentroMutation(dataToSend);
  };

  // Preenche o formulário quando a configuração chegar do backend
  useEffect(() => {
    if (!isLoadingConfiguracaoImpressa) {
      if (error) {
        setOrdemOpen({
          conferencia: false,
          fifo: false,
          paletes: false,
          picking: false,
          unidades: false,
        });
        // Se não retornou nada (null, undefined, ou objeto vazio), usa os valores default
        const defaultValuesAtualizados = {
          ...defaultValues,
          empresa: empresa, // Garante que usa a empresa atual do state
          updatedAt: new Date().toISOString(),
        };
        form.reset(defaultValuesAtualizados);
      }
      if (configuracaoImpressa) {
        // Se retornou dados do backend, usa os dados retornados
        // Normaliza os valores de tipoImpressao e tipoImpressaoConferencia para maiúsculas
        // para garantir compatibilidade mesmo se vierem em minúsculas do backend
        const tipoImpressaoNormalizado = configuracaoImpressa.tipoImpressao 
          ? (String(configuracaoImpressa.tipoImpressao).toUpperCase() as 'TRANSPORTE' | 'CLIENTE')
          : 'CLIENTE';
        
        const tipoImpressaoConferenciaNormalizado = configuracaoImpressa.tipoImpressaoConferencia
          ? (String(configuracaoImpressa.tipoImpressaoConferencia).toUpperCase() as 'TRANSPORTE' | 'CLIENTE')
          : 'CLIENTE';
        
        const formData = {
          ...configuracaoImpressa,
          empresa: empresa, // Garante que usa a empresa do state
          updatedAt: new Date().toISOString(),
          tipoImpressao: tipoImpressaoNormalizado,
          tipoImpressaoConferencia: tipoImpressaoConferenciaNormalizado,
        } as FormValues;
        
        // Usa reset com keepDefaultValues: false para garantir que os valores sejam aplicados
        form.reset(formData, { keepDefaultValues: false });
        
        // Força a atualização dos campos tipoImpressao e tipoImpressaoConferencia
        // para garantir que o Select reflita os valores corretamente
        form.setValue('tipoImpressao', tipoImpressaoNormalizado, { shouldValidate: true, shouldDirty: false });
        form.setValue('tipoImpressaoConferencia', tipoImpressaoConferenciaNormalizado, { shouldValidate: true, shouldDirty: false });
        
      }
    }
  }, [configuracaoImpressa, isLoadingConfiguracaoImpressa, error, empresa]);


  const queryClient = useQueryClient();
  const { mutateAsync: criarConfiguracaoCentro, isPending: isCreatingConfiguracaoCentro } = useCriarConfiguracaoImpressao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['configuracaoImpressa'],
        });
      },
    },
  });

  function criarConfiguracaoCentroMutation(data: z.infer<typeof criarConfiguracaoImpressaoBody>) {
    const promise = criarConfiguracaoCentro({ centerId: data.centerId, data: data });
    toast.promise(promise, {
      loading: 'Salvando configuração de centro...',
      success: 'Configuração de centro salva com sucesso!',
      error: (err) => `${getAxiosErrorMessage(err) || 'Tente novamente.'}`,
    });
  }

  return {
    criarConfiguracaoCentroMutation,
    isCreatingConfiguracaoCentro,
    form,
    onSubmit,
    empresa,
    setEmpresa,
    ordemOpen,
    setOrdemOpen,
    sensors,
    isLoadingConfiguracaoImpressa
  }
}