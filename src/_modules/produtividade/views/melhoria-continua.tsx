'use client';

import * as React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/_shared/_components/ui/button';
import { Calendar } from '@/_shared/_components/ui/calendar';
import { Label } from '@/_shared/_components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/_components/ui/popover';
import { cn } from '@/lib/utils';
import { useMelhoriaContinua } from '../hooks/melhoria-continua';

export default function MelhoriaContinua() {

  const {
    dataInicio,
    setDataInicio,
    dataFim, 
    setDataFim, 
    openInicio, 
    setOpenInicio, 
    openFim, 
    setOpenFim, 
    handleGerarExcel,
    isLoadingProdutividadeMelhoriaContinua } = useMelhoriaContinua();


  const dateInicio = dataInicio ? parseISO(dataInicio) : undefined;
  const dateFim = dataFim ? parseISO(dataFim) : undefined;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Melhoria Continua</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <div className="space-y-2">
          <Label>Data início</Label>
          <Popover open={openInicio} onOpenChange={setOpenInicio}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                type="button"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dateInicio && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateInicio
                  ? format(dateInicio, 'PPP', { locale: ptBR })
                  : 'Selecione a data'}
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
          <Label>Data fim</Label>
          <Popover open={openFim} onOpenChange={setOpenFim}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                type="button"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dateFim && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFim
                  ? format(dateFim, 'PPP', { locale: ptBR })
                  : 'Selecione a data'}
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
      <Button disabled={isLoadingProdutividadeMelhoriaContinua || !dataInicio || !dataFim} onClick={handleGerarExcel}>Gerar Excel</Button>
    </div>
  );
}