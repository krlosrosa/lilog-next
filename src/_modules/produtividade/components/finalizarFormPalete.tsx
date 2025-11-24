'use client';

import React, { useState } from 'react';
// [REMOVIDO] import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { Plus, Trash2, StickyNote, X, Flag } from 'lucide-react';

import { Input } from '@/_shared/_components/ui/input';
import { Button } from '@/_shared/_components/ui/button';
import { Label } from '@/_shared/_components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { useFinalizarProdutividade } from '../hooks/mutation/useFinalizarProdutividade';

export const FinalizarFormPalete = () => {
  const [currentPalete, setCurrentPalete] = useState('');
  const [showObservacao, setShowObservacao] = useState(false);
  const [observacao, setObservacao] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { finalizarProdutividade, paletes, setPaletes } =
    useFinalizarProdutividade();
  // [ADICIONADO] Estados para gerenciar os paletes e o erro
  const [error, setError] = useState<string | null>(null);

  function onSubmit(paletesIds: string[]) {
    finalizarProdutividade();
  }

  // [ADICIONADO] Função para resetar todo o estado do formulário/dialog
  const resetState = () => {
    setCurrentPalete('');
    setShowObservacao(false);
    setObservacao('');
    setPaletes([]);
    setError(null);
  };

  // [ADICIONADO] Lógica para lidar com o 'append'
  const handleAddPalete = () => {
    const paleteValue = currentPalete.trim();
    if (paleteValue) {
      const alreadyExists = paletes.some(
        (p) => p.toLowerCase() === paleteValue.toLowerCase(),
      );

      if (!alreadyExists) {
        setPaletes((prevPaletes) => [...prevPaletes, paleteValue]);
        setError(null); // Limpa o erro ao adicionar um item
      }
      setCurrentPalete(''); // Limpa o input em ambos os casos
    }
  };

  // [ADICIONADO] Lógica para lidar com o 'remove'
  const handleRemovePalete = (indexToRemove: number) => {
    setPaletes((prevPaletes) =>
      prevPaletes.filter((_, i) => i !== indexToRemove),
    );
  };

  // [MODIFICADO] Lógica de submit agora é manual
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o reload da página

    // Validação manual
    if (paletes.length === 0) {
      setError('Adicione pelo menos um palete');
      return;
    }

    // Sucesso
    setError(null);
    onSubmit?.(paletes);
    setOpenDialog(false); // Fecha o dialog (o 'onOpenChange' cuidará do reset)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPalete();
    }
  };

  // [MODIFICADO] Adicionado onOpenChange para resetar o estado ao fechar
  const handleOpenChange = (open: boolean) => {
    setOpenDialog(open);
    if (!open) {
      resetState();
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer hover:bg-primary/10 hover:text-primary'>
          <Flag className="mr-2 h-4 w-4" />
          Finalizar Demanda
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <div className="mb-2 flex flex-col items-center gap-3">
            <div className="bg-primary/10 border-primary/20 flex h-16 w-16 items-center justify-center rounded-full border-2">
              <Flag className="text-primary h-8 w-8" />
            </div>
            <div className="text-center">
              <DialogTitle className="text-xl">Finalizar Demanda</DialogTitle>
              <DialogDescription className="mt-1">
                Adicione os paletes e finalize a demanda.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {/* [MODIFICADO] O 'form' agora usa o 'onSubmit' manual */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="palete">Código do Palete</Label>
            <div className="flex gap-2">
              <Input
                id="palete"
                type="text"
                placeholder="Digite o código do palete"
                value={currentPalete}
                onChange={(e) => setCurrentPalete(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddPalete}
                disabled={!currentPalete.trim()}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* [MODIFICADO] Renderiza a partir do 'paletes' state */}
          {paletes.length > 0 && (
            <div className="space-y-2">
              <Label>Paletes Adicionados ({paletes.length})</Label>
              <div className="bg-muted/20 flex max-h-36 flex-col gap-1.5 overflow-y-auto rounded-md border p-2">
                {/* A lógica de reverter para exibição é mantida */}
                {[...paletes].reverse().map((palete, displayIndex) => {
                  const originalIndex = paletes.length - 1 - displayIndex;
                  return (
                    <div
                      key={originalIndex} // Usar o índice como chave é OK aqui
                      className="bg-background hover:bg-muted/50 flex w-full items-center justify-between gap-2 rounded-md border p-2 transition-colors"
                    >
                      <span className="flex-1 text-sm font-medium">
                        {palete}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive/10 hover:text-destructive h-7 w-7 rounded-md transition-colors"
                        onClick={() => handleRemovePalete(originalIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* [MODIFICADO] Mostra o erro do 'error' state */}
          {error && <p className="text-destructive text-sm">{error}</p>}

          {/* Nenhuma mudança necessária na seção de observação */}
          {showObservacao && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="observacao">Observação</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowObservacao(false);
                    setObservacao('');
                  }}
                  className="text-muted-foreground hover:text-foreground h-6 w-6"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              <textarea
                id="observacao"
                placeholder="Digite uma observação (opcional)"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows={3}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          )}

          {!showObservacao && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowObservacao(true)}
              className="text-muted-foreground hover:text-foreground w-full"
            >
              <StickyNote className="mr-1.5 h-3.5 w-3.5" />
              Adicionar observação
            </Button>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenDialog(false)} // O 'onOpenChange' fará o reset
            >
              Cancelar
            </Button>
            <Button
              type="submit" // Aciona o 'onSubmit' do <form>
              // [MODIFICADO] Desabilitado com base no 'paletes' state
              disabled={paletes.length === 0}
            >
              <Flag className="mr-2 h-4 w-4" />
              Finalizar Demanda
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
