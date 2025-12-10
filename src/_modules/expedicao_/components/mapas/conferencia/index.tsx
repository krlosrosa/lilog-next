import { useMapaConferencia } from "@/_modules/expedicao_/hooks/useMapaConferencia";
import { Button } from "@/_shared/_components/ui/button";
import { FileText, Printer } from "lucide-react";
import { MapaConferencia } from "./mapaConferencia";
import { columnsMapa } from "../tables/columns";
import { useConfiguracoesStore } from "@/_modules/expedicao_/others/stores/configuracoes.store";
import { MinutaCarregamentoMapa } from "./minutaCarregamento";
import { useRef } from "react";
import { usePrint } from "@/_modules/expedicao_/hooks/usePrint";
import { PageHeaderMapa } from "../header";
import toast from "react-hot-toast";
import ModalConfirmacaoInput from "./modalConfirmacaoInput";


export default function MapasConferencia() {
  const { configuracaoImpressao } = useConfiguracoesStore();
  const { gerarMapaConferenciaService, isLoading, mapas, addPaleteInTransporte, isAddingPaleteInTransporte, open, setOpen } = useMapaConferencia();

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = usePrint({ printRef, handleBeforePrint: addPaleteInTransporte });

  return (
    <div>
      <div>
        <PageHeaderMapa
          enablePrint={mapas.length > 0}
          titleButton={isAddingPaleteInTransporte ? 'Salvando paletes no transporte...' : 'Gerar Mapas'}
          title="Mapa de Conferência"
          description="Gerar mapas de conferência."
          handle={gerarMapaConferenciaService}
          isLoading={isLoading}

          component={
            <ModalConfirmacaoInput
              open={open}
              setOpen={setOpen}
              titleButton={isLoading ? 'Processando...' : 'Imprimir e Cadastrar'}
              totalMapas={mapas.length}
              handlePrint={handlePrint}
              isLoading={isAddingPaleteInTransporte}
            />
        }
        />
        <div ref={printRef} className="print:mx-0">
          {mapas.map((mapa, index) => {
            const columnsExibir = configuracaoImpressao.ordemConferencia;
            if (!columnsExibir) return null;

            return (
              <div
                key={`${index}-${mapa.id}`}
                className="print-page-break border-b last:border-b-0"
              >
                {mapa.processo === 'CONFERENCIA' && (
                  <MapaConferencia
                    mapa={mapa}
                    columnsExibir={columnsExibir}
                    columns={columnsMapa}
                  />
                )}
                {mapa.processo === 'CARREGAMENTO' && (
                  <MinutaCarregamentoMapa mapa={mapa} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}