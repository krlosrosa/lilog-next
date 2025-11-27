"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card'
import { Badge } from '@/_shared/_components/ui/badge'
import { ProdutividadeDiaDiaGetDataDtoTop5ProdutividadeItem } from '@/_services/api/model'

type TopFuncionariosProps = {
  topFuncionarios: ProdutividadeDiaDiaGetDataDtoTop5ProdutividadeItem[]
}

export default function TopFuncionarios({ topFuncionarios }: TopFuncionariosProps) {
  // Ordenar por produtividade (maior primeiro) e pegar top 5
  const top5 = topFuncionarios
    .sort((a, b) => Number(b.produtividadeCaixaPorHora) - Number(a.produtividadeCaixaPorHora))
    .slice(0, 5)

  // Função para formatar números
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: 1,
    }).format(num)
  }

  // Função para determinar a cor do badge baseado na posição
  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case 1: return "bg-gray-100 text-gray-800 border-gray-200"
      case 2: return "bg-orange-100 text-orange-800 border-orange-200"
      default: return "bg-blue-50 text-blue-700 border-blue-200"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">Top 5 Funcionários</CardTitle>
            <CardDescription>
              Maior produtividade (CX/H)
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {top5.length} colaboradores
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {top5.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            Nenhum dado disponível
          </div>
        ) : (
          top5.map((funcionario, index) => (
            <div
              key={funcionario.funcionarioid}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`shrink w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border ${getRankColor(index)}`}>
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {funcionario.funcionarionome}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {funcionario.totalDemandas} demandas
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {funcionario.tempoTotal?.toString() || '0'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 text-xs">
                  {formatNumber(Number(funcionario.produtividadeCaixaPorHora))} CX/H
                </Badge>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{funcionario.totalCaixas} caixas</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}