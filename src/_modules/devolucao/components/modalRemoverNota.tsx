import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { useState } from "react";
import useRemoveNf from "../hooks/useRemoveNf";

interface ModalRemoverNotaProps {
  id: string;
}

export default function ModalRemoverNota({ id }: ModalRemoverNotaProps) {

  const [open, setOpen] = useState(false);
  const { handleRemoveNf, isRemovingNota } = useRemoveNf();

  function handleRemoverNota() {
    handleRemoveNf(id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Remover Nota
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover Nota</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleRemoverNota}>Remover Nota</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}