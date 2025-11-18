'use client';

import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/_shared/_components/ui/form';
import { Switch } from '@/_shared/_components/ui/switch';
import { FormValues } from '../types';

interface OpcoesSeparacaoProps {
  control: Control<FormValues>;
}

export const OpcoesSeparacao = ({ control }: OpcoesSeparacaoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Opções de Separação</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="separarPaleteFull"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Separar Palete Full</FormLabel>
                <FormDescription>Separar paletes completos</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="separarUnidades"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Separar Unidades</FormLabel>
                <FormDescription>
                  Separar por unidades individuais
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
