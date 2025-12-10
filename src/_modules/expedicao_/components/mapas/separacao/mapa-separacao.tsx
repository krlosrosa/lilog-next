import { ImpressaoMapa, ImpressaoMapaItem } from '@/_modules/expedicao_/others/types/items';
import { ColumnDef } from '@tanstack/react-table';
import { HeaderSeparacaoMapa } from './headerSeparacao';
import { DataTableMapa } from '../tables/data-table-mapa';
import { useConfiguracoesStore } from '@/_modules/expedicao_/others/stores/configuracoes.store';

type MapaSeparacaoProps = {
  mapa: ImpressaoMapa;
  columnsExibir: string[];
  columns: ColumnDef<ImpressaoMapaItem, any>[];
  exibirCliente: 'PRIMEIRO' | 'TODOS' | 'NENHUM';
  tipo: 'CLIENTE' | 'TRANSPORTE';
  segregados?: string[];
  indice?: number;
};

export function MapaSeparacao({
  mapa,
  columnsExibir,
  columns,
  exibirCliente,
  tipo,
  segregados,
  indice,
}: MapaSeparacaoProps) {
  const { itens, ...rest } = mapa;
  const { configuracaoImpressao} = useConfiguracoesStore()
  return (
    <div>
      <HeaderSeparacaoMapa indice={indice} mapa={rest} exibirCliente={exibirCliente} tipo={tipo} segregados={segregados} />
      <DataTableMapa
        transporteId={`${mapa.transportId} | qtd mapas: ${rest.sequencia}/${rest.sequenciaTransporte}`}
        columnsExibir={columnsExibir}
        columns={columns}
        data={itens}
      />
    </div>
  );
}
