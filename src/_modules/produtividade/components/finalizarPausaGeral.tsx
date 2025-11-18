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
import { Label } from '@/_shared/_components/ui/label';
import { CheckCircle2, Package, CheckSquare, Truck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { segmentos } from '../consts/segmento';
import { turnos } from '../consts/turnos';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';

import { Controller } from 'react-hook-form';
import { useFinalizarPausaGeral } from '../hooks/mutation/useFinalizarPausaGeral';
import { processos } from '../consts/processos';

interface FinalizarPausaGeralProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FinalizarPausaGeral({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: FinalizarPausaGeralProps = {}) {
  const { forms, finalizarPausaGeral, isFinalizandoPausaGeral } =
    useFinalizarPausaGeral();
  const { control, handleSubmit, formState, watch, setValue, reset } = forms;
  const { errors, isValid } = formState;

  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (externalOnOpenChange) {
      externalOnOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
    if (!newOpen) {
      reset();
    }
  };

  const onSubmit = (data: any) => {
    finalizarPausaGeral(data);
    handleOpenChange(false); // Fecha o dialog
  };

  const watchedProcesso = watch('processo');
  const watchedSegmento = watch('segmento');

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
              <CheckCircle2 className="text-primary h-4 w-4" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Finalizar Pausa Geral
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            Selecione o processo, segmento e turno para finalizar a pausa geral.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Processo</Label>
              <div className="grid grid-cols-3 gap-2">
                {processos.map((processoOption) => {
                  const Icon = processoOption.icon;
                  // [MODIFICADO] Compara com o valor assistido do RHF
                  const isSelected = watchedProcesso === processoOption.value;
                  return (
                    <button
                      key={processoOption.value}
                      type="button" // MANTENHA type="button"
                      // [MODIFICADO] Atualiza o valor no RHF
                      onClick={() =>
                        setValue('processo', processoOption.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-lg border-2 p-2 transition-all duration-200',
                        'hover:scale-[1.02] active:scale-[0.98]',
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-sm'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50',
                      )}
                    >
                      {/* ... (Ícone e Label sem alterações) ... */}
                      <div
                        className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
                          isSelected
                            ? 'bg-primary text-primary-foreground scale-105 shadow-sm'
                            : 'bg-muted text-muted-foreground',
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span
                        className={cn(
                          'text-center text-xs font-medium transition-colors duration-200',
                          isSelected ? 'text-primary' : 'text-foreground',
                        )}
                      >
                        {processoOption.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* [ADICIONADO] Exibição de erro */}
              {errors.processo && (
                <p className="text-destructive mt-1 text-xs">
                  {errors.processo.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Segmento</Label>
              <div className="flex flex-col gap-2">
                {segmentos.map((segmentoOption) => {
                  // [MODIFICADO] Compara com o valor assistido do RHF
                  const isSelected = watchedSegmento === segmentoOption.value;
                  return (
                    <button
                      key={segmentoOption.value}
                      type="button" // MANTENHA type="button"
                      // [MODIFICADO] Atualiza o valor no RHF
                      onClick={() =>
                        setValue('segmento', segmentoOption.value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        'flex w-full items-center justify-center rounded-md border p-2.5 transition-all duration-200',
                        'hover:border-primary/50',
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border hover:bg-muted/50',
                      )}
                    >
                      <span className="text-center text-sm">
                        {segmentoOption.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* [ADICIONADO] Exibição de erro */}
              {errors.segmento && (
                <p className="text-destructive mt-1 text-xs">
                  {errors.segmento.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Turno</Label>
              {/* [MODIFICADO] Use o <Controller> para componentes de Select */}
              <Controller
                control={control}
                name="turno"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o turno" />
                    </SelectTrigger>
                    <SelectContent>
                      {turnos.map((turnoOption) => (
                        <SelectItem
                          key={turnoOption.value}
                          value={turnoOption.value}
                        >
                          {turnoOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {/* [ADICIONADO] Exibição de erro */}
              {errors.turno && (
                <p className="text-destructive mt-1 text-xs">
                  {errors.turno.message}
                </p>
              )}
            </div>
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
              disabled={!isValid || isFinalizandoPausaGeral}
            >
              Finalizar Pausa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
