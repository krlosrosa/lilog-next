import { useCallback, useState } from "react";
import { ImpressaoMapa } from "../others/types/items";
import { useShipmentStore } from "../others/stores/shipment.store";
import { useConfiguracoesStore } from "../others/stores/configuracoes.store";
import { renumerarMapasPorTransporte } from "../others/utils/renumerarMapas";
import { gerarMapaConferencia } from "@/_modules/expedicao/services/mapa-conferencia";
import { gerarMinutaConferencia } from "@/_modules/expedicao/services/minuta-conferencia";
import { useAddPaleteInTransporte } from "./mutatation/addPaleteInTransporte";
import { parseCadastrarPalete } from "../others/utils/parseCadastrarPalete";
import { useAgrupamentoStore } from "../others/stores/agrupamento.store";


export function useMapaConferencia() {
  const [mapas, setMapas] = useState<ImpressaoMapa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const validationSuccess = useShipmentStore(state => state.validationSuccess)
  const configuracaoImpressao = useConfiguracoesStore(state => state.configuracaoImpressao)
  const replicar = useConfiguracoesStore(state => state.replicar)
  const clientesSegregados = useAgrupamentoStore(state => state.clientesSegregados)
  const grupoClientes = useAgrupamentoStore(state => state.grupoClientes)
  const grupoTransportes = useAgrupamentoStore(state => state.grupoTransportes)
  const grupoRemessas = useAgrupamentoStore(state => state.grupoRemessas)
  const setClassificarProduto = useConfiguracoesStore(state => state.setClassificarProduto)
  const classificarProduto = useConfiguracoesStore(state => state.classificarProduto)

  const { addPaleteInTransporteMutation, isPending: isAddingPaleteInTransporte } = useAddPaleteInTransporte()


  const gerarMapaConferenciaService = useCallback(async () => {
    if (!validationSuccess || !configuracaoImpressao) {
      return;
    }
    setIsLoading(true);
    const mapasGerados = await Promise.all([
      gerarMapaConferencia(
        validationSuccess, 
        configuracaoImpressao,
        clientesSegregados,
        grupoClientes,
        grupoTransportes,
        grupoRemessas,
        replicar,
        classificarProduto,
      ),
      gerarMinutaConferencia(validationSuccess, configuracaoImpressao),
    ]);
    const mapasRenumerados = renumerarMapasPorTransporte(mapasGerados.flat())
    setMapas(mapasRenumerados)

    setIsLoading(false);
  },[configuracaoImpressao, classificarProduto])


  async function addPaleteInTransporte() {
    await addPaleteInTransporteMutation(parseCadastrarPalete(mapas))
    setOpen(false)
  }
  return {
    mapas,
    isLoading,
    addPaleteInTransporte,
    isAddingPaleteInTransporte,
    gerarMapaConferenciaService,
    open,
    setOpen,
    setClassificarProduto,
  }
}