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
import { Input } from '@/_shared/_components/ui/input';
import { FormValues } from '../types';

interface CamposSistemaProps {
  control: Control<FormValues>;
}

export const CamposSistema = ({ control }: CamposSistemaProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Campos de Sistema</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="centerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Center ID</FormLabel>
              <FormControl>
                <Input {...field} readOnly disabled />
              </FormControl>
              <FormDescription>
                ID do centro (preenchido automaticamente)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="atribuidoPorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Atribuído Por ID</FormLabel>
              <FormControl>
                <Input disabled {...field} value={field.value || ''} readOnly />
              </FormControl>
              <FormDescription>
                ID do usuário (preenchido automaticamente)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
