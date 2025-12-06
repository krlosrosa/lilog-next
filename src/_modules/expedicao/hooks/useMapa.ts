import { useRef, useState, useCallback } from 'react';
import { ImpressaoMapa } from '../others/types/items';
import { useUser } from '@/_shared/providers/UserContext';
import { gerarMapaSeparacao } from '../services/mapa-separacao';
import { usePrint } from './print';
import { useShipments } from '../others/providers/shipments.provider';
import { gerarMapaConferencia } from '../services/mapa-conferencia';
import { gerarMinutaConferencia } from '../services/minuta-conferencia';
import { gerarProtocoloMapa, ProtocoloMapa } from '../services/protocolo-mapa';

export function useMapa() {
  const [mapasCombinados, setMapasCombinados] = useState<ImpressaoMapa[]>([]);
  const [protocolos, setProtocolos] = useState<ProtocoloMapa[]>([]);
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProtocolo, setIsLoadingProtocolo] = useState(false);
  const {
    validationSuccess,
    configuracaoImpressa,
    grupoClientes,
    grupoRemessas,
    grupoTransportes,
    clientesSegregados,
  } = useShipments();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = usePrint({ printRef, user });

  const handleBeforePrint = (callback?: () => Promise<void>) => {
    return usePrint({ printRef, user, handleBeforePrint: callback });
  };

  const gerarProtocoloMapaService = useCallback(async () => {
    if (!validationSuccess) {
      console.error('Dados de validação ausentes');
      return;
    }
    setIsLoadingProtocolo(true);
    try {
      const protocolosGerados = await gerarProtocoloMapa(validationSuccess);
      setProtocolos(protocolosGerados);
    } catch (error) {
      console.error('Falha ao gerar protocolo:', error);
    } finally {
      setIsLoadingProtocolo(false);
    }
  }, [validationSuccess]);

  const gerarMapas = useCallback(async (tipo: 'separacao' | 'conferencia') => {
    if (!validationSuccess || !configuracaoImpressa) {
      console.error('Dados de validação ou configuração ausentes');
      return;
    }

    setIsLoading(true);

    try {
      let mapasGerados = [];

      switch (tipo) {
        case 'separacao':
          mapasGerados = await Promise.all([
            gerarMapaSeparacao(
              validationSuccess,
              configuracaoImpressa,
              clientesSegregados,
              grupoClientes,
              grupoTransportes,
              grupoRemessas,
            ),
          ]);
          break;

        case 'conferencia':
          mapasGerados = await Promise.all([
            gerarMapaConferencia(validationSuccess, configuracaoImpressa),
            gerarMinutaConferencia(validationSuccess, configuracaoImpressa),
          ]);
          break;

        default:
          console.error('Tipo de mapa inválido:', tipo);
          setIsLoading(false);
          return;
      }

      // "mapasGerados" é um array de resultados, mas cada item pode ser um array — vamos achatar.
      const todosOsMapas = mapasGerados.flat();

      // Ordenar os mapas conforme sua lógica
      // Se for conferencia, a ordem é invertida
      const multiplicador = tipo === 'conferencia' ? -1 : 1;
      
      todosOsMapas.sort((a, b) => {
        let resultado = 0;

        if (a.transportId < b.transportId) resultado = -1;
        else if (a.transportId > b.transportId) resultado = 1;
        else if (a.processo < b.processo) resultado = -1;
        else if (a.processo > b.processo) resultado = 1;
        else if (a.id < b.id) resultado = -1;
        else if (a.id > b.id) resultado = 1;

        return resultado * multiplicador;
      });

      // Atualiza o estado
      setMapasCombinados(todosOsMapas);
    } catch (error) {
      console.error('Falha ao gerar mapas:', error);
    } finally {
      setIsLoading(false);
    }
  }, [validationSuccess, configuracaoImpressa, clientesSegregados, grupoClientes, grupoTransportes, grupoRemessas]);

  return {
    mapasCombinados,
    isLoading,
    handlePrint,
    gerarMapas,
    printRef,
    handleBeforePrint,
    gerarProtocoloMapaService,
    protocolos,
    isLoadingProtocolo,
  };
}
