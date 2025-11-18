import { useBuscarTransportePorNumeroTransporte } from "@/_services/api/service/transporte/transporte";
import { useState } from "react";

export default function useBuscarInfoPorTransporte(transporteId: string) {
  const { data: transporte, isLoading } = useBuscarTransportePorNumeroTransporte(transporteId, {
    query: {
      enabled: !!transporteId,
    }
  });
  return { transporte, isLoading};
}