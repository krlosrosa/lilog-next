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
import { AlertCircle, AlertTriangle } from "lucide-react";

export type ItemDivergencia = { sku: string; descricao: string };

interface ModalConfirmacaoNotaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  tipo: 'DEVOLUCAO' | 'DEVOLUCAO_PARCIAL' | 'REENTREGA';
  nfParcial: string;
  onNfParcialChange: (value: string) => void;
  isLoading?: boolean;
  /** Número da nota que está sendo confirmada (ex.: "12345") */
  numeroNota?: string;
  /** Itens com divergência (Qtd. Ravex ≠ Qtd. Caixas ou ≠ Decimal) para exibir aviso */
  itensComDivergencia?: ItemDivergencia[];
}

export function ModalConfirmacaoNota({
  open,
  onOpenChange,
  onConfirm,
  tipo,
  nfParcial,
  onNfParcialChange,
  isLoading = false,
  numeroNota,
  itensComDivergencia = [],
}: ModalConfirmacaoNotaProps) {
  const isParcial = tipo === 'DEVOLUCAO_PARCIAL';
  const canConfirm = !isParcial || (isParcial && nfParcial.trim() !== '');
  const temDivergencia = itensComDivergencia.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Adição de Nota Fiscal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {temDivergencia && (
            <Alert variant="destructive" className="border-destructive/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="text-sm">
                  <p className="font-medium mb-1">
                    Existem {itensComDivergencia.length} item(ns) com divergência
                    {numeroNota ? ` na Nota #${numeroNota}` : ''}.
                  </p>
                  <p className="text-muted-foreground mb-2">
                    Verifique se as quantidades (Qtd. Caixas, Qtd. Unidades ou Decimal) estão corretas antes de confirmar.
                  </p>
                  <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                    {itensComDivergencia.map((item) => (
                      <li key={item.sku}>
                        <span className="font-mono">{item.sku}</span>
                        {item.descricao ? ` — ${item.descricao}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

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
