import { ColumnDef } from '@tanstack/react-table';
import { ImpressaoMapa, ImpressaoMapaItem } from '../../others/types/items';
import { HeaderCarregamento } from '../headersMaps/headerCarregamento';
import { DataTableMapa } from '../tableMapas/data-table-mapa';
import { MinutaHeader } from '../headersMaps/minutaHeader';
import { MinutaCarregamento } from '../tableMapas/minuta-carregamento';

type MinutaCarregamentoProps = {
  mapa: ImpressaoMapa;
};

export function MinutaCarregamentoMapa({ mapa }: MinutaCarregamentoProps) {
  return (
    <div>
      <MinutaHeader mapa={mapa} />
      <MinutaCarregamento itens={mapa.itens} />
    </div>
  );
}
