'use client';

import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/_shared/_components/ui/select';
import { Label } from './label';

interface SimpleSelectProps {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectWithLabel({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SimpleSelectProps) {
  const [selected, setSelected] = React.useState(value ?? '');

  React.useEffect(() => {
    setSelected(value ?? '');
  }, [value]);

  const handleChange = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div>
      <Label className="text-sm font-semibold">{label}</Label>
      <Select onValueChange={handleChange} value={selected}>
        <SelectTrigger className="w-full">
          <SelectValue className="w-full" placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
