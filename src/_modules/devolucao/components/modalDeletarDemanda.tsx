import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { useState } from "react";
import useDeletarDemanda from "../hooks/userDeletarDemanda";

export default function ModalDeletarDemanda({ id }: { id: string }) {
  const { handleDeletarDemanda, isDeletandoDemandaDevolucao, open, setOpen } = useDeletarDemanda();

  function handleDeletarDemandaModal() {
    handleDeletarDemanda(id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Deletar Demanda
        </Button>
      </DialogTrigger>  
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar Demanda</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDeletarDemandaModal}>Deletar Demanda</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}