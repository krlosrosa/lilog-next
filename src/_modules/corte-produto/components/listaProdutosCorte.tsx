'use client';

import { Loader2 } from "lucide-react";
import { useBuscarProdutosCorte } from "../hooks/userBuscarProdutosCort";
import { Input } from "@/_shared/_components/ui/input";
import { DataTableCorteProduto } from "./operacional/tableCortes/data-table-corte";
import { columnsCorte } from "./operacional/tableCortes/columnsCorte";
import { reduceForOperation } from "../utils/reduceForOperation";

export const ListaProdutosCorte = () => {
  const { produtosCorte, isBuscandoProdutosCorte, setTransporteId, transporteId, globalFilter, setGlobalFilter } = useBuscarProdutosCorte();
  const produtosCorteReduced = reduceForOperation(produtosCorte ?? []);
  return (
    <div>
      <div>
        <Input
          placeholder="Digite o ID do transporte"
          value={transporteId}
          onChange={(e) => setTransporteId(e.target.value)}
        />
        <Input
          placeholder="Digite o filtro"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div>
        {isBuscandoProdutosCorte ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <div>
            <DataTableCorteProduto columns={columnsCorte} data={produtosCorteReduced} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}/>
          </div>
        )}
      </div>
    </div>
  );
};