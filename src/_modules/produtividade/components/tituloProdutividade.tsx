'use client';

import { Badge } from '@/_shared/_components/ui/badge';
import { Package, CheckSquare, Truck, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import IndicadorPausasGerais from './indicadorPausasGerais';
import { useProdutividadeFilter } from '../hooks/useProdutividadeFilter';

interface TituloProdutividadeProps {
  processo?: 'SEPARACAO' | 'CONFERENCIA' | 'CARREGAMENTO';
  data?: Date | string;
}

const processoConfig = {
  SEPARACAO: {
    label: 'Separação',
    icon: Package,
    color:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  CONFERENCIA: {
    label: 'Conferência',
    icon: CheckSquare,
    color:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
  },
  CARREGAMENTO: {
    label: 'Carregamento',
    icon: Truck,
    color:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  },
};

export default function TituloProdutividade() {
  const { filters } = useProdutividadeFilter();
  const config =
    processoConfig[
      filters.processo as 'SEPARACAO' | 'CONFERENCIA' | 'CARREGAMENTO'
    ];
  const Icon = config?.icon || null;
  const data = filters?.dataRegistro || '';

  const formatarData = (dataInput: Date | string) => {
    if (typeof dataInput === 'string') {
      return dataInput;
    }
    return format(dataInput, 'yyyy-MM-dd', { locale: ptBR });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard de Produtividade
        </h1>
        {filters.processo && (
          <Badge
            variant="outline"
            className={`${config.color} flex items-center gap-1.5 border px-3 py-1 font-medium`}
          >
            <Icon className="h-3.5 w-3.5" />
            {filters.processo}
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <p className="text-muted-foreground text-sm">
          Visão geral dos processos logísticos
        </p>
        {filters.dataRegistro && (
          <Badge
            variant="outline"
            className="bg-muted/50 text-muted-foreground border-border flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-xs"
          >
            <Calendar className="h-3 w-3" />
            {formatarData(data)}
          </Badge>
        )}
        <IndicadorPausasGerais />
      </div>
    </div>
  );
}
