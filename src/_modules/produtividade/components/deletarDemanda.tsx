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
import { AlertTriangle, Loader2, Trash2 } from 'lucide-react';
import useDeletarDemandaProdutividade from '../hooks/mutation/useDeletarDemanda';

interface DeletarDemandaProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function DeletarDemanda({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: DeletarDemandaProps = {}) {
  const { setPaleteId, internalOpen, setInternalOpen, paleteId, isDeletandoDemanda, handleDeletarDemanda } = useDeletarDemandaProdutividade();

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
          <div className="mb-2 flex flex-col items-center gap-3">
            <div className="bg-destructive/10 border-destructive/20 flex h-16 w-16 items-center justify-center rounded-full border-2">
              <AlertTriangle className="text-destructive h-8 w-8" />
            </div>
            <div className="text-center">
              <DialogTitle className="text-destructive text-lg font-semibold">
                Deletar Demanda
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm">
                Esta ação não pode ser desfeita. Todos os dados relacionados a
                esta demanda serão permanentemente removidos.
              </DialogDescription>
            </div>
          </div>
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

          <div className="bg-destructive/5 border-destructive/20 flex items-start gap-3 rounded-lg border p-4">
            <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1">
              <p className="text-destructive mb-1 text-sm font-medium">
                Atenção!
              </p>
              <p className="text-muted-foreground text-xs">
                Você está prestes a deletar uma demanda. Esta ação é
                irreversível e todos os dados associados serão perdidos
                permanentemente.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleDeletarDemanda}
            variant="destructive"
            disabled={!paleteId}
            className="w-full sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeletandoDemanda ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deletando...
              </>
            ) : (
              'Deletar Demanda'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
