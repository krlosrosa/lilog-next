'use client';

import { Badge } from '@/_shared/_components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_shared/_components/ui/popover';
import {
  Package,
  CheckSquare,
  Pause,
  Thermometer,
  UtensilsCrossed,
  Clock,
  Sun,
  Snowflake,
  Truck,
  Moon,
  GraduationCap,
  HelpCircle,
} from 'lucide-react';
import { useGetPausasAtivas } from '../hooks/queries/useGetPausasAtivas'; // Verifique o caminho
import React from 'react';
import { cn } from '@/lib/utils';
import {
  defaultMotivo,
  defaultProcesso,
  defaultSegmento,
  defaultTurno,
  formatarData,
  motivosMap,
  processosMap,
  segmentosMap,
  turnosMap,
} from '../consts/aux-pausaativa';

export default function IndicadorPausasGerais() {
  const { pausasAtivas, isBuscandoPausasAtivas } = useGetPausasAtivas();

  const count = pausasAtivas?.length || 0;

  // Não renderiza nada se estiver carregando ou se não houver pausas
  if (isBuscandoPausasAtivas || count === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="outline"
          className="flex cursor-pointer items-center gap-1.5 border-yellow-200 bg-yellow-100 px-3 py-1 font-medium text-yellow-800 transition-colors hover:bg-yellow-200 dark:border-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50"
        >
          <Pause className="h-3.5 w-3.5" />
          {/* [MODIFICADO] Usa a contagem dinâmica */}
          {count} Pausa{count > 1 ? 's' : ''} Gerais
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b pb-2">
            <Pause className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-sm font-semibold">Pausas Gerais Ativas</h3>
            <Badge variant="secondary" className="ml-auto text-xs">
              {/* [MODIFICADO] Usa a contagem dinâmica */}
              {count}
            </Badge>
          </div>

          {/* [MODIFICADO] Mapeia as pausas ativas e remove os mocks */}
          <div className="max-h-64 space-y-2 overflow-y-auto">
            {pausasAtivas &&
              pausasAtivas.map((pausa) => {
                // Busca os dados de layout dos mappers
                const procInfo = processosMap[pausa.processo] || {
                  ...defaultProcesso,
                  label: pausa.processo,
                };
                const turnoInfo = turnosMap[pausa.turno] || {
                  ...defaultTurno,
                  label: pausa.turno,
                };

                // O DTO do segmento é 'string'. O valor pode ser o ID ou o Rótulo.
                // Vamos assumir que é o ID (ex: "SECO")
                const segInfo = segmentosMap[pausa.segmento] || {
                  ...defaultSegmento,
                  label: pausa.segmento,
                };
                const motivoInfo = motivosMap[pausa.motivo] || {
                  ...defaultMotivo,
                  label: pausa.motivo,
                };

                const IconeProcesso = procInfo.icon;
                const IconeTurno = turnoInfo.icon;
                const IconeSegmento = segInfo.icon;
                const IconeMotivo = motivoInfo.icon;

                return (
                  <div
                    key={pausa.id}
                    className="bg-card space-y-2 rounded-lg border p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Badge
                        variant="outline"
                        // [MODIFICADO] Classe dinâmica
                        className={cn(
                          'flex shrink-0 items-center gap-1 text-xs',
                          procInfo.className,
                        )}
                      >
                        <IconeProcesso className="h-3 w-3" />
                        {/* [MODIFICADO] Label dinâmico */}
                        {procInfo.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-muted-foreground flex items-center gap-1.5">
                        <IconeTurno className="h-3 w-3" />
                        <span className="font-medium">Turno:</span>
                        {/* [MODIFICADO] Label dinâmico */}
                        <span>{turnoInfo.label}</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1.5">
                        <IconeSegmento className="h-3 w-3" />
                        <span className="font-medium">Segmento:</span>
                        {/* [MODIFICADO] Label dinâmico */}
                        <span>{segInfo.label}</span>
                      </div>
                    </div>

                    <div className="text-muted-foreground flex items-center gap-1.5 border-t pt-1 text-xs">
                      <IconeMotivo className="h-3 w-3" />
                      {/* [MODIFICADO] Label dinâmico */}
                      <span>{motivoInfo.label}</span>
                    </div>

                    <div className="text-muted-foreground pt-1 text-xs">
                      <span className="font-medium">Início:</span>{' '}
                      {/* [MODIFICADO] Data formatada */}
                      {formatarData(pausa.inicio)}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
