import { ProdutoNaoEncontrado } from "../../others/types/uploadErro";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { AlertCircle } from "lucide-react";

export function ProdNaoEncontrado({ produto }: { produto: ProdutoNaoEncontrado }) {
  return (
    <Card className="w-full border-destructive/20 bg-destructive/5 py-0">
      <CardContent className="flex items-center gap-2.5 px-3 py-2">
        <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {produto.descricao}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            ID: {produto.id}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}