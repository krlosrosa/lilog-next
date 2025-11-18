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
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

const empresa = [
  { label: 'Manhã', value: 'MANHA' },
  { label: 'Tarde', value: 'TARDE' },
  { label: 'Noite', value: 'NOITE' },
  { label: 'Intermédiario', value: 'INTERMEDIARIO' },
  { label: 'Administrativo', value: 'ADMINISTRATIVO' },
];

export function SelecionarTurno({
  control,
  name,
  label,
  placeholder,
  description,
}: SelectFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue className="w-full" placeholder={placeholder} />
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
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
