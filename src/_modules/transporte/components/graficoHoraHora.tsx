'use client';

import { useState } from 'react';
import useCarregamentoHoraHora from "../hooks/useCarregamentoHoraHora";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/_shared/_components/ui/chart";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, LabelList, ReferenceLine, Cell } from 'recharts';
import { Loader2 } from "lucide-react";
import { SimpleSelect } from '@/_shared/_components/ui/SelectSimples';



const TIPO_EVENTO = [
  { label: 'Carregamento', value: 'TERMINO_CARREGAMENTO' },
  { label: 'Separacao', value: 'TERMINO_SEPARACAO' },
  { label: 'Conferencia', value: 'TERMINO_CONFERENCIA' },
];

export default function GraficoHoraHora() {
  const { carregamentoHoraHora, isLoading: isLoadingCarregamentoHoraHora, tipoEvento, setTipoEvento } = useCarregamentoHoraHora();
  
  const [metaHora, setMetaHora] = useState<number>(8);
  const meta = carregamentoHoraHora?.totalTransportes ?? 0;
  
  const horaHoraData = carregamentoHoraHora?.horaHora ?? [];
  
  const metaPorHora = meta > 0 ? Math.round(meta / metaHora) : 0;

  // Usa os dados diretamente do backend, na ordem que vêm
  const chartData = horaHoraData.reduce((acc, item, index) => {
    const valorAnterior = index > 0 ? acc[index - 1].acumulado : 0;
    const totalCarregados = Number(item.totalCarregados);
    const valorAcumuladoBruto = valorAnterior + totalCarregados;
    const valorAcumulado = meta > 0 ? Math.min(valorAcumuladoBruto, meta) : valorAcumuladoBruto;
    
    acc.push({
      hora: `${Number(item.hora).toString().padStart(2, '0')}:00`,
      horaAHora: totalCarregados,
      acumulado: valorAcumulado,
    });
    return acc;
  }, [] as Array<{ hora: string; horaAHora: number; acumulado: number }>);

  // Calcula o valor máximo para o eixo Y
  const maxValue = chartData.length > 0 
    ? Math.max(
        ...chartData.map(d => Math.max(d.horaAHora, d.acumulado)),
        meta,
        metaPorHora
      )
    : Math.max(meta, metaPorHora);

  const chartConfig = {
    horaAHora: {
      label: "Carregados por Hora",
    },
    acumulado: {
      label: "Total Acumulado",
    },
  };

  const handleMetaHoraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      return;
    }
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setMetaHora(numValue);
    }
  };

  const handleTipoEventoChange = (value: string) => {
    setTipoEvento(value);
  };

  if (isLoadingCarregamentoHoraHora) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <SimpleSelect
          placeholder="Selecione o tipo de evento"
          options={TIPO_EVENTO}
          value={tipoEvento}
          onChange={handleTipoEventoChange}
        />
      </div>
      <div className="flex items-center">
        <Label htmlFor="metaHora" className="text-sm font-medium whitespace-nowrap">
          Quantidade de Horas para Meta:
        </Label>
        <Input
          id="metaHora"
          type="number"
          min="1"
          value={metaHora}
          onChange={handleMetaHoraChange}
          className="w-24"
        />
      </div>
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis domain={[0, maxValue + 5]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <ReferenceLine 
            y={metaPorHora} 
            stroke="var(--primary)" 
            strokeDasharray="8 4" 
            strokeWidth={2}
            label={{ value: `Meta/Hora: ${metaPorHora}`, position: "insideTopLeft", fill: "var(--primary)", fontSize: 13, fontWeight: 700 }}
            ifOverflow="extendDomain"
          />
          <ReferenceLine 
            y={meta} 
            stroke="var(--destructive)" 
            strokeDasharray="8 4" 
            strokeWidth={2}
            label={{ value: `Meta Total: ${meta}`, position: "insideTopRight", fill: "var(--destructive)", fontSize: 12, fontWeight: 600 }}
            ifOverflow="extendDomain"
          />
          <Area 
            type="monotone" 
            dataKey="acumulado" 
            stroke="var(--muted)" 
            fill="var(--muted)"
            fillOpacity={0.25}
            strokeOpacity={0.7}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls={true}
            isAnimationActive={true}
          >
            <LabelList 
              dataKey="acumulado" 
              position="top" 
              style={{ 
                fill: "var(--muted)", 
                fontSize: '12px',
                fontWeight: 600
              }} 
            />
          </Area>
          <Bar 
            dataKey="horaAHora" 
            fill="var(--primary)"
            fillOpacity={0.75}
            stroke="var(--primary)"
            strokeWidth={1}
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => {
              const isBelowMeta = entry.horaAHora < metaPorHora;
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={isBelowMeta ? "var(--destructive)" : "var(--primary)"}
                  stroke={isBelowMeta ? "var(--destructive)" : "var(--primary)"}
                />
              );
            })}
            <LabelList 
              dataKey="horaAHora" 
              position="top" 
              style={{ 
                fill: 'var(--foreground)', 
                fontSize: '11px',
                fontWeight: 500
              }} 
            />
          </Bar>
        </ComposedChart>
      </ChartContainer>
    </div>
  );
}