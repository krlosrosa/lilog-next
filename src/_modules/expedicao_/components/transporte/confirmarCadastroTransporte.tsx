import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/_shared/_components/ui/popover";
import { Calendar } from "@/_shared/_components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type ConfirmarCadastroTransporteProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isAdding: boolean;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  handleAddTransportes: () => void;
}

export function ConfirmarCadastroTransporte({ open, setOpen, isAdding, selectedDate, setSelectedDate, handleAddTransportes }: ConfirmarCadastroTransporteProps) {
  return (
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
  )
}