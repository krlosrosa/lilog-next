'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { AlertCircle, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import { useDeletarCorteProduto } from "../hooks/useDeletarCorteProduto";
import type { CorteMercadoriaGetDto } from "@/_services/api/model";

interface ModalDeletarCorteProps {
  id: string;
  corte: CorteMercadoriaGetDto;
  children?: ReactNode;
}

export function ModalDeletarCorte({ id, corte, children }: ModalDeletarCorteProps) {
  const { open, setOpen, handleDeletarCorte, isDeletando } = useDeletarCorteProduto();

  const onConfirm = () => {
    handleDeletarCorte(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="outline"
            size="icon"
            title="Excluir corte"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Excluir Corte
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Transporte:</span>
              <span className="text-sm font-semibold font-mono">{corte.transporteId ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Produto (SKU):</span>
              <span className="text-sm font-semibold font-mono">{corte.produto ?? "—"}</span>
            </div>
            {corte.descricao && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Descrição:</span>
                <span className="text-sm font-semibold truncate max-w-[200px]" title={corte.descricao}>
                  {corte.descricao}
                </span>
              </div>
            )}
          </div>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Esta ação não pode ser desfeita. O corte será permanentemente removido.
            </AlertDescription>
          </Alert>

          <p className="text-sm text-muted-foreground">
            Confirme se deseja excluir este corte.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeletando}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeletando}
            className="gap-2"
          >
            {isDeletando ? (
              <>
                <Trash2 className="h-4 w-4 animate-pulse" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Excluir Corte
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
