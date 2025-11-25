'use client';
import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { CreateTransporteDto } from '@/_services/api/model';
import { useTransporteOperations } from '../hooks/useTransporteOperations';
import { useShipments } from '../others/providers/shipments.provider';
import { Button } from '@/_shared/_components/ui/button';
import { useUser } from '@/_shared/providers/UserContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { Calendar } from '@/_shared/_components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/_components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { gerarItensTransporteCorte } from '../services/itens-transporte-corte';

export function AddTransportes({
  transportesFaltantes,
}: {
  transportesFaltantes: string[];
}) {
  const { operations, isAdding } = useTransporteOperations();
  const { validationSuccess } = useShipments();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const handleAddTransportes = async () => {
    if (!selectedDate) return;

    const arrayInput: CreateTransporteDto[] = [];
    for (const transporte of transportesFaltantes) {
      const findroute = validationSuccess?.data.routes.find(
        (route) => route.transportId === transporte,
      );
      const findShipment = validationSuccess?.data.shipments.find(
        (shipment) => shipment.transportId === transporte,
      );
      arrayInput.push({
        numeroTransporte:
          findroute?.transportId || findShipment?.transportId || '',
        status: 'AGUARDANDO_SEPARACAO',
        nomeRota: findroute?.rota || '',
        nomeTransportadora: findroute?.transportadora || '',
        placa: findroute?.placa || findShipment?.placa || '',
        dataExpedicao: selectedDate.toISOString(),
        centerId: user?.centerSelect || '',
        obs: null,
        prioridade: 1,
        carregamento: 'NAO_INICIADO',
        conferencia: 'NAO_INICIADO',
        separacao: 'NAO_INICIADO',
        cargaParada: false,
      });
    }
    operations.adicionarTransportes({
      data: arrayInput,
    });

    if (validationSuccess) {
      const itensReduzidos = await gerarItensTransporteCorte(
        validationSuccess,
        transportesFaltantes,
      );
      operations.adicionarItensAoTransporte({
        data: itensReduzidos,
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={isAdding}>
            {isAdding ? 'Adicionando Transportes...' : 'Adicionar Transportes'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecione a Data de Expedição</DialogTitle>
            <DialogDescription>
              Escolha a data para os transportes que serão adicionados.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, 'PPP', { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddTransportes}
              disabled={!selectedDate || isAdding}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
