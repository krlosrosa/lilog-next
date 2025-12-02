import { Button } from "@/_shared/_components/ui/button";
import { Calendar } from "@/_shared/_components/ui/calendar";
import { Dialog, DialogContent, DialogFooter } from "@/_shared/_components/ui/dialog";
import { Label } from "@/_shared/_components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/_shared/_components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";


const parseDateString = (dateString: string): Date | undefined => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return undefined;
  return new Date(year, month - 1, day);
};

type ModalConfirmacaoTrocarDataExpedicaoProps = {
  dataExpedicao: string;
  setDataExpedicao: (dataExpedicao: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}


export default function ModalConfirmacaoTrocarDataExpedicao({ open, setOpen, onConfirm, dataExpedicao, setDataExpedicao }: ModalConfirmacaoTrocarDataExpedicaoProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="space-y-2">
          <Label className="font-medium">Data do Processo</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal transition-all duration-200',
                  !dataExpedicao && 'text-muted-foreground',
                  dataExpedicao && 'border-primary/50',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dataExpedicao
                  ? format(dataExpedicao, 'dd/MM/yyyy', { locale: ptBR })
                  : 'Selecione uma data'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={parseDateString(dataExpedicao)}
                onSelect={(date) => setDataExpedicao(date?.toISOString() ?? '')}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}