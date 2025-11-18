'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/_shared/_components/ui/form';
import { Input } from '@/_shared/_components/ui/input';

interface FormInputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
}

export function FormInputField({
  control,
  name,
  label,
  placeholder,
  description,
  type = 'text',
}: FormInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
