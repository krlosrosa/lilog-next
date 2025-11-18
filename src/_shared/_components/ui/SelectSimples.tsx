'use client';

import * as React from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/_shared/_components/ui/select';

interface SimpleSelectProps {
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export function SimpleSelect({
  placeholder,
  options,
  value,
  onChange,
}: SimpleSelectProps) {
  const [selected, setSelected] = React.useState(value ?? '');

  const handleChange = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
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
  );
}
