import { useBuscarTodosTransportes, useBuscarTodosTransportesSemTransporte } from "@/_services/api/service/transporte/transporte";
import { useUser } from "@/_shared/providers/UserContext";
import { useTransporteFilter } from "./useTransporteFilter";
import { BuscarTodosTransportesSemTransporteCarregamento, BuscarTodosTransportesSemTransporteConferencia, BuscarTodosTransportesSemTransporteSeparacao } from "@/_services/api/model";

export default function useGetAllTransportes(dataExpedicao?: string) {
  const { user } = useUser()
  const { filters } = useTransporteFilter();
  const defaultDate = new Date('2025-11-12').toISOString().split('T')[0];
  const dataExpedicaoFinal = dataExpedicao || defaultDate;
  
  const { data: transportes, isLoading } = useBuscarTodosTransportesSemTransporte(user?.centerSelect as string,{
    dataExpedicao: dataExpedicaoFinal,
    separacao: filters.separacao as BuscarTodosTransportesSemTransporteSeparacao,
    conferencia: filters.conferencia as BuscarTodosTransportesSemTransporteConferencia,
    carregamento: filters.carregamento as BuscarTodosTransportesSemTransporteCarregamento,
    cargaParada: filters.cargaParada === 'true' ? true : undefined,
  }, {
    query: {
      enabled: !!dataExpedicaoFinal,
      refetchInterval: 1000 * 60, // 1 minuto
      queryKey: ['buscarTodosTransportesSemTransporte', dataExpedicaoFinal, filters.cargaParada],
    }
  });

  return { transportes, isLoading };
}