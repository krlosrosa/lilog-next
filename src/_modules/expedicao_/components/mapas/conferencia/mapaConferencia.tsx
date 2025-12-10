import { ColumnDef } from '@tanstack/react-table';
import { HeaderCarregamento } from './headerCarregamento';
import { DataTableMapa } from '../tables/data-table-mapa';
import { ImpressaoMapa, ImpressaoMapaItem } from '@/_modules/expedicao_/others/types/items';

type MapaConferenciaProps = {
  mapa: ImpressaoMapa;
  columnsExibir: string[];
  columns: ColumnDef<ImpressaoMapaItem, any>[];
};

export function MapaConferencia({
  mapa,
  columnsExibir,
  columns,
}: MapaConferenciaProps) {
  const { itens, ...rest } = mapa;
  return (
    <div>
      <HeaderCarregamento mapa={rest} />
      <DataTableMapa
        transporteId={`${mapa.transportId} | qtd mapas: ${rest.sequencia}/${rest.sequenciaTransporte ? rest.sequenciaTransporte - 1 : 0}`}
        columnsExibir={columnsExibir}
        columns={columns}
        data={mapa.itens}
      />
    </div>
  );
}
