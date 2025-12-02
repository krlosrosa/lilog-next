import { useBuscarTodosTransportesSemTransporte } from "@/_services/api/service/transporte/transporte";
import { useUser } from "@/_shared/providers/UserContext";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useGetAllTransporteSwitchData(dataExpedicao?: string) { 
  const { user } = useUser()
  const defaultDate = new Date('2025-11-12').toISOString().split('T')[0];
  const [cargaParada, setCargaParada] = useState<boolean>(false)
  const dataExpedicaoFinal = dataExpedicao || defaultDate;
  const queryClient = useQueryClient()
  const { data: transportes, isLoading } = useBuscarTodosTransportesSemTransporte(
    user?.centerSelect as string,
    {
      dataExpedicao: dataExpedicaoFinal,
      cargaParada: cargaParada === true ? true : undefined,
    },
    {
      query: {
        enabled: !!dataExpedicao,
        queryKey: ['buscarTodosTransportesSemTransporte', dataExpedicaoFinal, cargaParada],
      },
    }
  )

  return { 
    transportes, 
    isLoading,
    setCargaParada,
    cargaParada,
  }
}