'use client';

import * as React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/_components/ui/popover';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimpleSelectProps {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

export function SelectLabelMutiple({
  label,
  placeholder = 'Selecione os itens',
  options,
  value = [],
  onChange,
}: SimpleSelectProps) {
  const [selected, setSelected] = React.useState<string[]>(value ?? []);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setSelected(value ?? []);
  }, [value]);

  const handleToggle = (optValue: string) => {
    const newSelected = selected.includes(optValue)
      ? selected.filter((v) => v !== optValue)
      : [...selected, optValue];
    
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) {
      const option = options.find((opt) => opt.value === selected[0]);
      return option?.label || selected[0];
    }
    return `${selected.length} itens selecionados`;
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-semibold">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-between text-left font-normal',
              selected.length === 0 && 'text-muted-foreground'
            )}
          >
            <span className="truncate">{getDisplayText()}</span>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
          <div className="max-h-[300px] overflow-y-auto p-2">
            {options.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer w-full"
                onClick={() => handleToggle(opt.value)}
              >
                <Checkbox
                  checked={selected.includes(opt.value)}
                  onCheckedChange={() => handleToggle(opt.value)}
                />
                <label className="flex-1 cursor-pointer text-sm w-full">
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
