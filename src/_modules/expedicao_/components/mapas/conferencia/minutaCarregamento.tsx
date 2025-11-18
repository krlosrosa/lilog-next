import { ImpressaoMapa } from "@/_modules/expedicao_/others/types/items";
import { TableMinuta } from "./tableMinuta";
import { MinutaHeader } from "./haderMinuta";

type MinutaCarregamentoProps = {
  mapa: ImpressaoMapa;
};

export function MinutaCarregamentoMapa({ mapa }: MinutaCarregamentoProps) {
  return (
    <div>
      <MinutaHeader mapa={mapa} />
      <TableMinuta itens={mapa.itens} />
    </div>
  );
}
