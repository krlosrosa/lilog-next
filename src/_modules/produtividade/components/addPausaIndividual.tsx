'use client';

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
import { Pause, StickyNote, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { useAddPausaIndividual } from '../hooks/mutation/useAddPausaIndividual';
import { motivosPausa } from '../consts/motivos-pausa';

interface AddPausaIndividualProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AddPausaIndividual({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: AddPausaIndividualProps = {}) {
  const { forms, criarPausaIndividual, isCriandoPausaIndividual } =
    useAddPausaIndividual();

  const { register, handleSubmit, formState, watch, setValue, reset } = forms;
  const { errors, isValid } = formState;

  const [internalOpen, setInternalOpen] = useState(false);
  const [showObservacao, setShowObservacao] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (externalOnOpenChange) {
      externalOnOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
    if (!newOpen) {
      reset();
      setShowObservacao(false);
    }
  };

  const onSubmit = (data: any) => {
    criarPausaIndividual(data);
    handleOpenChange(false);
  };

  const watchedMotivo = watch('motivo');

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
              <Pause className="text-primary h-4 w-4" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Adicionar Pausa Individual
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            Preencha os dados para registrar uma nova pausa individual.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">ID do Palete</Label>
              <Input
                placeholder="Digite o ID do palete"
                className="h-9"
                {...register('paleteId')}
              />
              {errors.paleteId && (
                <p className="text-destructive text-xs">
                  {errors.paleteId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Motivo da Pausa</Label>
              <div className="grid grid-cols-1 gap-2">
                {motivosPausa.map((motivoOption) => {
                  const Icon = motivoOption.icon;
                  const isSelected = watchedMotivo === motivoOption.value;
                  return (
                    <button
                      key={motivoOption.value}
                      type="button"
                      onClick={() =>
                        setValue('motivo', motivoOption.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        'flex items-center gap-2.5 rounded-lg border-2 p-2.5 text-left transition-all duration-200',
                        'hover:scale-[1.01] active:scale-[0.99]',
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200',
                          isSelected
                            ? 'bg-primary text-primary-foreground scale-105 shadow-sm'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span
                        className={cn(
                          'text-sm font-medium transition-colors duration-200',
                          isSelected ? 'text-primary' : 'text-foreground',
                        )}
                      >
                        {motivoOption.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.motivo && (
                <p className="text-destructive text-xs">
                  {errors.motivo.message}
                </p>
              )}
            </div>

            {showObservacao && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Observação</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowObservacao(false);
                      setValue('descricao', '');
                    }}
                    className="text-muted-foreground hover:text-foreground h-6 w-6"
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <textarea
                  placeholder="Digite uma observação (opcional)"
                  rows={2}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  {...register('descricao')}
                />
              </div>
            )}

            {!showObservacao && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowObservacao(true)}
                className="text-muted-foreground hover:text-foreground w-full text-sm"
              >
                <StickyNote className="mr-1.5 h-3.5 w-3.5" />
                Adicionar observação
              </Button>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isCriandoPausaIndividual}
            >
              Adicionar Pausa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
