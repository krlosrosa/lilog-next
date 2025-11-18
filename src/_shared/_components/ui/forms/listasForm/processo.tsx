'use client';

import * as React from 'react';
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
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/_shared/_components/ui/select';

interface SelectFieldProps {
  control: any;
}

const empresa = [
  { label: 'Separação', value: 'SEPARACAO' },
  { label: 'Conferencia', value: 'CONFERENCIA' },
  { label: 'Carregamento', value: 'CARREGAMENTO' },
];

export function SelecionarProcesso({ control }: SelectFieldProps) {
  return (
    <FormField
      control={control}
      name="processo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Processo</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue
                  className="w-full"
                  placeholder="Selecione o processo"
                />
              </SelectTrigger>
              <SelectContent>
                {empresa.map((opt) => (
                  <SelectItem
                    className="w-full"
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
