
import AddProdutividade from '@/_modules/produtividade/components/addProdutividade/addProdutividade';
import CortesPendentesOperacional from '@/_modules/produtividade/components/listarCortesPendentesOperaiconal';
import DefinirDataEProcesso from '@/_modules/produtividade/components/definirDataEProcesso';
import FiltrosProdutividade from '@/_modules/produtividade/components/filtrosProdutividade';
import { FinalizarFormPalete } from '@/_modules/produtividade/components/finalizarFormPalete';
import ListaProdutividade from '@/_modules/produtividade/components/listaProdutividade';
import ListaSuspensaAcoes from '@/_modules/produtividade/components/listaSuspensaAcoes';
import { OverView } from '@/_modules/produtividade/components/overView';
import TituloProdutividade from '@/_modules/produtividade/components/tituloProdutividade';

export default function ProdutividadePage() {
  return (
    <div className="p-2">
      <div className="mb-4 flex items-end justify-between gap-4">
        <TituloProdutividade />
        <div className="flex shrink-0 items-end gap-3">
          <CortesPendentesOperacional/>
          <DefinirDataEProcesso />
          <FinalizarFormPalete />
          <ListaSuspensaAcoes />
        </div>
      </div>
      <FiltrosProdutividade />
      <OverView />
      <ListaProdutividade />
      <AddProdutividade />
    </div>
  );
}
