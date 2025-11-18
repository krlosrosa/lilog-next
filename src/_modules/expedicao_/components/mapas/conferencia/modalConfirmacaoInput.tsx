import { Badge } from "@/_shared/_components/ui/badge";
import { Button } from "@/_shared/_components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_shared/_components/ui/dialog";
import { AlertTriangle, FileText, Package, Printer, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { Card, CardContent } from "@/_shared/_components/ui/card";

type ModalConfirmacaoInputProps = {
  totalMapas: number;
  handlePrint: () => void;
  isLoading: boolean;
  titleButton: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ModalConfirmacaoInput({ totalMapas, handlePrint, isLoading, titleButton, open, setOpen }: ModalConfirmacaoInputProps) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-2"
          variant="outline"
          size="sm"
        >
          <Printer className="h-4 w-4" />
          { isLoading ? 'Processando...' : titleButton}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5 text-primary" />
            Confirmar Impressão e Cadastro
          </DialogTitle>
          <DialogDescription className="text-sm">
            Esta ação irá imprimir os mapas e cadastrar os paletes no sistema para controle de produtividade.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {/* Alerta importante */}
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive text-xs">
              <strong>Atenção:</strong> Se já existirem paletes cadastrados para estes transportes,
              eles serão <strong>removidos e substituídos</strong> pelos novos.
            </AlertDescription>
          </Alert>

          {/* Resumo dos mapas */}
          <Card className="p-2">
            <CardContent className="px-4 py-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total de Mapas:</span>
                  <Badge variant="secondary" className="gap-1">
                    <FileText className="h-3 w-3" />
                    {totalMapas}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do processo */}
          <div className="rounded-lg bg-muted/50 p-3">
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1">
              <Package className="h-3 w-3" />
              O que será feito:
            </h4>
            <ul className="text-muted-foreground text-xs space-y-1">
              <li className="flex items-start gap-2">
                <div className="bg-primary/10 rounded-full p-0.5 mt-0.5">
                  <div className="h-1 w-1 bg-primary rounded-full" />
                </div>
                <span>Impressão de {totalMapas} mapa(s) de separação</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-primary/10 rounded-full p-0.5 mt-0.5">
                  <div className="h-1 w-1 bg-primary rounded-full" />
                </div>
                <span>Cadastro dos paletes para controle de produtividade</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-destructive/10 rounded-full p-0.5 mt-0.5">
                  <div className="h-1 w-1 bg-destructive rounded-full" />
                </div>
                <span>Substituição de paletes existentes (se houver)</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="sm:flex-1"
          >
            Cancelar
          </Button>
          <Button
            disabled={totalMapas === 0 || isLoading}
            onClick={handlePrint}
            className="sm:flex-1 gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Printer className="h-4 w-4" />
                Imprimir e Cadastrar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}