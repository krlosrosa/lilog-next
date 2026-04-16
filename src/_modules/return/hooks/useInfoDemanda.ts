import {
  useGetAvariasByIdDevolucao,
  useGetFotosCheckListDevolucao,
  useGetFotosFimProcessosDevolucao,
  useGetResultadoDemandaDevolucao,
} from "@/_services/api/service/devolucao/devolucao";
import { sanitizeMinioUrls } from "@/_shared/utils/sanitizeMinioUrl";
import { useCallback, useMemo, useState } from "react";

export default function useInfoDemanda() {
  const [demandaId, setDemandaId] = useState<string | null>(null);
  const effectiveId = demandaId?.trim() ?? "";
  const {
    data: infoDemanda,
    isLoading: isLoadingInfoDemanda,
    isError: isErrorInfoDemanda,
    error: errorInfoDemanda,
  } = useGetResultadoDemandaDevolucao(effectiveId);
  const { data: avarias, isLoading: isLoadingAvarias } =
    useGetAvariasByIdDevolucao(effectiveId);
  const { data: fotosCheckList, isLoading: isLoadingFotosCheckList } =
    useGetFotosCheckListDevolucao(effectiveId);
  const { data: fotosFimProcesso, isLoading: isLoadingFotosFimProcesso } =
    useGetFotosFimProcessosDevolucao(effectiveId);

  const fotosCheckListSanitized = useMemo(
    () => (fotosCheckList?.length ? sanitizeMinioUrls(fotosCheckList) : fotosCheckList),
    [fotosCheckList],
  );
  const fotosFimProcessoSanitized = useMemo(
    () =>
      fotosFimProcesso?.length ? sanitizeMinioUrls(fotosFimProcesso) : fotosFimProcesso,
    [fotosFimProcesso],
  );

  const setDemandaIdSafe = useCallback((value: string | null) => {
    setDemandaId(value?.trim() || null);
  }, []);

  return {
    demandaId: demandaId ?? "",
    setDemandaId: setDemandaIdSafe,
    infoDemanda,
    avarias,
    fotosCheckList: fotosCheckListSanitized,
    fotosFimProcesso: fotosFimProcessoSanitized,
    isLoadingInfoDemanda,
    isLoadingFotosCheckList,
    isLoadingFotosFimProcesso,
    isLoadingAvarias,
    isErrorInfoDemanda,
    errorInfoDemanda,
    hasSearched: effectiveId.length > 0,
  };
}