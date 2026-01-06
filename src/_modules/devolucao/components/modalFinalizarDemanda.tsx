import useFinalizarDemanda from "../hooks/useFinalizarDemanda";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";

export default function ModalFinalizarDemanda({ id }: { id: string }) {
  const { handleFinalizarDemanda, isFinalizandoDemanda, open, setOpen } = useFinalizarDemanda();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Finalizar Demanda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalizar Demanda</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={() => handleFinalizarDemanda(id)}>Finalizar Demanda</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) 
}