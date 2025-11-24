import { Card, CardContent } from "@/_shared/_components/ui/card";
import { AlertCircle } from "lucide-react";
import { ProdutoNaoEncontrado } from "../../others/types/uploadErro";
import { columnsErrorsExpedicao } from "./tableError/columsErrorProdutoNaoCadastado";
import { DataTableError } from "./tableError/data-table-error-expedicao";

export function ProdNaoEncontrado({ produto }: { produto: ProdutoNaoEncontrado[] }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Produtos Não Encontrados</h2>
      <DataTableError columns={columnsErrorsExpedicao} data={produto} />
    </div>
  );
}