'use client';

import { useState, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/_shared/_components/ui/dialog';
import { Button } from '@/_shared/_components/ui/button';
import { DateRangePicker } from './DateRangePicker';
import { Download, Loader2 } from 'lucide-react';

export interface ParametroRelatorio {
  type: 'dateRange' | 'select' | 'input' | 'custom';
  label: string;
  required?: boolean;
  component?: ReactNode;
}

interface ModalParametrosRelatorioProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  parametros?: ParametroRelatorio[];
  onConfirm: (params: { dataInicio: string; dataFim: string; [key: string]: unknown }) => Promise<void>;
  isLoading?: boolean;
}

export function ModalParametrosRelatorio({
  open,
  onOpenChange,
  title,
  description,
  parametros = [],
  onConfirm,
  isLoading = false,
}: ModalParametrosRelatorioProps) {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [customParams, setCustomParams] = useState<Record<string, unknown>>({});

  const handleConfirm = async () => {
    if (!dataInicio || !dataFim) return;
    try {
      await onConfirm({ dataInicio, dataFim, ...customParams });
      setDataInicio('');
      setDataFim('');
      setCustomParams({});
      onOpenChange(false);
    } catch {
      // Mantém o modal aberto para o usuário tentar novamente
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      setDataInicio('');
      setDataFim('');
      setCustomParams({});
      onOpenChange(false);
    }
  };

  const isValid = !!dataInicio && !!dataFim;

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <DateRangePicker
            dataInicio={dataInicio}
            dataFim={dataFim}
            setDataInicio={setDataInicio}
            setDataFim={setDataFim}
          />
          {parametros.map((p) => p.component)}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!isValid || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Baixar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
