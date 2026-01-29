'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ModalConfirmacaoNotaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  tipo: 'DEVOLUCAO' | 'DEVOLUCAO_PARCIAL' | 'REENTREGA';
  nfParcial: string;
  onNfParcialChange: (value: string) => void;
  isLoading?: boolean;
}

export function ModalConfirmacaoNota({
  open,
  onOpenChange,
  onConfirm,
  tipo,
  nfParcial,
  onNfParcialChange,
  isLoading = false,
}: ModalConfirmacaoNotaProps) {
  const isParcial = tipo === 'DEVOLUCAO_PARCIAL';
  const canConfirm = !isParcial || (isParcial && nfParcial.trim() !== '');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Adição de Nota Fiscal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {isParcial && (
            <div className="space-y-2">
              <Label htmlFor="nf-parcial">
                Nota Fiscal de Referência <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nf-parcial"
                type="text"
                value={nfParcial}
                onChange={(e) => onNfParcialChange(e.target.value)}
                placeholder="Digite o número da NF de referência"
                className="w-full"
              />
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Para devoluções parciais, é necessário informar a nota fiscal de referência.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {!isParcial && (
            <p className="text-sm text-muted-foreground">
              Confirme a adição desta nota fiscal à demanda.
            </p>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              disabled={!canConfirm || isLoading}
            >
              {isLoading ? 'Confirmando...' : 'Confirmar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
