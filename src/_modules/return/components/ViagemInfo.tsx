'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { ReturnInfoGeralRavex } from "@/_services/api/model";
import { Truck, User, Building, FileText } from "lucide-react";
import { Badge } from "@/_shared/_components/ui/badge";

interface ViagemInfoProps {
  infoViagem?: ReturnInfoGeralRavex;
  isLoading?: boolean;
}

export function ViagemInfo({ infoViagem, isLoading = false }: ViagemInfoProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Informações da Viagem</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">Carregando informações da viagem...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!infoViagem) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Informações da Viagem Ravex
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Placa do Veículo
              </p>
              <p className="text-base font-semibold text-foreground font-mono">
                {infoViagem.placa}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Motorista
              </p>
              <p className="text-base font-semibold text-foreground">
                {infoViagem.motorista}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Transportadora
              </p>
              <p className="text-base font-semibold text-foreground">
                {infoViagem.transportadora}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              ID Viagem: {infoViagem.idViagem}
            </Badge>
            <Badge variant="secondary">
              {infoViagem.notas.length} {infoViagem.notas.length === 1 ? 'nota fiscal' : 'notas fiscais'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
