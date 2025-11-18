'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/_shared/_components/ui/form';
import { Checkbox } from '@/_shared/_components/ui/checkbox';

interface FormCheckboxFieldProps {
  control: any;
  name: string;
  label: string;
  description?: string;
}

export function FormCheckboxField({
  control,
  name,
  label,
  description,
}: FormCheckboxFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-3">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
