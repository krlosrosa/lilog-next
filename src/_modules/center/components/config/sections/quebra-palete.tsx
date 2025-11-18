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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import { Switch } from '@/_shared/_components/ui/switch';
import { Input } from '@/_shared/_components/ui/input';
import { FormValues } from '../types';

interface QuebraPaleteProps {
  control: Control<FormValues>;
}

export const QuebraPalete = ({ control }: QuebraPaleteProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quebra de Palete</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={control}
          name="quebraPalete"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Quebra de Palete</FormLabel>
                <FormDescription>Ativar quebra de palete</FormDescription>
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
          name="tipoQuebra"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Quebra</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value === 'null' ? null : value)
                }
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PERCENTUAL">Porcentual</SelectItem>
                  <SelectItem value="LINHAS">Linhas</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="valorQuebra"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor da Quebra</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
