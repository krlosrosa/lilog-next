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

interface ModalLiberarDemandaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ModalLiberarDemanda({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: ModalLiberarDemandaProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Liberar Demanda para o Armazém</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Ao liberar esta demanda, ela ficará disponível para conferência no armazém.
              Esta ação não pode ser desfeita.
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground">
            Confirme se deseja liberar esta demanda para o armazém.
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
            {isLoading ? 'Liberando...' : 'Liberar Demanda'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
