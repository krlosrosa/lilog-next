import { HeaderSeparacao } from "./action";
import { useMapaSeparacao } from "@/_modules/expedicao_/hooks/useMapaSeparacao";
import { MapaSeparacao } from "./mapa-separacao";
import { columnsMapa } from "../tables/columns";
import { ConfiguracaoImpressao } from "@/_modules/expedicao_/others/types/configuracaoImpressa";
import { useRef } from "react";
import { usePrint } from "@/_modules/expedicao_/hooks/usePrint";
import { PageHeaderMapa } from "../header";
import ModalConfirmacaoInput from "../conferencia/modalConfirmacaoInput";

type SeparacaoProps = {
  configuracaoImpressao: ConfiguracaoImpressao | null;
  clientesSegregados: string[];
}

export function Separacao({ configuracaoImpressao, clientesSegregados }: SeparacaoProps) {
  const { gerarMapaSeparacaoService, isLoading, mapas, addPaleteInTransporte, isAddingPaleteInTransporte, open, setOpen, groupedPicking } = useMapaSeparacao()

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = usePrint({ printRef, handleBeforePrint: addPaleteInTransporte });

  if (!configuracaoImpressao) return null;

  const columnsMap: Record<string, string[]> = {
    picking: configuracaoImpressao?.ordemPicking ?? [],
    palete: configuracaoImpressao?.ordemPaletes ?? [],
    unidade: configuracaoImpressao?.ordemUnidades ?? [],
  };

  return (
    <div>
      <PageHeaderMapa
        enablePrint={mapas.length > 0}
        titleButton={isAddingPaleteInTransporte ? 'Salvando paletes no transporte...' : 'Gerar Mapas'}
        title="Mapa de Separação"
        description="Gerar mapas de separação."
        handle={gerarMapaSeparacaoService}
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
          const columnsExibir = columnsMap[mapa.tipo];
          if (!columnsExibir) return null;

          return (
            <div
              key={`${index}-${mapa.id}`}
              className="print-page-break border-b last:border-b-0"
            >
              <MapaSeparacao
                indice={index}
                tipo={configuracaoImpressao?.tipoImpressao || 'TRANSPORTE'}
                exibirCliente={configuracaoImpressao?.exibirInfoCabecalho || 'NENHUM'}
                mapa={mapa}
                columnsExibir={columnsExibir}
                columns={columnsMapa}
                segregados={clientesSegregados}
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}