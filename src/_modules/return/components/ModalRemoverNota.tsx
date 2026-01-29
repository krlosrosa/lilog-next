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
import { AlertCircle, Trash2 } from "lucide-react";
import { GetNotasDto } from "@/_services/api/model";

interface ModalRemoverNotaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  nota?: GetNotasDto;
  isLoading?: boolean;
}

export function ModalRemoverNota({
  open,
  onOpenChange,
  onConfirm,
  nota,
  isLoading = false,
}: ModalRemoverNotaProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Remover Nota Fiscal
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {nota && (
            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Nota Fiscal:</span>
                <span className="text-sm font-semibold">{nota.notaFiscal}</span>
              </div>
              {nota.nfParcial && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">NF Parcial:</span>
                  <span className="text-sm font-semibold">{nota.nfParcial}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Empresa:</span>
                <span className="text-sm font-semibold">{nota.empresa}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Tipo:</span>
                <span className="text-sm font-semibold">{nota.tipo}</span>
              </div>
            </div>
          )}

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Esta ação não pode ser desfeita. A nota fiscal será permanentemente removida desta demanda.
            </AlertDescription>
          </Alert>

          <p className="text-sm text-muted-foreground">
            Confirme se deseja remover esta nota fiscal da demanda.
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
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Trash2 className="h-4 w-4 animate-pulse" />
                Removendo...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Remover Nota Fiscal
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
