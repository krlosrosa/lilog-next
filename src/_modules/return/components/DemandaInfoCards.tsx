'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { GetDemandaByIdDevolucaoQueryResult } from "@/_services/api/service/devolucao/devolucao";
import { Truck, User, Building, Phone, Package, Warehouse } from "lucide-react";
import { Badge } from "@/_shared/_components/ui/badge";

interface DemandaInfoCardsProps {
  demanda?: GetDemandaByIdDevolucaoQueryResult;
}

export function DemandaInfoCards({ demanda }: DemandaInfoCardsProps) {
  if (!demanda) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card Dados da Demanda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados da Demanda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Truck className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Placa</p>
              <p className="text-sm font-semibold font-mono">{demanda.placa}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Motorista</p>
              <p className="text-sm font-semibold">{demanda.motorista}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Transportadora</p>
              <p className="text-sm font-semibold">{demanda.idTransportadora || '—'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Dados de Recebimento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados de Recebimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <Warehouse className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Doca</p>
              <p className="text-sm font-semibold">{demanda.doca || '—'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Package className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Quantidade de Paletes</p>
              <p className="text-sm font-semibold">{demanda.quantidadePaletes || 0}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Carga Segregada</p>
              <Badge variant={demanda.cargaSegregada ? "default" : "secondary"} className="mt-1">
                {demanda.cargaSegregada ? "Sim" : "Não"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
