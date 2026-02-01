import { useParams } from "next/navigation";
import { useGetAvariasByIdDevolucao } from "@/_services/api/service/devolucao/devolucao";

export function useCheckListRecuperacao() {
  const { id } = useParams();
  const demandaId = id as string;
  
  const { data, isLoading, error } = useGetAvariasByIdDevolucao(demandaId);
  
  return { 
    demandaId,
    avarias: data,
    isLoading, 
    error 
  };
}