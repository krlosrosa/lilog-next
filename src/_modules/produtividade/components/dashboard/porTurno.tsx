"use client"
import { ProdutividadeDiaDiaGetDataDtoProdutividadeProcessoItem } from "@/_services/api/model";
import { Duration } from "luxon";


import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

function parseToHours(time: string): number {

if(!time || time === "00:00:00" || time === "") return 0;
  // Quebra em parte principal e milissegundos
  const [hms, ms] = time.split(".");
  const [hours, minutes, seconds] = hms.split(":").map(Number);
  const millis = ms ? parseInt(ms, 10) : 0;

  if(isNaN(hours) || isNaN(minutes) || isNaN(seconds) || isNaN(millis)) return 0;

  // Cria uma Duration com Luxon
  const duration = Duration.fromObject({
    hours,
    minutes,
    seconds,
    milliseconds: millis,
  });

  // Retorna em horas decimais
  return duration.as("hours");
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/_shared/_components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/_shared/_components/ui/chart"

type PorTurnoProps = {
  porTurnoEProcesso: ProdutividadeDiaDiaGetDataDtoProdutividadeProcessoItem[];
}

const chartConfig = {
  caixas: {
    label: "Caixas",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

const chartData = [
  { turno: "MANHA", caixas: 186 },
  { turno: "TARDE", caixas: 305 },
  { turno: "NOITE", caixas: 237 },
  { turno: "INTERMEDIARIO", caixas: 73 },
]

export default function PorTurno({ porTurnoEProcesso }: PorTurnoProps) {

  const reducedData = porTurnoEProcesso.reduce((acc, item) => {
    if (item.turno) {
      // inicializa se não existir
      if (!acc[item.turno]) {
        acc[item.turno] = { caixas: 0, tempoTrabalhado: 0 };
      }
  
      acc[item.turno].caixas += item.totalCaixas || 0;
      acc[item.turno].tempoTrabalhado += parseToHours(item.tempoTrabalhado as string) || 0;
    }
    return acc;
  }, {} as Record<string, any>);
  
  const chartData = Object.entries(reducedData).map(([turno, valores]) => ({
    turno,
    caixas: valores.caixas,
    tempoTrabalhado: valores.tempoTrabalhado,
    produtividade: valores.caixas / (valores.tempoTrabalhado || 1),
  }));


  const reducedDataProcesso = porTurnoEProcesso.reduce((acc, item) => {
    if (item.processo) {
      // inicializa se não existir
      if (!acc[item.processo]) {
        acc[item.processo] = { caixas: 0, tempoTrabalhado: 0 };
      }
  
      acc[item.processo].caixas += item.totalCaixas || 0;
      acc[item.processo].tempoTrabalhado += parseToHours(item.tempoTrabalhado as string) || 0;
    }
    return acc;
  }, {} as Record<string, any>);
  
  const chartDataProcesso = Object.entries(reducedDataProcesso).map(([processo, valores]) => ({
    processo,
    caixas: valores.caixas,
    tempoTrabalhado: valores.tempoTrabalhado,
    produtividade: valores.caixas / (valores.tempoTrabalhado || 1),
  }));
  
  

  return (
    <div>
          <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Radar Chart - Multiple</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <pre>{JSON.stringify(chartDataProcesso, null, 2)}</pre>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="turno" />
            <PolarGrid />
            <Radar
              dataKey="produtividade"
              fill="var(--chart-1)"
              fillOpacity={0.6}
            />
            <Radar dataKey="mobile" fill="var(--color-mobile)" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
    </div>
  )
}