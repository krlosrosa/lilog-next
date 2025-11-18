'use client';

import { Button } from '@/_shared/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/_shared/_components/ui/dialog';
import { Label } from '@/_shared/_components/ui/label';
import { Users } from 'lucide-react';
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
import { useAddPausaGeral } from '../hooks/mutation/useAddPausaGeral';
import { processos } from '../consts/processos';
import { motivosPausa } from '../consts/motivos-pausa';
import { getBuscarPausasAtivasQueryKey } from '@/_services/api/service/gestao-produtividade/gestao-produtividade';

interface AddPausaGeralProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AddPausaGeral({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: AddPausaGeralProps = {}) {
  const { forms, criarPausaGeral, isCriandoPausaGeral } = useAddPausaGeral();
  const { control, handleSubmit, formState, watch, setValue, reset } = forms;
  const { errors } = formState;

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
    criarPausaGeral(data);
    handleOpenChange(false);
  };

  const watchedProcesso = watch('processo');
  const watchedMotivo = watch('motivo');

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
              <Users className="text-primary h-4 w-4" />
            </div>
            <DialogTitle className="text-base font-semibold">
              Adicionar Pausa Geral
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Processo</Label>
              <div className="grid grid-cols-3 gap-2">
                {processos.map((processoOption) => {
                  const Icon = processoOption.icon;
                  const isSelected = watchedProcesso === processoOption.value;
                  return (
                    <button
                      key={processoOption.value}
                      type="button"
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
              {errors.processo && (
                <p className="text-destructive mt-1 text-xs">
                  {errors.processo.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Segmento</Label>
                <Controller
                  control={control}
                  name="segmento"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-9 w-full">
                        <SelectValue placeholder="Selecione o segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        {segmentos
                          .filter(
                            (segmentoOption) =>
                              segmentoOption.value !== 'TODOS',
                          )
                          .map((segmentoOption) => (
                            <SelectItem
                              key={segmentoOption.value}
                              value={segmentoOption.value}
                            >
                              {segmentoOption.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.segmento && (
                  <p className="text-destructive text-xs">
                    {errors.segmento.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Turno</Label>
                <Controller
                  control={control}
                  name="turno"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-9 w-full">
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
                {errors.turno && (
                  <p className="text-destructive text-xs">
                    {errors.turno.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Motivo da Pausa</Label>
              <div className="grid grid-cols-1 gap-2">
                {motivosPausa
                  .filter(
                    (motivoOption) => motivoOption.value !== 'FALTA_PRODUTO',
                  )
                  .map((motivoOption) => {
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
                <p className="text-destructive mt-1 text-xs">
                  {errors.motivo.message}
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
            <Button type="submit" disabled={isCriandoPausaGeral}>
              Adicionar Pausa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
