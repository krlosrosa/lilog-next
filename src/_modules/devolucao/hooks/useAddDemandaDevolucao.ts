import { useUser } from "@/_shared/providers/UserContext";
import { useState } from "react";
import { useDevolucao } from "./usedevolucao";
import useAddDemanda from "./mutation/addDemanda";
import { AddDemandaDto } from "@/_services/api/model";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import z from "zod";
import { addDemandaDevolucaoBody } from "@/_services/api/schema/devolucao/devolucao.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function useAddDemandaDevolucao() {
  const { user } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { viagemId, setViagemId, data: infoViagem, isLoading } = useDevolucao();
  const { criarDemandaMutation, isCriandoDemanda } = useAddDemanda();

  const form = useForm<z.infer<typeof addDemandaDevolucaoBody>>({
    resolver: zodResolver(addDemandaDevolucaoBody),
    defaultValues: {
      placa: '',
      motorista: '',
      idTransportadora: '',
      viagemId: viagemId ?? '',
      telefone: '',
      cargaSegregada: false,
      paletesRetorno: 0,
      doca: '',
    },
  });

  function handleCriarDemanda(data: AddDemandaDto) {
    const promise = criarDemandaMutation({ centerId: user?.centerSelect as string, data })
    toast.promise(promise, {
      loading: 'Criando demanda...',
      success: (response) => {
        router.push(`/devolucao/demanda/${response}`);
        return `Demanda criada com sucesso! ID: ${response}`;
      },
      error: (err: any) => `${getAxiosErrorMessage(err) || 'Tente novamente mais tarde.'}`,
    });
  }

  return {
    open,
    setOpen,
    viagemId,
    setViagemId,
    infoViagem,
    isLoading,
    form,
    handleCriarDemanda,
    isCriandoDemanda,
  }
}