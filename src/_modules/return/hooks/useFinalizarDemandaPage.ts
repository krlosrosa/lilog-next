import { useParams } from "next/navigation";
import useDemandaPorIdQuery from "@/_modules/devolucao/hooks/queries/demandaPorId";
import useGetResultadoConferenciaQuery from "@/_modules/devolucao/hooks/queries/getResultadoConferencia";

export function useFinalizarDemandaPage() {
  const { id } = useParams();
  const demandaId = id as string;

  // Buscar demanda
  const { data: demanda, isLoading: isLoadingDemanda } = useDemandaPorIdQuery(demandaId);

  // Buscar resultado da conferência
  const { data: resultadoConferencia, isLoading: isLoadingResultado } = useGetResultadoConferenciaQuery(demandaId);

  // Determinar status da conferência baseado na demanda
  const getStatusConferencia = () => {
    if (!demanda) return 'Não Iniciado';
    
    const status = demanda.status;
    
    // Se for FINALIZADO ou CONFERENCIA_FINALIZADA, mostrar como "Conferência Finalizada"
    if (status === 'FINALIZADO' || status === 'CONFERENCIA_FINALIZADA') {
      return 'Conferência Finalizada';
    }
    
    // Se estiver em conferência ou aguardando conferência, mostrar como "Em Andamento"
    if (status === 'EM_CONFERENCIA' || status === 'AGUARDANDO_CONFERENCIA') {
      return 'Em Andamento';
    }
    
    // Caso contrário, mostrar como "Não Iniciado"
    return 'Não Iniciado';
  };

  return {
    demandaId,
    demanda,
    isLoadingDemanda,
    resultadoConferencia,
    isLoadingResultado,
    statusConferencia: getStatusConferencia(),
  };
}
