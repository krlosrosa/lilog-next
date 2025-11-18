import { Badge } from "@/_shared/_components/ui/badge"
import { useTransporte } from "../../hooks/useTransporte"
import { TableTransporte } from "../transporte/tableTransporte"
import { CreateTransporteDtoOutput } from "@/_services/api/model"


type TransportesImpressosProps = {
  transportesImpressos: CreateTransporteDtoOutput[]
}

export default function TransportesImpressos({ transportesImpressos }: TransportesImpressosProps) {
  const { quantidadeTransportesImpressos } = useTransporte()
  return (
    <div>
      <Badge variant="outline">
        {quantidadeTransportesImpressos} transportes impressos
      </Badge>
      <TableTransporte
        transportes={transportesImpressos}
      />
    </div>
  )
}