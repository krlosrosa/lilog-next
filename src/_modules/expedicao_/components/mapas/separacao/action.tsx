import { Badge } from "@/_shared/_components/ui/badge";
import { Button } from "@/_shared/_components/ui/button";
import { FileText, Printer } from "lucide-react";

type HeaderSeparacaoProps = {
  gerarMapaSeparacaoService: () => void
  isLoading: boolean
  handlePrint: () => void
}

export function HeaderSeparacao({ gerarMapaSeparacaoService, isLoading, handlePrint }: HeaderSeparacaoProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">
          Mapa de Separação 
          <Badge variant="secondary" className="gap-1">
            <FileText className="h-4 w-4" />
            10 mapas gerados
          </Badge>
          </h2>
          
          <span className="text-sm text-muted-foreground">
            Gerar mapas de separação.
          </span>

        </div>
        <div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={gerarMapaSeparacaoService} disabled={isLoading}>
              <FileText className="h-4 w-4" />
              {isLoading ? 'Processando...' : 'Gerar Mapas'}
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              {isLoading ? 'Imprimindo...' : 'Imprimir e Cadastrar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}