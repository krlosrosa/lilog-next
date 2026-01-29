import { useParams } from "next/navigation";
import useDemandaPorIdQuery from "@/_modules/devolucao/hooks/queries/demandaPorId";
import useGetNfCadastradas from "@/_modules/devolucao/hooks/queries/getNfCadastradas";
import { useGetInfoViagemRavex } from "@/_modules/devolucao/hooks/queries/getInfoViagemRavex";
import { useMemo } from "react";

export function useDemandaReturn() {
  const { id } = useParams();
  const demandaId = id as string;

  // Buscar demanda
  const { data: demanda, isLoading: isLoadingDemanda } = useDemandaPorIdQuery(demandaId);

  // Buscar notas fiscais cadastradas
  const { data: notasCadastradas, isLoading: isLoadingNotas } = useGetNfCadastradas(demandaId);

  // Buscar informações da viagem se viagemId existir
  const viagemId = demanda?.viagemId;
  const { data: infoViagem, isLoading: isLoadingViagem } = useGetInfoViagemRavex(viagemId || '');

  // Estatísticas das notas fiscais
  const statsNotas = useMemo(() => {
    if (!notasCadastradas) return { total: 0, porTipo: {} };
    
    const porTipo = notasCadastradas.reduce((acc, nota) => {
      acc[nota.tipo] = (acc[nota.tipo] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: notasCadastradas.length,
      porTipo,
    };
  }, [notasCadastradas]);

  return {
    demandaId,
    demanda,
    isLoadingDemanda,
    notasCadastradas,
    isLoadingNotas,
    infoViagem,
    isLoadingViagem,
    viagemId,
    statsNotas,
  };
}
