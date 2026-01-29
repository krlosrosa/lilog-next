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
import { GetDemandaByIdDevolucaoQueryResult } from "@/_services/api/service/devolucao/devolucao";

interface ModalDeletarDemandaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  demanda?: GetDemandaByIdDevolucaoQueryResult;
  isLoading?: boolean;
}

export function ModalDeletarDemanda({
  open,
  onOpenChange,
  onConfirm,
  demanda,
  isLoading = false,
}: ModalDeletarDemandaProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Deletar Demanda
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {demanda && (
            <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">ID da Demanda:</span>
                <span className="text-sm font-semibold font-mono">{demanda.id}</span>
              </div>
              {demanda.placa && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Placa:</span>
                  <span className="text-sm font-semibold font-mono">{demanda.placa}</span>
                </div>
              )}
              {demanda.motorista && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Motorista:</span>
                  <span className="text-sm font-semibold">{demanda.motorista}</span>
                </div>
              )}
            </div>
          )}

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Esta ação não pode ser desfeita. A demanda e todas as notas fiscais associadas serão permanentemente removidas.
            </AlertDescription>
          </Alert>

          <p className="text-sm text-muted-foreground">
            Confirme se deseja deletar esta demanda permanentemente.
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
                Deletando...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Deletar Demanda
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
