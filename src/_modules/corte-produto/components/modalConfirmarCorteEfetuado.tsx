'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useState, ReactNode } from "react";
import useConfirmarCorte from "../hooks/useConfirmarCorte";

interface ModalConfirmarCorteEfetuadoProps {
  id: string;
  children?: ReactNode;
}

export default function ModalConfirmarCorteEfetuado({ id, children }: ModalConfirmarCorteEfetuadoProps) {
  const { handleAddCorteProduto, open, setOpen } = useConfirmarCorte();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="bg-primary/10 border-primary/20 flex h-16 w-16 items-center justify-center rounded-full border-2">
              <AlertCircle className="text-primary h-8 w-8" />
            </div>
            <div className="text-center">
              <DialogTitle className="text-lg font-semibold">
                Confirmar Corte Efetuado
              </DialogTitle>
              <DialogDescription className="mt-2">
                O corte de mercadoria foi realizado com sucesso?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground text-center">
            Confirme se o corte foi efetuado corretamente. Esta ação atualizará o status do corte.
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto gap-2"
          >
            <XCircle className="h-4 w-4" />
            Cancelar
          </Button>
          <Button 
            type="button" 
            onClick={() => handleAddCorteProduto(id)}
            className="w-full sm:w-auto gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Confirmar Corte Efetuado
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
