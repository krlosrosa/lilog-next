import useListarDemandasquery from "@/_modules/devolucao/hooks/queries/listarDemandas";
import { useUser } from "@/_shared/providers/UserContext";
import { useMemo, useState } from "react";
import { format } from "date-fns";

export function useOverViewDevolucao() {
  const { user } = useUser();
  const [dataRef, setDataRef] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [demandaId, setDemandaId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data: demandas, isLoading: isLoadingDemandas } = useListarDemandasquery(
    user?.centerSelect as string,
    dataRef
  );

  const demandasFilteredByStatus = useMemo(() => {
    const data = demandas ?? [];
    if (!statusFilter) return data;
    return data.filter((d) => d.status === statusFilter);
  }, [demandas, statusFilter]);

  return {
    dataRef,
    setDataRef,
    demandaId,
    setDemandaId,
    demandas: demandasFilteredByStatus,
    isLoadingDemandas,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  };
}