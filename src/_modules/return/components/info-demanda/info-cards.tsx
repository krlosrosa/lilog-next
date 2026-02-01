import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { Truck, ClipboardCheck, Users, Thermometer, MapPin } from "lucide-react";

interface TransporteInfo {
  placa: string;
  transportadora: string;
  motorista: string;
  viagemId: string;
  transporte: string;
}

interface ConferenciaInfo {
  cargaSegregada: boolean;
  doca: string;
  tempBau: string;
  tempProduto: string;
}

interface ResponsaveisInfo {
  cadastradoPor: string;
  conferidoPor: string;
}

interface InfoCardsProps {
  transporte: TransporteInfo;
  conferencia: ConferenciaInfo;
  responsaveis: ResponsaveisInfo;
}

export function InfoCards({ transporte, conferencia, responsaveis }: InfoCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Card Transporte */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Truck className="h-5 w-5 text-primary" />
            Transporte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow label="Placa" value={transporte.placa} />
          <InfoRow label="Transportadora" value={transporte.transportadora} />
          <InfoRow label="Motorista" value={transporte.motorista} />
          <InfoRow label="Viagem ID" value={transporte.viagemId} />
          <InfoRow label="Transporte" value={transporte.transporte} />
        </CardContent>
      </Card>

      {/* Card Conferência */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Conferência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow 
            label="Carga Segregada" 
            value={conferencia.cargaSegregada ? "Sim" : "Não"} 
            highlight={conferencia.cargaSegregada}
          />
          <InfoRow label="Doca" value={conferencia.doca} icon={<MapPin className="h-4 w-4" />} />
          <InfoRow 
            label="Temp. Baú" 
            value={`${conferencia.tempBau}°C`} 
            icon={<Thermometer className="h-4 w-4" />} 
          />
          <InfoRow 
            label="Temp. Produto" 
            value={`${conferencia.tempProduto}°C`} 
            icon={<Thermometer className="h-4 w-4" />} 
          />
        </CardContent>
      </Card>

      {/* Card Responsáveis */}
      <Card className="shadow-sm md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Responsáveis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InfoRow label="Cadastrado Por" value={responsaveis.cadastradoPor} />
          <InfoRow label="Conferido Por" value={responsaveis.conferidoPor} />
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

function InfoRow({ label, value, icon, highlight }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1.5">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className={`text-sm font-medium ${highlight ? "text-success" : "text-foreground"}`}>
          {value}
        </span>
      </div>
    </div>
  );
}
