import { ProdutividadeDiaDiaGetDataDtoTop5ProdutividadeItem } from "@/_services/api/model";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import { Trophy, Clock, Package, MapPin, Target } from "lucide-react";

type Top5MelhoresProps = {
  top5ProdutividadeDiaDia: ProdutividadeDiaDiaGetDataDtoTop5ProdutividadeItem[];
}

export default function Top5Melhores({ top5ProdutividadeDiaDia }: Top5MelhoresProps) {
  const formatarNumero = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatarTempo = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return `${horas}h${mins > 0 ? ` ${mins}m` : ''}`;
  };

  const getCorPosicao = (posicao: number) => {
    switch (posicao) {
      case 1: return "text-yellow-500";
      case 2: return "text-gray-400";
      case 3: return "text-amber-700";
      default: return "text-blue-600";
    }
  };

  const getBgPosicao = (posicao: number) => {
    switch (posicao) {
      case 1: return "bg-yellow-50 border-yellow-200";
      case 2: return "bg-gray-50 border-gray-200";
      case 3: return "bg-amber-50 border-amber-200";
      default: return "bg-blue-50 border-blue-200";
    }
  };

  const getIconePosicao = (posicao: number) => {
    switch (posicao) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-amber-700" />;
      default: return <Target className="h-4 w-4 text-blue-500" />;
    }
  };

  if (!top5ProdutividadeDiaDia || top5ProdutividadeDiaDia.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top 5 Melhores Desempenhos
          </CardTitle>
          <CardDescription>
            Colaboradores com maior produtividade no período
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Nenhum dado disponível para o período selecionado.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top 5 Melhores Desempenhos
        </CardTitle>
        <CardDescription>
          Colaboradores com maior produtividade no período
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {top5ProdutividadeDiaDia.map((colaborador, index) => (
            <div
              key={colaborador.funcionarioid}
              className={`p-4 border rounded-lg ${getBgPosicao(index + 1)} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getBgPosicao(index + 1)} border`}>
                    <span className={`text-sm font-bold ${getCorPosicao(index + 1)}`}>
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg truncate">
                        {colaborador.funcionarionome}
                      </h3>
                      {index < 3 && getIconePosicao(index + 1)}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{colaborador.totalCaixas}</span>
                        <span className="text-muted-foreground">caixas</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{colaborador.totalDemandas}</span>
                        <span className="text-muted-foreground">demandas</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">{colaborador.totalEnderecosVisitados}</span>
                        <span className="text-muted-foreground">endereços</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">{formatarTempo(Number(colaborador.tempoTrabalhado))}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <Badge 
                    variant="secondary" 
                    className={`text-lg font-bold ${
                      colaborador.produtividadeCaixaPorHora && Number(colaborador.produtividadeCaixaPorHora) >= 100 ? "bg-green-100 text-green-800" :
                      colaborador.produtividadeCaixaPorHora && Number(colaborador.produtividadeCaixaPorHora) >= 80 ? "bg-blue-100 text-blue-800" :
                      colaborador.produtividadeCaixaPorHora && Number(colaborador.produtividadeCaixaPorHora) >= 60 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}
                  >
                    {formatarNumero(Number(colaborador.produtividadeCaixaPorHora))}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">caixas/hora</div>
                  
                  <div className="mt-2 text-sm">
                    <div className="text-muted-foreground">
                      {formatarNumero(Number(colaborador.mediaEnderecosPorDemanda))} end/demanda
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Barra de progresso visual */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Eficiência</span>
                  <span>{formatarNumero(Number(colaborador.produtividadeCaixaPorHora))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      colaborador.produtividadeCaixaPorHora && Number(colaborador.produtividadeCaixaPorHora) >= 100 ? "bg-green-500" :
                      colaborador.produtividadeCaixaPorHora && Number(colaborador.produtividadeCaixaPorHora) >= 80 ? "bg-blue-500" :
                      colaborador.produtividadeCaixaPorHora && Number(colaborador.produtividadeCaixaPorHora) >= 60 ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}
                    style={{ 
                      width: `${Math.min(Number(colaborador.produtividadeCaixaPorHora), 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Resumo estatístico */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {formatarNumero(Number(top5ProdutividadeDiaDia[0]?.produtividadeCaixaPorHora || 0))}
              </div>
              <div className="text-xs text-muted-foreground">Melhor</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {formatarNumero(
                  top5ProdutividadeDiaDia.reduce((acc, curr) => acc + Number(curr.produtividadeCaixaPorHora), 0) / 
                  top5ProdutividadeDiaDia.length
                )}
              </div>
              <div className="text-xs text-muted-foreground">Média Top 5</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {formatarNumero(
                  top5ProdutividadeDiaDia.reduce((acc, curr) => acc + Number(curr.totalCaixas), 0)
                )}
              </div>
              <div className="text-xs text-muted-foreground">Total Caixas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {formatarTempo(
                  top5ProdutividadeDiaDia.reduce((acc, curr) => acc + Number(curr.tempoTrabalhado), 0)
                )}
              </div>
              <div className="text-xs text-muted-foreground">Tempo Total</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}