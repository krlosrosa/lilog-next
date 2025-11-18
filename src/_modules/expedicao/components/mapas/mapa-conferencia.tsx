import { ColumnDef } from '@tanstack/react-table';
import { ImpressaoMapa, ImpressaoMapaItem } from '../../others/types/items';
import { HeaderCarregamento } from '../headersMaps/headerCarregamento';
import { DataTableMapa } from '../tableMapas/data-table-mapa';

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
  return (
    <div>
      <HeaderCarregamento mapa={mapa} />
      <DataTableMapa
        transporteId={mapa.transportId}
        columnsExibir={columnsExibir}
        columns={columns}
        data={mapa.itens}
      />
    </div>
  );
}
