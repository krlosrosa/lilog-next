import { ReturnInfoGeralRavexNotasItemItensItem } from "@/_services/api/model";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import { Package, Hash, Weight, Box } from "lucide-react";

export default function ProdutoItem({ 
  produto, 
  index 
}: { 
  produto: ReturnInfoGeralRavexNotasItemItensItem;
  index?: number;
}) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 bg-secondary rounded-md">
              <Package className="h-4 w-4" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                {index && (
                  <Badge variant="secondary" className="text-xs">
                    #{index}
                  </Badge>
                )}
                <h4 className="font-semibold text-sm">{produto.descricao || "Produto sem descrição"}</h4>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  <span>SKU: {produto.sku}</span>
                </div>
                {produto.quantidadeRavex && (
                  <div className="flex items-center gap-1">
                    <Box className="h-3 w-3" />
                    <span>Qtd: {produto.quantidadeRavex}</span>
                  </div>
                )}
                {produto.pesoLiquido && (
                  <div className="flex items-center gap-1">
                    <Weight className="h-3 w-3" />
                    <span>Peso: {produto.pesoLiquido}kg</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="sm:text-right">
            {produto.quantidadeUnidades && (
              <div className="text-lg font-bold">
                {produto.quantidadeUnidades}
                <span className="text-xs font-normal text-muted-foreground ml-1">un</span>
              </div>
            )}
            {produto.sku && (
              <div className="text-xs text-muted-foreground">
                Cód: {produto.sku}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}