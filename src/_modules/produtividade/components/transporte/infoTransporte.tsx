import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import { Truck, MapPin, Calendar, Car, Package, CheckCircle, Clock, Loader } from "lucide-react";
import { GetTransporteDto } from "@/_services/api/model";

interface InfoTransporteProps {
  transporte: GetTransporteDto;
}

export default function InfoTransporte({ transporte }: InfoTransporteProps) {
  
  // Função para determinar o status e cor dos processos
  const getStatusInfo = (status: string) => {
    const statusMap: any = {
      "CONCLUIDO": { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
      "EM_ANDAMENTO": { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Loader },
      "PENDENTE": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
      "NAO_INICIADO": { color: "bg-gray-100 text-gray-800 border-gray-200", icon: Clock }
    };
    return statusMap[status] || statusMap["PENDENTE"];
  };

  const separacaoInfo = getStatusInfo(transporte.separacao);
  const conferenciaInfo = getStatusInfo(transporte.conferencia);
  const carregamentoInfo = getStatusInfo(transporte.carregamento);

  const SeparacaoIcon = separacaoInfo.icon;
  const ConferenciaIcon = conferenciaInfo.icon;
  const CarregamentoIcon = carregamentoInfo.icon;

  return (
    <Card className="w-full border-blue-100 shadow-sm bg-white">
      <CardContent className="p-4 space-y-4">
        {/* Header com número do transporte */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-blue-600" />
            <span className="font-bold text-gray-900">#{transporte.numeroTransporte}</span>
          </div>
          {transporte.cargaParada && <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200 text-xs">
            Carga Parada
          </Badge>}
        </div>

        {/* Status dos Processos - Grid compacto */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <Badge 
              variant="secondary" 
              className={`w-full justify-center text-xs py-1 ${separacaoInfo.color}`}
            >
              <SeparacaoIcon className="h-3 w-3 mr-1" />
              Separação
            </Badge>
          </div>
          <div className="text-center">
            <Badge 
              variant="secondary" 
              className={`w-full justify-center text-xs py-1 ${conferenciaInfo.color}`}
            >
              <ConferenciaIcon className="h-3 w-3 mr-1" />
              Conferência
            </Badge>
          </div>
          <div className="text-center">
            <Badge 
              variant="secondary" 
              className={`w-full justify-center text-xs py-1 ${carregamentoInfo.color}`}
            >
              <CarregamentoIcon className="h-3 w-3 mr-1" />
              Carregamento
            </Badge>
          </div>
        </div>

        {/* Rota */}
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          <MapPin className="h-4 w-4 text-green-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-gray-600">Rota</div>
            <div className="text-sm font-semibold text-gray-900 truncate">
              {transporte.nomeRota}
            </div>
          </div>
        </div>

        {/* Informações principais em grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-medium text-gray-600">Expedição</div>
              <div className="text-sm font-semibold text-gray-900">
                {transporte.dataExpedicao?.split(' ')[0] || 'N/A'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-purple-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-medium text-gray-600">Veículo</div>
              <div className="text-sm font-semibold text-gray-900 truncate">
                {transporte.placa || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Transportadora */}
        {transporte.nomeTransportadora && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <Package className="h-4 w-4 text-orange-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-600">Transportadora</div>
              <div className="text-sm font-semibold text-gray-900 truncate">
                {transporte.nomeTransportadora}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}