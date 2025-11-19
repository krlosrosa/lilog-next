import { useUser } from '@/_shared/providers/UserContext';
import {
  useGetProdutividade as useGetProdutividadeService,
  useOverViewProdutividade,
} from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { useProdutividadeFilter } from '../useProdutividadeFilter';
import { useSearchParams } from 'next/navigation';

export const useGetProdutividade = () => {
  const { filters, setFilter } = useProdutividadeFilter();
  const searchParams = useSearchParams(); // Hook do Next.js para LEITURA
  const { user } = useUser();

  const search = searchParams.get('search') || null;

  const { data: produtividade, isLoading: isBuscandoProdutividade } =
    useGetProdutividadeService(user?.centerSelect as string, {
      query: {
        enabled:
          !!user?.centerSelect && !!filters.dataRegistro && !!filters.processo,
        queryKey: [
          'produtividade',
          `/api/gestao-produtividade/get-produtividade/${user?.centerSelect}/${filters.dataRegistro}/${filters.processo}`,
          search,
          filters,
        ],
      },
      request: {
        params: {
          dataRegistro: filters.dataRegistro,
          processo: filters.processo,
          search: search,
          segmento: filters.segmento,
          empresa: filters.empresa,
          status: filters.status,
        },
      },
    });

  const {
    data: overViewProdutividade,
    isLoading: isBuscandoOverViewProdutividade,
  } = useOverViewProdutividade(
    user?.centerSelect as string,
    filters.processo as string,
    filters.dataRegistro as string,
    {
      query: {
        enabled:
          !!user?.centerSelect && !!filters.dataRegistro && !!filters.processo,
        queryKey: [
          'produtividade',
          `/api/gestao-produtividade/over-view-produtividade/${user?.centerSelect}/${filters.processo}/${filters.dataRegistro}`,
        ],
      },
    },
  );

  return {
    produtividade,
    overViewProdutividade,
    isBuscandoProdutividade,
    isBuscandoOverViewProdutividade,
    filters,
  };
};
