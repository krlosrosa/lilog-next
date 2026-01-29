import useListarDemandasquery from "@/_modules/devolucao/hooks/queries/listarDemandas";
import { useUser } from "@/_shared/providers/UserContext";
import { useState } from "react";
import { format } from "date-fns";

export function useOverViewDevolucao() {
  const { user } = useUser();
  // Inicializar com a data de hoje no formato YYYY-MM-DD
  const [dataRef, setDataRef] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [demandaId, setDemandaId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const { data: demandas, isLoading: isLoadingDemandas } = useListarDemandasquery(
    user?.centerSelect as string, 
    dataRef
  );

  return {
    dataRef,
    setDataRef,
    demandaId,
    setDemandaId,
    demandas,
    isLoadingDemandas,
    searchQuery,
    setSearchQuery,
  }
}