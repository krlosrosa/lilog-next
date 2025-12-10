import { useCallback, useState } from "react";
import { ImpressaoMapa } from "../others/types/items";
import { gerarMapaSeparacao } from "@/_modules/expedicao/services/mapa-separacao";
import { useShipmentStore } from "../others/stores/shipment.store";
import { useConfiguracoesStore } from "../others/stores/configuracoes.store";
import { useAgrupamentoStore } from "../others/stores/agrupamento.store";
import { renumerarMapasPorTransporte } from "../others/utils/renumerarMapas";
import { useAddPaleteInTransporte } from "./mutatation/addPaleteInTransporte";
import { parseCadastrarPalete } from "../others/utils/parseCadastrarPalete";
import { EnrichedPickingMapItem } from "@/_modules/expedicao/others/types/items";


export function useMapaSeparacao() {
  const [mapas, setMapas] = useState<ImpressaoMapa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const { addPaleteInTransporteMutation, isPending: isAddingPaleteInTransporte } = useAddPaleteInTransporte()

  const validationSuccess = useShipmentStore(state => state.validationSuccess)
  const configuracaoImpressao = useConfiguracoesStore(state => state.configuracaoImpressao)
  const clientesSegregados = useAgrupamentoStore(state => state.clientesSegregados)
  const grupoClientes = useAgrupamentoStore(state => state.grupoClientes)
  const grupoTransportes = useAgrupamentoStore(state => state.grupoTransportes)
  const grupoRemessas = useAgrupamentoStore(state => state.grupoRemessas)
  const groupedPicking = useShipmentStore(state => state.groupedPicking)
  const setGroupedPicking = useShipmentStore(state => state.setGroupedPicking)

  const gerarMapaSeparacaoService = useCallback(async () => {
    if (!validationSuccess || !configuracaoImpressao) {
      return;
    }
    gerarMapaSeparacao(
      validationSuccess,
      configuracaoImpressao,
      clientesSegregados,
      grupoClientes,
      grupoTransportes,
      grupoRemessas,
    ).then(
      (mapas) => {
        const mapasRenumerados = renumerarMapasPorTransporte(mapas)
        setMapas(mapasRenumerados)
      }
    ).catch(console.error).finally(() => setIsLoading(false));
    setIsLoading(true);
  },[configuracaoImpressao])

  async function addPaleteInTransporte() {
    await addPaleteInTransporteMutation(parseCadastrarPalete(mapas))
    setOpen(false)
  }
  return {
    mapas,
    isLoading,
    addPaleteInTransporte,
    isAddingPaleteInTransporte,
    gerarMapaSeparacaoService,
    open,
    setOpen,
    groupedPicking,
  }
}