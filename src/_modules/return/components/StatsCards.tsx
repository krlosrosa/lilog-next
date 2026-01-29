'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { ListarDemandasDto } from "@/_services/api/model";
import { Loader2 } from "lucide-react";

interface StatsCardsProps {
  demandas: ListarDemandasDto[] | undefined;
  isLoading: boolean;
}

export function StatsCards({ demandas, isLoading }: StatsCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Carregando...
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  const demandasArray = demandas ?? [];

  // Calcular estatísticas baseadas no status
  const abertas = demandasArray.filter(
    (d) => d.status === 'AGUARDANDO_LIBERACAO' || d.status === 'AGUARDANDO_CONFERENCIA'
  ).length;

  const emConferencia = demandasArray.filter(
    (d) => d.status === 'EM_CONFERENCIA'
  ).length;

  const finalizadas = demandasArray.filter(
    (d) => d.status === 'CONFERENCIA_FINALIZADA' || d.status === 'FINALIZADO'
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Demandas Abertas</CardTitle>
          <CardDescription>
            Aguardando liberação ou conferência
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{abertas}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Em Conferência</CardTitle>
          <CardDescription>
            Demandas em processo de conferência
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{emConferencia}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Finalizadas</CardTitle>
          <CardDescription>
            Conferência finalizada ou concluída
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{finalizadas}</div>
        </CardContent>
      </Card>
    </div>
  );
}
