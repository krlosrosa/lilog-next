import { ColumnDef } from '@tanstack/react-table';
import { ImpressaoMapa, ImpressaoMapaItem } from '../../others/types/items';
import { HeaderCarregamento } from '../headersMaps/headerCarregamento';
import { DataTableMapa } from '../tableMapas/data-table-mapa';
import { HeaderSeparacao } from '../headersMaps/headerSeparacao';

type MapaSeparacaoProps = {
  mapa: ImpressaoMapa;
  columnsExibir: string[];
  columns: ColumnDef<ImpressaoMapaItem, any>[];
  exibirCliente: 'PRIMEIRO' | 'TODOS' | 'NENHUM';
  tipo: 'CLIENTE' | 'TRANSPORTE';
};

export function MapaSeparacao({
  mapa,
  columnsExibir,
  columns,
  exibirCliente,
  tipo,
}: MapaSeparacaoProps) {
  const { itens, ...rest } = mapa;
  return (
    <div>
      <HeaderSeparacao mapa={rest} exibirCliente={exibirCliente} tipo={tipo} />
      <DataTableMapa
        transporteId={mapa.transportId}
        columnsExibir={columnsExibir}
        columns={columns}
        data={itens}
      />
    </div>
  );
}
