import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Loader2 } from "lucide-react";

export function LoadingTransporte() {
  return (
    <div className="mx-auto space-y-4 p-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 py-8">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground text-sm">Carregando transportes...</p>
        </CardContent>
      </Card>
    </div>
  )
}