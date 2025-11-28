import { useState } from "react";
import { useBuscarAnomaliasEngineQuery } from "../queries/buscarAnomaliasEngine";
import { useAddAnomaliaEngine } from "../queries/useAddAnomaliaEngine";
import { useEngineAnomaliaStore } from "../stores/engineAnomalia.store";
import { convertQueryBuilderToJsonRulesEngine } from "@/_modules/center/utils/convert";
import { useUser } from "@/_shared/providers/UserContext";

export const useBuscarAnomaliaEngine = () => {
  const { user } = useUser();
  const { event, query, processo, fields } = useEngineAnomaliaStore()
  const { regras, isBuscandoRegras } = useBuscarAnomaliasEngineQuery();
  const { handleAddAnomaliaEngine, isAddingAnomaliaEngine } = useAddAnomaliaEngine();

  function handleSave() {
    if (!event.type || !query.rules.length || !fields) {
      return;
    }
    const convertedRule = convertQueryBuilderToJsonRulesEngine(query, event);
    const formData = {
      centerId: user?.centerSelect as string,
      name: processo.nomeRegra,
      description: processo.descricao,
      conditions: convertedRule,
      processo: processo.processo,
    };
    handleAddAnomaliaEngine(formData);
  }

  return {
    regras,
    isBuscandoRegras,
    processo,
    handleAddAnomaliaEngine,
    isAddingAnomaliaEngine,
    handleSave
  };
}