'use client';

import { Loader2 } from "lucide-react";
import { useBuscarProdutosCorte } from "../../hooks/userBuscarProdutosCort";
import { Input } from "@/_shared/_components/ui/input";
import { DataTableCorteProduto } from "./tableCortes/data-table-corte";
import { columnsCorte } from "./tableCortes/columnsCorte";
import { reduceForOperation } from "../../utils/reduceForOperation";
import { Label } from "@/_shared/_components/ui/label";
import { AugmentedZodDto } from "@/_services/api/model";

type ListaProdutosCorteOperacionalProps = {
  produtosCorte: AugmentedZodDto[];
  isBuscandoProdutosCorte: boolean;
  setTransporteId: (transporteId: string) => void;
  transporteId: string;
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
}

export const ListaProdutosCorteOperacional = ({ produtosCorte, isBuscandoProdutosCorte, setTransporteId, transporteId, globalFilter, setGlobalFilter }: ListaProdutosCorteOperacionalProps) => {

  const produtosCorteReduced = reduceForOperation(produtosCorte ?? []);
  return (
    <div>
      <div className="space-y-4 rounded-lg border bg-background p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="transporte" className="text-sm font-medium">
              ID do Transporte
            </Label>
            <Input
              id="transporte"
              placeholder="Digite o ID do transporte"
              value={transporteId}
              onChange={(e) => setTransporteId(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transporte" className="text-sm font-medium">
              Produto (SKU)
            </Label>
            <Input
              id="transporte"
              placeholder="Digite o SKU do produto"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9"
            />
          </div>
        </div>
      </div>
      <div>
        {isBuscandoProdutosCorte ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <div>
            <DataTableCorteProduto columns={columnsCorte} data={produtosCorteReduced} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          </div>
        )}
      </div>
    </div>
  );
};