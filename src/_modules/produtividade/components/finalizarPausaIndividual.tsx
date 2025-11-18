'use client';

import { useProdutividadeOperations } from '../hooks/useProdutividadeOperations';
import { Button } from '@/_shared/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/_shared/_components/ui/dialog';
import { Input } from '@/_shared/_components/ui/input';
import { Label } from '@/_shared/_components/ui/label';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useFinalizarPausa } from '../hooks/mutation/useFinalizarPausa';

interface FinalizarPausaIndividualProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FinalizarPausaIndividual({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: FinalizarPausaIndividualProps = {}) {
  const {
    finalizarPausa,
    isFinalizandoPausaIndividual,
    paleteId,
    setPaleteId,
    internalOpen,
    setInternalOpen,
  } = useFinalizarPausa();

  const open = externalOpen !== undefined ? externalOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (externalOnOpenChange) {
      externalOnOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
    if (!newOpen) {
      setPaleteId('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
              <CheckCircle2 className="text-primary h-4 w-4" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Finalizar Pausa Individual
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            Informe o ID do palete para finalizar a pausa individual.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium">ID do Palete</Label>
            <Input
              placeholder="Digite o ID do palete"
              value={paleteId}
              onChange={(e) => setPaleteId(e.target.value)}
              className="h-9"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={finalizarPausa}
            disabled={!paleteId || isFinalizandoPausaIndividual}
          >
            {isFinalizandoPausaIndividual
              ? 'Finalizando...'
              : 'Finalizar Pausa'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
