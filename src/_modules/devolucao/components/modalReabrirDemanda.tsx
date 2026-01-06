import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import useReabrirDemanda from "../hooks/useReabrirDemanda";

export default function ModalReabrirDemanda({ id }: { id: string }) {
  const { handleReabrirDemanda, isReabrindoDemanda, open, setOpen } = useReabrirDemanda();

  function handleReabrirDemandaModal() {
    handleReabrirDemanda(id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Reabrir Demanda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reabrir Demanda</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleReabrirDemandaModal}>Reabrir Demanda</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}