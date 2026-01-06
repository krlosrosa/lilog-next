import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "@/_shared/_components/ui/input";

type ModalConfirmacaoProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  handleConfirm: () => void;
  tipo: 'DEVOLUCAO' | 'DEVOLUCAO_PARCIAL' | 'REENTREGA';
  nfParcial: string;
  setNfParcial: (nfParcial: string) => void;
}

export default function ModalConfirmacao({ open, setOpen, children, handleConfirm, tipo, nfParcial, setNfParcial }: ModalConfirmacaoProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Adição de Nota Fiscal</DialogTitle>
        </DialogHeader>
        {tipo === 'DEVOLUCAO_PARCIAL' && <Input
          type="text"
          value={nfParcial}
          onChange={(e) => setNfParcial(e.target.value)}
          placeholder="Número da Nota Fiscal Parcial"
        />
        }
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button disabled={tipo === 'DEVOLUCAO_PARCIAL' && nfParcial === ''} variant="default" onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  )
}