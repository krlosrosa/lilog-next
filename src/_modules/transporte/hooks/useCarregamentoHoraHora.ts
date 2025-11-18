import { useBuscarHoraAHoraTransportes } from "@/_services/api/service/transporte/transporte";
import { useUser } from "@/_shared/providers/UserContext";
import { useState } from "react";
import { useTransporteFilter } from "./useTransporteFilter";

export default function useCarregamentoHoraHora() {
  const { user } = useUser()
  const { filters } = useTransporteFilter();
  const { data: carregamentoHoraHora, isLoading } = useBuscarHoraAHoraTransportes(filters.dataRegistro || new Date('2025-11-14').toISOString().split('T')[0], user?.centerSelect as string, {
    query: {
      enabled: !!filters.dataRegistro,
      refetchInterval: 1000 * 60, // 1 minuto
      queryKey: [
        'carregamentoHoraHora',
        'buscarHoraAHoraTransportes',
        filters.dataRegistro,
        user?.centerSelect,
      ],
    },
  });

  return { carregamentoHoraHora, isLoading };
}