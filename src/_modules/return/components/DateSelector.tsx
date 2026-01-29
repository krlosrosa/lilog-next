'use client';

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/_shared/_components/ui/button";
import { Calendar } from "@/_shared/_components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/_shared/_components/ui/popover";
import { ptBR } from "date-fns/locale";

interface DateSelectorProps {
  data: string; // Data no formato ISO (YYYY-MM-DD)
  setData: (data: string) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function DateSelector({ 
  data, 
  setData, 
  label = "Selecionar Data",
  className,
  disabled = false,
}: DateSelectorProps) {
  const [open, setOpen] = React.useState(false);
  
  const dateValue = data ? parseISO(data) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setData(format(date, "yyyy-MM-dd"));
    } else {
      setData("");
    }
    setOpen(false);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none">
          {label}
        </label>
      )}
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateValue && "text-muted-foreground"
            )}
            disabled={disabled}
            type="button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateValue ? (
              format(dateValue, "PPP", { locale: ptBR })
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleSelect}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
