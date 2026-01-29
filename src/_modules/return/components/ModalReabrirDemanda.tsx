'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ModalReabrirDemandaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ModalReabrirDemanda({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: ModalReabrirDemandaProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reabrir Demanda</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Ao reabrir esta demanda, ela voltará para o status anterior e poderá ser editada novamente.
              Esta ação não pode ser desfeita.
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground">
            Confirme se deseja reabrir esta demanda.
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Reabrindo...' : 'Reabrir Demanda'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
