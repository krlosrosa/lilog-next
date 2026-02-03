'use client';

import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import {
  Truck,
  User,
  Building,
  Phone,
  Package,
  Warehouse,
  Hash,
  Calendar,
} from "lucide-react";
import { GetDemandaByIdDevolucaoQueryResult } from "@/_services/api/service/devolucao/devolucao";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatarDataUTC } from "@/_shared/utils/convertHourUtc";

interface DemandaHeaderProps {
  demanda?: GetDemandaByIdDevolucaoQueryResult;
}

export function DemandaHeader({ demanda }: DemandaHeaderProps) {
  if (!demanda) return null;

  const getStatusVariant = (status?: string) => {
    if (!status) return "secondary";
    const statusLower = status.toLowerCase();
    if (statusLower.includes("finalizado") || statusLower.includes("concluido")) return "default";
    if (statusLower.includes("em_conferencia")) return "default";
    if (statusLower.includes("aguardando")) return "outline";
    if (statusLower.includes("cancelado")) return "destructive";
    return "secondary";
  };

  const getStatusLabel = (status?: string) => {
    if (!status) return "Sem status";
    return status
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "—";
    try {
      return format(new Date(formatarDataUTC(dateString)), "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="border p-2 shadow-lg">
      <CardContent className="p-2">
        {/* Header com ID e Status */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Hash className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Demanda #{demanda.id}</h1>
              <Badge
                variant={getStatusVariant(demanda.status)}
                className="mt-2 text-sm"
              >
                {getStatusLabel(demanda.status)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Grid de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Informações do Veículo */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Informações do Veículo
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Placa</p>
                  <p className="text-sm font-semibold font-mono">{demanda.placa}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Motorista</p>
                  <p className="text-sm font-semibold">{demanda.motorista}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">ConferenteId</p>
                  <p className="text-sm font-semibold">{demanda.conferenteId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Transportadora</p>
                  <p className="text-sm font-semibold">{demanda.idTransportadora || "—"}</p>
                </div>
              </div>
              {demanda.telefone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telefone</p>
                    <p className="text-sm font-semibold">{demanda.telefone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informações do Armazém */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Informações do Armazém
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Warehouse className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Doca</p>
                  <p className="text-sm font-semibold">{demanda.doca || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Quantidade de Paletes</p>
                  <p className="text-sm font-semibold">{demanda.quantidadePaletes || 0}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={demanda.cargaSegregada ? "default" : "secondary"}>
                  Carga Segregada: {demanda.cargaSegregada ? "Sim" : "Não"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Informações de Data */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Datas
            </h3>
            <div className="space-y-2">
              {demanda.criadoEm && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Criado em</p>
                    <p className="text-sm font-semibold">{formatDate(demanda.criadoEm)}</p>
                  </div>
                </div>
              )}
              {demanda.liberadoParaConferenciaEm && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Liberado para conferência</p>
                    <p className="text-sm font-semibold">{formatDate(demanda.liberadoParaConferenciaEm)}</p>
                  </div>
                </div>
              )}
              {demanda.finalizadoEm && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Finalizado em</p>
                    <p className="text-sm font-semibold">{formatDate(demanda.finalizadoEm)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
