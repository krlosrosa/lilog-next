import { BuscarTodosTransportesParams } from '@/_services/api/model';
import { useBuscarConfiguracaoPorCentro } from '@/_services/api/service/center/center';
import { useAdicionarPaletesAoTransporte } from '@/_services/api/service/transporte/transporte';
import {
  buscarTodosTransportes,
  useAdicionarItensAoTransporte,
  useCriarTransporteEmMassa,
} from '@/_services/api/service/transporte/transporte';
import { queryClient } from '@/_shared/providers/query/queryClient';
import { useQuery } from '@tanstack/react-query';

export const useTransporteOperations = () => {
  const { mutate: adicionarTransportes, isPending: isAdding } =
    useCriarTransporteEmMassa({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['buscarTodosTransportes'],
          });
        },
      },
    });

  const {
    mutate: adicionarItensAoTransporte,
    isPending: isAddingItensAoTransporte,
  } = useAdicionarItensAoTransporte();

  const { mutate: adicionarPaletes, isPending: isAddingPaletes } =
    useAdicionarPaletesAoTransporte();

  const useBuscarTodosTransportesQuery = (
    transporteIds: string[],
    params?: BuscarTodosTransportesParams,
    options?: {
      enabled?: boolean;
    },
  ) => {
    return useQuery({
      queryKey: ['buscarTodosTransportes', transporteIds, params],
      queryFn: () =>
        buscarTodosTransportes(
          {
            transportes: transporteIds,
          },
          {
            ...params,
          },
        ),
      enabled: options?.enabled ?? transporteIds.length > 0,
    });
  };

  const useBuscarConfiguracaoImpressao = (
    centerId: string,
    empresa: string,
  ) => {
    return useBuscarConfiguracaoPorCentro(centerId, empresa, {
      query: { enabled: !!centerId && !!empresa },
    });
  };

  const operations = {
    buscarTodosTransportesData: useBuscarTodosTransportesQuery,
    adicionarTransportes,
    useBuscarConfiguracaoImpressao,
    adicionarPaletes,
    adicionarItensAoTransporte,
  };

  return {
    operations,
    isAdding,
    isAddingPaletes,
    isAddingItensAoTransporte,
  };
};
