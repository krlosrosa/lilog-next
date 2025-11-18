'use client'; // Hooks de cliente precisam desta diretiva no App Router

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';

// Valores padrão dos seus filtros
const DEFAULT_FILTERS = {
  dataRegistro: '',
  processo: '',
  status: '',
  empresa: '',
  segmento: '',
  dataInicio: '',
  dataFim: '',
};

export function useProdutividadeFilter() {
  const router = useRouter();
  const pathname = usePathname(); // Ex: /users
  const searchParams = useSearchParams(); // Hook do Next.js para LEITURA

  // 1. LEITURA: Exatamente igual antes, mas usa o searchParams do Next.
  const filters = useMemo(() => {
    return {
      dataRegistro:
        searchParams.get('dataRegistro') || DEFAULT_FILTERS.dataRegistro,
      processo: searchParams.get('processo') || DEFAULT_FILTERS.processo,
      status: searchParams.get('status') || DEFAULT_FILTERS.status,
      empresa: searchParams.get('empresa') || DEFAULT_FILTERS.empresa,
      segmento: searchParams.get('segmento') || DEFAULT_FILTERS.segmento,
      dataInicio: searchParams.get('dataInicio') || DEFAULT_FILTERS.dataInicio,
      dataFim: searchParams.get('dataFim') || DEFAULT_FILTERS.dataFim,
    };
  }, [searchParams]);

  const setFilter = useCallback(
    (key: string, value: string | null | undefined) => {
      const newParams = new URLSearchParams(Array.from(searchParams.entries()));

      if (
        value === null ||
        value === undefined ||
        String(value).trim() === ''
      ) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
      const queryString = newParams.toString();
      const newUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;

      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setFilters = useCallback(
    // Aceita um objeto de filtros a serem atualizados
    (filtersToSet: Record<string, string | number | null>) => {
      // Começa com os parâmetros atuais
      const newParams = new URLSearchParams(Array.from(searchParams.entries()));

      // Itera sobre os filtros e os define/deleta
      Object.entries(filtersToSet).forEach(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          String(value).trim() === ''
        ) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      // Regra de negócio: reseta a página se qualquer filtro (exceto 'page') for mudado
      const hasFilterOtherThanPage = Object.keys(filtersToSet).some(
        (k) => k !== 'page',
      );
      if (hasFilterOtherThanPage && newParams.has('page')) {
        newParams.set('page', '1');
      }

      // Constrói a URL e chama o router.replace UMA ÚNICA VEZ
      const queryString = newParams.toString();
      const newUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { filters, setFilter, setFilters };
}
