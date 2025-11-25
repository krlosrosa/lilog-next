import { useForm } from "react-hook-form";
import { useAddCargaParada } from "./mutation/transporte/addCargaParada";
import { zodResolver } from "@hookform/resolvers/zod";
import { criarCargaParadaBody } from "@/_services/api/schema/transporte/transporte.zod";
import z from "zod";
import { useUser } from "@/_shared/providers/UserContext";
import { useBuscarTransporte } from "./queries/useBuscarTransporte";
import { useState } from "react";

export default function useTransporte() {
  const { user } = useUser();
  const [transporteId, setTransporteId] = useState<string>('');
  const { transporte, isLoading } = useBuscarTransporte(transporteId);
  const form = useForm<z.infer<typeof criarCargaParadaBody>>({
    resolver: zodResolver(criarCargaParadaBody),
    defaultValues: {
      motivo: '',
      dataExpedicao: new Date().toISOString().split('T')[0],
      transportId: transporteId,
      userId: user?.id as string,
      observacao: '',
    },
  });
  const { isCriandoCargaParada, criarCargaParada } = useAddCargaParada();

  const onSubmit = (data: z.infer<typeof criarCargaParadaBody>) => {
    criarCargaParada({
      ...data,
      transportId: transporteId,
      dataExpedicao: new Date().toISOString().split('T')[0],
    }); 
    form.reset();
    setTransporteId('');
  };

  return {
    form,
    onSubmit,
    isCriandoCargaParada,
    transporte,
    setTransporteId,
    transporteId,
  };
}