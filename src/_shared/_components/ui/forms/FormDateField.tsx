'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/_shared/_components/ui/button';
import { Calendar } from '@/_shared/_components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/_components/ui/popover';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/_shared/_components/ui/form';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FormDateFieldProps {
  control: any;
  name: string;
  label: string;
  description?: string;
}

export function FormDateField({
  control,
  name,
  label,
  description,
}: FormDateFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={`w-full pl-3 text-left font-normal ${
                    !field.value && 'text-muted-foreground'
                  }`}
                >
                  {field.value ? (
                    format(field.value, 'dd/MM/yyyy', { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
