import { Skeleton } from "@/_shared/_components/ui/skeleton";
import { Progress } from "@/_shared/_components/ui/progress";
import { CheckCircle, MapPin, Target, ChevronRight } from "lucide-react";
import { useContagemLite } from "../hooks/contagem-lite/useLite";
import { useState } from "react";

export default function StatusContagem() {
  const { statusContagem, isLoadingStatusContagem } = useContagemLite();
  const [mostrarTodas, setMostrarTodas] = useState(false);
  
  if (isLoadingStatusContagem) return <Skeleton className="h-24 w-full" />;
  if (!statusContagem || statusContagem.length === 0) return null;

  // Ordena por progresso (mais completos primeiro)
  const ruasOrdenadas = [...statusContagem].sort((a, b) => {
    const progressoA = ((a.enderecos_validados) || 0) / ((a.total_enderecos) || 1);
    const progressoB = ((b.enderecos_validados) || 0) / ((b.total_enderecos) || 1);
    return progressoB - progressoA;
  });

  const ruasParaMostrar = mostrarTodas ? ruasOrdenadas : ruasOrdenadas.slice(0, 5);

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="space-y-6">
        {/* Cabeçalho */}
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Validação por Rua</h2>
        </div>

        {/* Lista de ruas */}
        <div className="space-y-4">
          {ruasParaMostrar.map((rua, index) => {
            const total = (rua.total_enderecos) || 0;
            const validados = (rua.enderecos_validados) || 0;
            const progresso = total > 0 ? Math.round((validados / total) * 100) : 0;

            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium truncate" title={rua.endereco_base}>
                      {rua.endereco_base}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {validados}/{total}
                    </span>
                    <span className={`text-sm font-medium ${
                      progresso === 100 ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {progresso}%
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Progress 
                    value={progresso} 
                    className={`flex-1 h-2 ${
                      progresso === 100 ? '[&>div]:bg-green-600' : ''
                    }`}
                  />
                  {progresso === 100 && (
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controle para mostrar mais/menos */}
        {statusContagem.length > 5 && (
          <button
            onClick={() => setMostrarTodas(!mostrarTodas)}
            className="w-full flex items-center justify-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium pt-2"
          >
            {mostrarTodas ? 'Mostrar menos' : `Mostrar mais ${statusContagem.length - 5} ruas`}
            <ChevronRight className={`h-4 w-4 transition-transform ${mostrarTodas ? 'rotate-90' : ''}`} />
          </button>
        )}
      </div>
    </div>
  );
}