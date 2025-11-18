'use client';

import { Control } from 'react-hook-form';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/_shared/_components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/_shared/_components/ui/collapsible';
import { Label } from '@/_shared/_components/ui/label';
import { ChevronDown } from 'lucide-react';
import { FormValues, OrdemOpenState } from '../types';
import { SortableItem } from '../sortable-item';
import { useSortableOrders } from '../../../hooks/use-sortable-orders';

type OnOrdemOpenChange = (field: keyof OrdemOpenState, open: boolean) => void;

// Type for sensors from @dnd-kit/core
type SensorConfig = ReturnType<typeof import('@dnd-kit/core').useSensors>;

interface ConfiguracoesConferenciaProps {
  control: Control<FormValues>;
  ordemOpen: OrdemOpenState;
  onOrdemOpenChange: OnOrdemOpenChange;
  sensors: SensorConfig;
}

export const ConfiguracoesConferencia = ({
  control,
  ordemOpen,
  onOrdemOpenChange,
  sensors,
}: ConfiguracoesConferenciaProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Configurações de Conferência</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="tipoImpressaoConferencia"
          render={({ field }) => {
            // Garante que o valor seja uma string válida ou undefined
            // O Select do Radix UI precisa de undefined (não string vazia) quando não há valor
            const value = field.value && String(field.value).trim() !== '' ? String(field.value) : undefined;
            
            return (
              <FormItem>
                <FormLabel>Tipo de Impressão Conferência</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  value={value}
                  key={`tipoImpressaoConferencia-${value || 'empty'}`} // Força re-render quando o valor mudar
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CLIENTE">Cliente</SelectItem>
                    <SelectItem value="TRANSPORTE">Transporte</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <div className="space-y-2">
        <OrdemSection
          control={control}
          name="ordemConferencia"
          title="Ordem Conferência"
          isOpen={ordemOpen.conferencia}
          onOpenChange={(open) => onOrdemOpenChange('conferencia', open)}
          prefix="conferencia"
          sensors={sensors}
        />

        <OrdemSection
          control={control}
          name="ordemFifo"
          title="Ordem FIFO"
          isOpen={ordemOpen.fifo}
          onOpenChange={(open) => onOrdemOpenChange('fifo', open)}
          prefix="fifo"
          sensors={sensors}
        />

        <OrdemSection
          control={control}
          name="ordemPaletes"
          title="Ordem Paletes"
          isOpen={ordemOpen.paletes}
          onOpenChange={(open) => onOrdemOpenChange('paletes', open)}
          prefix="paletes"
          sensors={sensors}
        />

        <OrdemSection
          control={control}
          name="ordemPicking"
          title="Ordem Picking"
          isOpen={ordemOpen.picking}
          onOpenChange={(open) => onOrdemOpenChange('picking', open)}
          prefix="picking"
          sensors={sensors}
        />

        <OrdemSection
          control={control}
          name="ordemUnidades"
          title="Ordem Unidades"
          isOpen={ordemOpen.unidades}
          onOpenChange={(open) => onOrdemOpenChange('unidades', open)}
          prefix="unidades"
          sensors={sensors}
        />
      </div>
    </div>
  );
};

interface OrdemSectionProps {
  control: Control<FormValues>;
  name:
    | 'ordemConferencia'
    | 'ordemFifo'
    | 'ordemPaletes'
    | 'ordemPicking'
    | 'ordemUnidades';
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  prefix: string;
  sensors: SensorConfig;
}

const OrdemSection = ({
  control,
  name,
  title,
  isOpen,
  onOpenChange,
  prefix,
  sensors,
}: OrdemSectionProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="hover:bg-accent flex w-full items-center justify-between rounded-lg border p-3">
        <Label className="font-medium">{title}</Label>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1 pl-4">
        <FormField
          control={control}
          name={name}
          render={({ field }) => {
            const { ordem, todosCampos, handleDragEnd, handleToggleField } =
              useSortableOrders({
                ordemAtual: field.value,
                onOrderChange: field.onChange,
              });

            return (
              <FormItem>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <div className="space-y-1 rounded border p-2">
                    <SortableContext
                      items={todosCampos}
                      strategy={verticalListSortingStrategy}
                    >
                      {todosCampos.map((campo) => {
                        const isChecked = ordem.includes(campo);
                        return (
                          <SortableItem
                            key={campo}
                            id={campo}
                            campo={campo}
                            isChecked={isChecked}
                            onCheckedChange={(checked) =>
                              handleToggleField(campo, checked)
                            }
                            prefix={prefix}
                          />
                        );
                      })}
                    </SortableContext>
                  </div>
                </DndContext>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};
