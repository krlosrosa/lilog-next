'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

interface ModalViagemSearchProps {
  viagemId: string;
  onViagemIdChange: (value: string) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ModalViagemSearch({
  viagemId,
  onViagemIdChange,
  onConfirm,
  isLoading = false,
}: ModalViagemSearchProps) {
  const [open, setOpen] = useState(false);
  const [localViagemId, setLocalViagemId] = useState(viagemId);

  const handleConfirm = () => {
    onViagemIdChange(localViagemId);
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Search className="h-4 w-4" />
          {viagemId ? `Viagem: ${viagemId}` : 'Buscar Viagem'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buscar Viagem Ravex</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="viagem-id">ID da Viagem</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="viagem-id"
                type="text"
                placeholder="Digite o ID da viagem Ravex"
                value={localViagemId}
                onChange={(e) => setLocalViagemId(e.target.value)}
                className="pl-9"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && localViagemId) {
                    handleConfirm();
                  }
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Informe o ID da viagem para buscar as notas fiscais disponíveis
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!localViagemId || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                'Buscar'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
