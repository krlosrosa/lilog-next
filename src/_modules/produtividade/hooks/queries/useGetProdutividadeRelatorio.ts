import { useUser } from '@/_shared/providers/UserContext';
import {
  useGetProdutividade as useGetProdutividadeService,
  useOverViewProdutividade,
} from '@/_services/api/service/gestao-produtividade/gestao-produtividade';
import { useProdutividadeFilter } from '../useProdutividadeFilter';
import { useSearchParams } from 'next/navigation';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columnsRelatorioProdutividade } from '../../components/relatorioProdutividade/tableRelatorioProdutividade/columnsRelatorioProdutividade';

export const useGetProdutividadeRelatorio = () => {
  const { filters, setFilter } = useProdutividadeFilter();
  const searchParams = useSearchParams(); // Hook do Next.js para LEITURA
  const { user } = useUser();

  const search = searchParams.get('search') || null;

  const { data: produtividade, isLoading: isBuscandoProdutividade } =
    useGetProdutividadeService(user?.centerSelect as string, {
      query: {
        enabled:
          !!user?.centerSelect && !!filters.dataInicio && !!filters.dataFim,
        queryKey: [
          'produtividade',
          `/api/gestao-produtividade/get-produtividade/${user?.centerSelect}`,
          filters,
          search,
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
          dataInicio: filters.dataInicio,
          dataFim: filters.dataFim,
        },
      },
    });
    

    const table = useReactTable({
      data: produtividade || [],
      columns: columnsRelatorioProdutividade,
      getCoreRowModel: getCoreRowModel(),
    });

  return {
    produtividade,
    isBuscandoProdutividade,
    filters,
    table,
  };
};
