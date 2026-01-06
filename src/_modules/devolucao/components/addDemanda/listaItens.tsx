import { ReturnInfoGeralRavexNotasItemItensItem } from "@/_services/api/model";
import ProdutoItem from "./produtoItem";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";  
import { Package, Box, Hash } from "lucide-react";

export default function ListaItens({ itens }: { itens: ReturnInfoGeralRavexNotasItemItensItem[] }) {
  if (itens.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-8 text-center">
          <Package className="h-10 w-10 text-muted-foreground mx-auto opacity-50" />
          <p className="text-muted-foreground mt-2">Nenhum item encontrado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Box className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Total de Itens: {itens.length}
          </span>
        </div>
        <Badge variant="outline" className="text-xs">
          <Hash className="h-3 w-3 mr-1" />
          SKU Únicos: {new Set(itens.map(item => item.sku)).size}
        </Badge>
      </div>
      
      <div className="grid gap-3">
        {itens.map((item, index) => (
          <ProdutoItem 
            key={item.sku + index} 
            produto={item}
          />
        ))}
      </div>
    </div>
  );
}