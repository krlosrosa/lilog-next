'use client';

import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/_shared/_components/ui/button';
import { Calendar } from '@/_shared/_components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/_components/ui/popover';
import { Label } from '@/_shared/_components/ui/label';
import { ptBR } from 'date-fns/locale';

interface DateRangePickerProps {
  dataInicio: string;
  dataFim: string;
  setDataInicio: (v: string) => void;
  setDataFim: (v: string) => void;
  className?: string;
}

export function DateRangePicker({
  dataInicio,
  dataFim,
  setDataInicio,
  setDataFim,
  className,
}: DateRangePickerProps) {
  const [openInicio, setOpenInicio] = React.useState(false);
  const [openFim, setOpenFim] = React.useState(false);

  const dateInicio = dataInicio ? parseISO(dataInicio) : undefined;
  const dateFim = dataFim ? parseISO(dataFim) : undefined;

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      <div className="space-y-2">
        <Label>Data Início</Label>
        <Popover open={openInicio} onOpenChange={setOpenInicio}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !dateInicio && 'text-muted-foreground'
              )}
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateInicio ? format(dateInicio, 'PPP', { locale: ptBR }) : 'Selecione'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateInicio}
              onSelect={(d) => {
                if (d) setDataInicio(format(d, 'yyyy-MM-dd'));
                setOpenInicio(false);
              }}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label>Data Fim</Label>
        <Popover open={openFim} onOpenChange={setOpenFim}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !dateFim && 'text-muted-foreground'
              )}
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFim ? format(dateFim, 'PPP', { locale: ptBR }) : 'Selecione'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFim}
              onSelect={(d) => {
                if (d) setDataFim(format(d, 'yyyy-MM-dd'));
                setOpenFim(false);
              }}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
