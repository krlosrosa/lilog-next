import { useState } from "react";
import { useGetInfoViagemRavex } from "./queries/getInfoViagemRavex";
import { useUser } from "@/_shared/providers/UserContext";
import useListarDemandasquery from "./queries/listarDemandas";
import useDemandaPorIdQuery from "./queries/demandaPorId";
import useGetNfByIdViagem from "./queries/getNfByIdViagem";
import useGetNfCadastradas from "./queries/getNfCadastradas";
import useGetResultadoConferenciaQuery from "./queries/getResultadoConferencia";
  
export function useDevolucao() {
  const { user } = useUser();
  const [notaFiscal, setNotaFiscal] = useState<string | null>(null);
  const [viagemId, setViagemId] = useState<string | null>(null);
  const [dataRef, setDataRef] = useState<string>('2026-01-07');
  const [demandaId, setDemandaId] = useState<string | null>(null);
  const { data, isLoading, error } = useGetInfoViagemRavex(viagemId ?? '');
  const { data: nf, isLoading: isLoadingNf } = useGetNfByIdViagem(notaFiscal ?? '', viagemId ?? '');
  const { data: demandas, isLoading: isLoadingDemandas } = useListarDemandasquery(user?.centerSelect as string, dataRef);
  const { data: demanda, isLoading: isLoadingDemanda } = useDemandaPorIdQuery(demandaId ?? '');
  const { data: nfCadastradas, isLoading: isLoadingNfCadastradas } = useGetNfCadastradas(demandaId ?? '');
  const { data: resultadoConferencia, isLoading: isLoadingResultadoConferencia } = useGetResultadoConferenciaQuery(demandaId ?? '');
  
  return { 
    data, 
    isLoading, 
    error, 
    viagemId, 
    setViagemId, 
    dataRef, 
    setDataRef, 
    demandas, 
    isLoadingDemandas, 
    demanda, 
    isLoadingDemanda, 
    demandaId, 
    setDemandaId,
    notaFiscal,
    setNotaFiscal,
    nf,
    isLoadingNf,
    nfCadastradas,
    isLoadingNfCadastradas,
    resultadoConferencia,
    isLoadingResultadoConferencia,
  };
}