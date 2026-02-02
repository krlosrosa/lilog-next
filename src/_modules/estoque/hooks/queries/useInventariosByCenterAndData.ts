"use client";

import { useGetInventariosByCenterAndData } from "@/_services/api/service/estoque/estoque";

/**
 * Hook que abstrai a listagem de inventários por centro e data (Orval).
 */
export function useInventariosByCenterAndData(centerId: string | null, data: string) {
  return useGetInventariosByCenterAndData(centerId ?? "", data, {
    query: {
      enabled: !!centerId && !!data,
    },
  });
}
