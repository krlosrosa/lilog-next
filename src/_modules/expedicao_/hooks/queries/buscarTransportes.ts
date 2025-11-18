import { ResultTransporteDtoOutput } from "@/_services/api/model";
import { useBuscarTodosTransportes } from "@/_services/api/service/transporte/transporte"
import { useEffect, useState } from "react";

export function useBuscarTransportes(transportesIds: string[]) {

  const [transportes, setTransportes] = useState<ResultTransporteDtoOutput[]>([])
  const { mutateAsync: buscarTransportes, isPending } = useBuscarTodosTransportes({
    mutation: {
      mutationKey: ['buscarTransportes'],
    }
  })

  async function buscarTransportesAsync() {
    const response = await buscarTransportes({
      data: {
        transportes: transportesIds
      }
    })
    setTransportes(response)
  }

  useEffect(() => {
    if (transportesIds.length > 0) {
      buscarTransportesAsync()
    }
  }, [transportesIds])

  return { transportes, isPending, buscarTransportesAsync }
}