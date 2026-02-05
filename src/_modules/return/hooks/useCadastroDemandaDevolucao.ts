import { useUser } from "@/_shared/providers/UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { addDemandaDevolucaoBody } from "@/_services/api/schema/devolucao/devolucao.zod";
import { AddDemandaDto } from "@/_services/api/model";
import useAddDemanda from "@/_modules/devolucao/hooks/mutation/addDemanda";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useGetInfoApenasViagemRavex } from "@/_modules/devolucao/hooks/queries/getInfoApenasViagemRavex";

export function useCadastroDemandaDevolucao() {
  const { user } = useUser();
  const router = useRouter();
  const [viagemId, setViagemId] = useState<string>('');
  const { data: infoViagem, isLoading, error } = useGetInfoApenasViagemRavex(viagemId);
  const { criarDemandaMutation, isCriandoDemanda } = useAddDemanda();

  const form = useForm<z.infer<typeof addDemandaDevolucaoBody>>({
    resolver: zodResolver(addDemandaDevolucaoBody),
    defaultValues: {
      placa: '',
      motorista: '',
      idTransportadora: '',
      viagemId: '',
      telefone: '',
      cargaSegregada: false,
      paletesRetorno: 0,
      transporte: '',
      doca: '',
    },
  });

  // Preencher automaticamente os campos quando a viagem for encontrada
  useEffect(() => {
    if (infoViagem) {
      form.setValue('placa', infoViagem.placa);
      form.setValue('motorista', infoViagem.motorista);
      form.setValue('idTransportadora', infoViagem.transportadora);
      form.setValue('transporte', infoViagem.transporte);
      form.setValue('viagemId', infoViagem.idViagem);
    }
  }, [infoViagem, form]);

  // Atualizar viagemId no form quando mudar
  useEffect(() => {
    if (viagemId) {
      form.setValue('viagemId', viagemId);
    }
  }, [viagemId, form]);

  function handleCriarDemanda(data: z.infer<typeof addDemandaDevolucaoBody>) {
    const demandaData: AddDemandaDto = {
      ...data,
      paletesRetorno: Number(data.paletesRetorno) || 0,
    };

    const promise = criarDemandaMutation({ 
      centerId: user?.centerSelect as string, 
      data: demandaData 
    });

    toast.promise(promise, {
      loading: 'Criando demanda...',
      success: (response) => {
        // Redirecionar para página de cadastrar nota fiscal com viagemId na URL
        const viagemIdParam = viagemId ? `?viagemId=${encodeURIComponent(viagemId)}` : '';
        router.push(`/return/demanda/${response}/cadastrar-nota${viagemIdParam}`);
        return `Demanda criada com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Erro ao criar demanda. Tente novamente mais tarde.'}`,
    });
  }

  return {
    viagemId,
    setViagemId,
    infoViagem,
    isLoading,
    error,
    form,
    handleCriarDemanda,
    isCriandoDemanda,
  }
}
