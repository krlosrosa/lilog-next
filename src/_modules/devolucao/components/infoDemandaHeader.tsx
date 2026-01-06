import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import {
  Truck,
  User,
  Building,
  Phone,
  Package,
  Palette,
  DoorOpen,
  Hash
} from "lucide-react";
import { GetDemandaByIdDevolucaoQueryResult } from "@/_services/api/service/devolucao/devolucao";
import { Button } from "@/_shared/_components/ui/button";
import ModalLiberarDemanda from "./modalLiberarDemanda";
import ModalDeletarDemanda from "./modalDeletarDemanda";
import ModalReabrirDemanda from "./modalReabrirDemanda";
import ModalFinalizarDemanda from "./modalFinalizarDemanda";

interface InfoDemandaHeaderProps {
  demanda?: GetDemandaByIdDevolucaoQueryResult
}

export default function InfoDemandaHeader({ demanda }: InfoDemandaHeaderProps) {
  const InfoItem = ({
    icon: Icon,
    label,
    value,
    isBadge = false
  }: {
    icon: React.ElementType;
    label: string;
    value: any;
    isBadge?: boolean;
  }) => (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <span className="text-xs text-muted-foreground">{label}:</span>
      {isBadge ? (
        <Badge variant={value ? "default" : "secondary"} className="h-5 text-xs px-2">
          {value ? "Sim" : "Não"}
        </Badge>
      ) : (
        <span className="text-xs font-semibold truncate">
          {value || "—"}
        </span>
      )}
    </div>
  );

  const getStatusVariant = (status?: string) => {
    if (!status) return "secondary";
    const statusLower = status.toLowerCase();
    if (statusLower.includes("concluido") || statusLower.includes("aprovado")) return "default";
    if (statusLower.includes("pendente") || statusLower.includes("aguardando")) return "outline";
    if (statusLower.includes("cancelado") || statusLower.includes("rejeitado")) return "destructive";
    return "secondary";
  };

  return (
    <Card className="w-full p-0 border-border/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex w-full items-center gap-2.5">
            <div className="rounded-lg bg-primary/10 p-2">
              <Hash className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold">Demanda #{demanda?.id || "N/A"}</h1>
                <Badge
                  variant={getStatusVariant(demanda?.status)}
                  className="h-5 text-xs font-medium capitalize mt-1"
                >
                  {demanda?.status ? demanda.status.replace(/_/g, " ").toLowerCase() : "Sem status"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <ModalFinalizarDemanda id={demanda?.id?.toString() || ""} />
                <ModalLiberarDemanda demandaId={demanda?.id?.toString() || ""} />
                <ModalDeletarDemanda id={demanda?.id?.toString() || ""} />
                <ModalReabrirDemanda id={demanda?.id?.toString() || ""} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-x-4">
            <InfoItem icon={Truck} label="Placa" value={demanda?.placa} />
            <InfoItem icon={User} label="Motorista" value={demanda?.motorista} />
            <InfoItem icon={Building} label="Transportadora" value={demanda?.idTransportadora} />
            <InfoItem icon={Phone} label="Telefone" value={demanda?.telefone} />
          </div>
          <div className="grid grid-cols-4 gap-x-4">
            <InfoItem icon={Package} label="Carga Segregada" value={demanda?.cargaSegregada} isBadge />
            <InfoItem icon={Palette} label="Paletes" value={demanda?.quantidadePaletes} />
            <InfoItem icon={DoorOpen} label="Doca" value={demanda?.doca} />
            <div></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}