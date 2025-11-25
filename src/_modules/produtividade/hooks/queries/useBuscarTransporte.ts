import { useBuscarInfoTransportePorTransportId } from "@/_services/api/service/transporte/transporte";

export const useBuscarTransporte = (transporteId: string) => {
  const { data: transporte, isLoading } = useBuscarInfoTransportePorTransportId(transporteId, {
    query: {
      enabled: !!transporteId,
      queryKey: ['buscarTransporte', transporteId],
    }
  });
  return { transporte, isLoading };
}