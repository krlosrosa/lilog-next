
import { ConfirmarCadastroTransporte } from "../components/transporte/confirmarCadastroTransporte";
import { LoadingTransporte } from "../components/transporte/loading";
import { TableTransporte } from "../components/transporte/tableTransporte";
import { TransportesNaoCadastrado } from "../components/transporte/transportesNaoCadastrado";
import { useTransporte } from "../hooks/useTransporte";
import { TitleTabs } from "../components/title";
import { Truck } from "lucide-react";

export function TransporteTab({ setValueTab }: { setValueTab: (value: string) => void }) {

  const {
    transportes,
    isPending,
    temFaltantes,
    transportesFaltantes,
    addTransportes,
    isAddingTransportes,
    selectedDate,
    setSelectedDate,
    open,
    setOpen,
    buscarTransportesAsync
  } = useTransporte()

  return (
    <div className="space-y-4">
      <TitleTabs
        title="Validar Transporte"
        description="Valide os transportes encontrados no sistema."
        icon={<Truck className="h-4 w-4" />}
        back={{ label: "Upload de Arquivos e Validação", onClick: () => setValueTab('upload') }}
        next={
          isPending? undefined : temFaltantes ?  { label: "Atualizar Transportes", onClick: () => buscarTransportesAsync() } : { label: "Configurações de Impressão", onClick: () => setValueTab('definicoes') }
        }
      />
      {isPending && <LoadingTransporte />}
      {!isPending && temFaltantes && (
        <div className="flex flex-col gap-4 mt-4">
          <ConfirmarCadastroTransporte
            open={open}
            setOpen={setOpen}
            isAdding={isAddingTransportes}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleAddTransportes={addTransportes}
          />
        </div>
      )}
      {!isPending && transportesFaltantes && transportesFaltantes?.length > 0 && (
        <TransportesNaoCadastrado transportesFaltantes={transportesFaltantes} />
      )}
      {!isPending && transportes && transportes?.length > 0 && (
        <TableTransporte transportes={transportes} />
      )}

    </div>
  )
}