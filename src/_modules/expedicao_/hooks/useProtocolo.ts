import { gerarProtocoloMapa, ProtocoloMapa } from "@/_modules/expedicao/services/protocolo-mapa";
import { useCallback, useState } from "react";
import { useShipmentStore } from "../others/stores/shipment.store";

export function useProtocolo() {
  const [protocolos, setProtocolos] = useState<ProtocoloMapa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const validationSuccess = useShipmentStore(state => state.validationSuccess)

  const gerarProtocoloMapaService = useCallback(async () => {
    if (!validationSuccess) {
      console.error('Dados de validação ausentes');
      return;
    }
    setIsLoading(true);
    try {
      const protocolosGerados = await gerarProtocoloMapa(validationSuccess);
      setProtocolos(protocolosGerados);
    } catch (error) {
      console.error('Falha ao gerar protocolo:', error);
    } finally {
      setIsLoading(false);
    }
  }, [validationSuccess]);

  return {
    protocolos,
    isLoading,
    gerarProtocoloMapaService,
  }
}