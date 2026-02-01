import { useGetAvariasByIdDevolucao, useGetFotosCheckListDevolucao, useGetResultadoDemandaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { useCallback, useState } from "react";

export default function useInfoDemanda() {
  const [demandaId, setDemandaId] = useState<string | null>(null);
  const effectiveId = demandaId?.trim() ?? "";
  const {
    data: infoDemanda,
    isLoading: isLoadingInfoDemanda,
    isError: isErrorInfoDemanda,
    error: errorInfoDemanda,
  } = useGetResultadoDemandaDevolucao(effectiveId);
  const {data: avarias, isLoading: isLoadingAvarias} = useGetAvariasByIdDevolucao(effectiveId);
  const { data: fotosCheckList, isLoading: isLoadingFotosCheckList } = useGetFotosCheckListDevolucao(effectiveId)
  const setDemandaIdSafe = useCallback((value: string | null) => {
    setDemandaId(value?.trim() || null);
  }, []);

  return {
    demandaId: demandaId ?? "",
    setDemandaId: setDemandaIdSafe,
    infoDemanda,
    avarias,
    fotosCheckList,
    isLoadingInfoDemanda,
    isLoadingFotosCheckList,
    isLoadingAvarias,
    isErrorInfoDemanda,
    errorInfoDemanda,
    hasSearched: effectiveId.length > 0,
  };
}