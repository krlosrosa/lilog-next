'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { Skeleton } from "@/_shared/_components/ui/skeleton";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";
import { useDashboardProdutividade } from "../../hooks/useDashboardProdutividade";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ProdutividadeDiaDiaGetDataDtoProdutividadeItem } from "@/_services/api/model";

type GraficoDiaDiaProps = {
  produtividadeDiaDia: ProdutividadeDiaDiaGetDataDtoProdutividadeItem[];
  isBuscandoDashDiaDia: boolean;
}


export default function GraficoDiaDia({ produtividadeDiaDia, isBuscandoDashDiaDia }: GraficoDiaDiaProps) {

  const converterParaNumero = (valor: string | null): number => {
    if (valor === null || valor === '') return 0;
    const num = Number(valor);
    return isNaN(num) ? 0 : num;
  };

  // Formatar dados para o Recharts
  const dadosGrafico = produtividadeDiaDia?.map(item => {
    const dataFormatada = item.data !== null && item.data !== undefined 
      ? new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
      : 'N/A';
    
    return {
      data: item.data,
      dataFormatada,
      produtividade: converterParaNumero(item.produtividadeCaixaPorHora),
      centerid: item.centerid
    };
  }) || [];

  const formatarData = (data: string | null) => {
    if (!data) return 'N/A';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarProdutividade = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Tooltip customizado
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Data: ${formatarData(label)}`}</p>
          <p className="text-blue-600">
            {`Produtividade: ${formatarProdutividade(payload[0].value)} caixas/hora`}
          </p>
          <p className="text-sm text-gray-600">
            {`Centro: ${payload[0].payload.centerid}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calcular métricas do período
  const calcularMetricas = () => {
    if (dadosGrafico.length === 0) return null;

    const produtividades = dadosGrafico.map(item => item.produtividade);
    const media = produtividades.reduce((acc, curr) => acc + curr, 0) / produtividades.length;
    const melhorDia = Math.max(...produtividades);
    const piorDia = Math.min(...produtividades);

    return { media, melhorDia, piorDia };
  };

  const metricas = calcularMetricas();

  return (
    <div className="space-y-6">

      {/* Resumo do Período */}
      {metricas && (
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">
                  {formatarProdutividade(metricas.media)}
                </div>
                <div className="text-sm text-muted-foreground">Média Caixa/Hora</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">
                  {formatarProdutividade(metricas.melhorDia)}
                </div>
                <div className="text-sm text-muted-foreground">Melhor Dia</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border">
                <div className="text-2xl font-bold text-red-600">
                  {formatarProdutividade(metricas.piorDia)}
                </div>
                <div className="text-sm text-muted-foreground">Pior Dia</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gráfico de Linhas */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Produtividade</CardTitle>
          <CardDescription>
            Tendência da produtividade (caixas/hora) ao longo do período selecionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isBuscandoDashDiaDia ? (
            <div className="h-80 flex items-center justify-center">
              <div className="space-y-4 w-full max-w-md">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </div>
          ) : dadosGrafico.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dadosGrafico}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="dataFormatada"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => formatarProdutividade(value)}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="produtividade" 
                    name="Produtividade (caixas/hora)"
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#1d4ed8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              Nenhum dado disponível para o período selecionado.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabela de Dados Detalhados */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Detalhados</CardTitle>
          <CardDescription>
            Produtividade dia a dia - Período selecionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isBuscandoDashDiaDia ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </div>
          ) : dadosGrafico.length > 0 ? (
            <div className="space-y-3">
              {dadosGrafico.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium">{formatarData(item.data)}</div>
                    <div className="text-sm text-muted-foreground">
                      Centro: {item.centerid}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${
                      item.produtividade >= 100 ? "text-green-600" :
                      item.produtividade >= 80 ? "text-blue-600" :
                      item.produtividade >= 60 ? "text-yellow-600" : "text-red-600"
                    }`}>
                      {formatarProdutividade(item.produtividade)}
                    </div>
                    <div className="text-xs text-muted-foreground">caixas/hora</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum dado encontrado para o período selecionado.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}