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

type RankingFuncionariosProps = {
  topFuncionarios: ProdutividadeDiaDiaGetDataDtoTop5ProdutividadeItem[]
  tipo: 'melhores' | 'piores'
  titulo: string
  descricao: string
}

export default function RankingFuncionariosB5({ 
  topFuncionarios, 
  tipo, 
  titulo, 
  descricao 
}: RankingFuncionariosProps) {
  // Ordenar baseado no tipo
  const ranking = topFuncionarios
    .sort((a, b) => 
      tipo === 'melhores' 
        ? Number(b.produtividadeCaixaPorHora) - Number(a.produtividadeCaixaPorHora)
        : Number(a.produtividadeCaixaPorHora) - Number(b.produtividadeCaixaPorHora)
    )
    .slice(0, 5)

  // Função para formatar números
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      maximumFractionDigits: 1,
    }).format(num)
  }

  // Função para determinar as cores baseado no tipo e posição
  const getRankColor = (index: number) => {
    if (tipo === 'melhores') {
      switch (index) {
        case 0: return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case 1: return "bg-gray-100 text-gray-800 border-gray-200"
        case 2: return "bg-orange-100 text-orange-800 border-orange-200"
        default: return "bg-blue-50 text-blue-700 border-blue-200"
      }
    } else {
      switch (index) {
        case 0: return "bg-red-100 text-red-800 border-red-200"
        case 1: return "bg-red-50 text-red-700 border-red-200"
        case 2: return "bg-orange-100 text-orange-800 border-orange-200"
        default: return "bg-yellow-100 text-yellow-800 border-yellow-200"
      }
    }
  }

  const getBadgeColor = () => {
    return tipo === 'melhores' 
      ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
  }

  const getHeaderBadgeColor = () => {
    return tipo === 'melhores' 
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200"
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{titulo}</CardTitle>
            <CardDescription>{descricao}</CardDescription>
          </div>
          <Badge variant="secondary" className={`text-xs ${getHeaderBadgeColor()}`}>
            {ranking.length} colaboradores
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {ranking.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            Nenhum dado disponível
          </div>
        ) : (
          ranking.map((funcionario, index) => (
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
                      {funcionario.tempoTotal?.toString() || '0'}h
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge variant="default" className={`text-xs ${getBadgeColor()}`}>
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