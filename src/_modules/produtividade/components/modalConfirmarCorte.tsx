
import { Button } from "@/_shared/_components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Scissors, Package, AlertTriangle } from "lucide-react";
import { Separator } from "@/_shared/_components/ui/separator";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { Dispatch, SetStateAction } from "react";

type ModalConfirmarCorteProps = {
  transporteId: string;
  children: React.ReactNode;
  handleConfirmarCorte: (transporteId: string) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
} 

export default function ModalConfirmarCorte({ transporteId, children, open, setOpen, handleConfirmarCorte }: ModalConfirmarCorteProps) {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Scissors className="h-5 w-5 text-primary" />
            </div>
            <span>Confirmar Execução do Corte</span>
          </DialogTitle>
          <DialogDescription className="pt-2">
            Confirme a execução dos cortes para o transporte selecionado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações do Transporte */}
          <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Transporte:</span>
              <span className="text-sm font-semibold">{transporteId}</span>
            </div>
          </div>

          {/* Alerta de Confirmação */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Esta ação irá marcar todos os cortes deste transporte como realizados. 
              Esta ação não pode ser desfeita.
            </AlertDescription>
          </Alert>
        </div>

        <Separator />

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button className="gap-2" onClick={() => handleConfirmarCorte(transporteId)}>
            <Scissors className="h-4 w-4" />
            Confirmar Execução
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}