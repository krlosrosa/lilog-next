import { useState } from "react";
import useBuscarDemandaQuery from "./queries/usebuscarDemanda";
import { useUser } from "@/_shared/providers/UserContext";
import useExcluirDemanda from "./mutation/demanda/excluirDemanda";

export default function useDemanda() {
  const { user } = useUser();
  const [id, setId] = useState<string>('');
  const { demanda, isBuscandoDemanda } = useBuscarDemandaQuery(id);
  const { handleExcluirDemanda: handleExcluirDemandaMutation, isExcluindoDemanda } = useExcluirDemanda();

  function handleExcluirDemanda(id: string) {
    handleExcluirDemandaMutation(id as string);
  }

  return {
    id,
    setId,
    demanda,
    isBuscandoDemanda,
    isExcluindoDemanda,
    handleExcluirDemanda,
    centerId: user?.centerSelect as string,
  }
}