import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { useState } from "react";
import useLiberarDemanda from "../hooks/useLiberarDemanda";

interface ModalLiberarDemandaProps {
  demandaId: string;
}

export default function ModalLiberarDemanda({ demandaId }: ModalLiberarDemandaProps) {
  const { handleLiberarDemanda, isLiberandoDemanda, open, setOpen } = useLiberarDemanda();


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Liberar Demanda
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Liberar Demanda</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={() => handleLiberarDemanda(demandaId)}>Liberar Demanda</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}