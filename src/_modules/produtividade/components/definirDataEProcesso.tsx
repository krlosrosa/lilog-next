'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { Button } from '@/_shared/_components/ui/button';
import { Label } from '@/_shared/_components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/_components/ui/popover';
import { Calendar } from '@/_shared/_components/ui/calendar';
import {
  CalendarIcon,
  Package,
  CheckSquare,
  Truck,
  Settings,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useProdutividadeFilter } from '../hooks/useProdutividadeFilter';

const parseDateString = (dateString: string): Date | undefined => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return undefined;
  return new Date(year, month - 1, day);
};

const processos = [
  {
    value: 'SEPARACAO',
    label: 'Separação',
    icon: Package,
    description: 'Processo de separação de itens',
  },
  {
    value: 'CONFERENCIA',
    label: 'Conferência',
    icon: CheckSquare,
    description: 'Processo de conferência de produtos',
  },
  {
    value: 'CARREGAMENTO',
    label: 'Carregamento',
    icon: Truck,
    description: 'Processo de carregamento de veículos',
  },
] as const;

export default function DefinirDataEProcesso() {
  const { filters, setFilter, setFilters } = useProdutividadeFilter();
  const [open, setOpen] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<string>(
    filters.processo || '',
  );
  const [date, setDate] = useState<Date | undefined>(
    filters.dataRegistro ? parseDateString(filters.dataRegistro) : undefined,
  );

  useEffect(() => {
    if (filters.dataRegistro) {
      const parsedDate = parseDateString(filters.dataRegistro);
      if (parsedDate) {
        setDate(parsedDate);
      }
    } else {
      setDate(undefined);
    }
  }, [filters.dataRegistro]);

  useEffect(() => {
    if (filters.processo) {
      setSelectedProcess(filters.processo);
    }
  }, [filters.processo]);

  const handleConfirm = () => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      setFilters({
        dataRegistro: dateString,
        processo: selectedProcess,
      });
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setDate(undefined);
    setFilter('processo', '');
    setFilter('dataRegistro', '');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-md">
              <Settings className="text-primary h-4 w-4" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Definir Data e Processo
            </DialogTitle>
          </div>
          <DialogDescription>
            Selecione a data e o processo que deseja visualizar.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="font-medium">Data do Processo</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal transition-all duration-200',
                    !date && 'text-muted-foreground',
                    date && 'border-primary/50',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? format(date, 'dd/MM/yyyy', { locale: ptBR })
                    : 'Selecione uma data'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="font-medium">Processo</Label>
            <div className="grid grid-cols-3 gap-2">
              {processos.map((processo) => {
                const Icon = processo.icon;
                const isSelected = selectedProcess === processo.value;
                return (
                  <button
                    key={processo.value}
                    type="button"
                    onClick={() => setSelectedProcess(processo.value)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all duration-200',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-sm'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200',
                        isSelected
                          ? 'bg-primary text-primary-foreground scale-105 shadow-sm'
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      <Icon className="h-5 w-5 transition-transform duration-200" />
                    </div>
                    <p
                      className={cn(
                        'text-center text-xs font-medium transition-colors duration-200',
                        isSelected ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {processo.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!date || !selectedProcess}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
