import { useUser } from "@/_shared/providers/UserContext"
import { buildTransportes } from "../others/services/buildTransporte"
import { useShipmentStore } from "../others/stores/shipment.store"
import { useBuscarTransportes } from "./queries/buscarTransportes"
import { useEffect, useState } from "react"
import { useAddTransportes } from "./mutatation/addTransportes"
import useAddIntesTransporte from "./mutatation/addIntesTransporte"
import { gerarItensTransporteCorte } from "@/_modules/expedicao/services/itens-transporte-corte"
import { ValidationSuccess } from "../others/services/validation/validateInputs"

export function useTransporte() {
  const { user } = useUser()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState(false)
  const { addTransportesMutation, isPending: isAddingTransportes } = useAddTransportes()
  const { addIntesTransporteMutation, isPending: isAddingIntesTransporte } = useAddIntesTransporte()
  const validationSuccess = useShipmentStore((state) => state.validationSuccess)
  const transportesIds = validationSuccess?.data.transportesUnicos || []
  const { transportes, isPending, buscarTransportesAsync } = useBuscarTransportes(transportesIds)

  const temFaltantes = transportesIds.length != transportes?.length
  const qtdTransportes = transportes?.length || 0
  const qtdTransportesIds = transportesIds.length || 0

  const nomesSet = new Set(transportes?.map((o) => o.numeroTransporte));
  const transportesFaltantes = transportesIds.filter((t) => !nomesSet.has(t));

  const quantidadeTransportesImpressos = transportes?.filter((t) => t.qtdImpressoes && t.qtdImpressoes > 0).length || 0
  const transportesImpressos = transportes?.filter((t) => t.qtdImpressoes && t.qtdImpressoes > 0) || []

  async function addTransportes() {
    if (!selectedDate) return;''
    const arrayInput = buildTransportes({
      transportesFaltantes,
      validationSuccess,
      selectedDate: selectedDate,
      user: user?.centerSelect || '',
    })
    setOpen(false)
    setSelectedDate(undefined)
    addTransportesMutation(arrayInput)
    const itensReduzidos = await gerarItensTransporteCorte(
      validationSuccess as ValidationSuccess,
      transportesFaltantes,
    );
    addIntesTransporteMutation(itensReduzidos)
  }

  return { 
    addTransportes, 
    isAddingTransportes, 
    transportes, 
    isPending, 
    temFaltantes, 
    qtdTransportes,
    qtdTransportesIds, 
    transportesFaltantes, 
    selectedDate, 
    setSelectedDate, 
    open, 
    setOpen, 
    quantidadeTransportesImpressos,
    transportesImpressos ,
    buscarTransportesAsync
  }
}
