import { DateTime } from "luxon";
import { TransporteComRelacionamentosGetDto } from "@/_services/api/model";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

export default function TimeLine({ transporte }: { transporte: TransporteComRelacionamentosGetDto }) {
  const historicos = transporte?.historicoTransporte || [];

  const processos = [
    {
      nome: 'Separação',
      inicio: historicos.find(h => h.tipoEvento === 'INICIO_SEPARACAO')?.alteradoEm,
      termino: historicos.find(h => h.tipoEvento === 'TERMINO_SEPARACAO')?.alteradoEm,
    },
    {
      nome: 'Conferência',
      inicio: historicos.find(h => h.tipoEvento === 'INICIO_CONFERENCIA')?.alteradoEm,
      termino: historicos.find(h => h.tipoEvento === 'TERMINO_CONFERENCIA')?.alteradoEm,
    },
    {
      nome: 'Carregamento',
      inicio: historicos.find(h => h.tipoEvento === 'INICIO_CARREGAMENTO')?.alteradoEm,
      termino: historicos.find(h => h.tipoEvento === 'TERMINO_CARREGAMENTO')?.alteradoEm,
    },
  ];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  

  return (
    <Card className="w-full py-2">
      <CardContent className="px-3 pt-2 pb-2">
        <div className="flex gap-3">
          {processos.map((processo) => {
            const inicioCompleto = !!processo.inicio;
            const terminoCompleto = !!processo.termino;
            const inicioFormatado = processo.inicio ? formatDate(processo.inicio) : ''  ;
            const terminoFormatado = processo.termino ? formatDate(processo.termino) : '' ;
            
            return (
              <div key={processo.nome} className="flex-1">
                {/* Linha principal com ícones e nome */}
                <div className="flex items-center gap-1.5 relative mb-2">
                  {/* Ícone Início */}
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                    inicioCompleto 
                      ? 'bg-green-600 text-white' 
                      : 'bg-muted border border-border text-muted-foreground'
                  }`}>
                    {inicioCompleto ? (
                      <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                    ) : (
                      <Circle className="w-3 h-3" strokeWidth={2} />
                    )}
                  </div>
                  
                  {/* Linha horizontal */}
                  <div className="flex-1 relative h-0.5 bg-border">
                    {/* Nome do processo centralizado */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-1.5">
                      <span className="text-xs font-medium text-foreground whitespace-nowrap">
                        {processo.nome}
                      </span>
                    </div>
                  </div>
                  
                  {/* Ícone Término */}
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                    terminoCompleto 
                      ? 'bg-green-600 text-white' 
                      : 'bg-muted border border-border text-muted-foreground'
                  }`}>
                    {terminoCompleto ? (
                      <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                    ) : (
                      <Circle className="w-3 h-3" strokeWidth={2} />
                    )}
                  </div>
                </div>
                
                {/* Datas formatadas */}
                <div className="flex justify-between gap-1 text-[10px] text-muted-foreground">
                  <div className="flex-1 text-left min-w-0">
                    <div className="truncate" title={inicioFormatado || 'Pendente'}>
                      {inicioFormatado || (
                        <span className="text-muted-foreground/60">Pendente</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 text-right min-w-0">
                    <div className="truncate" title={terminoFormatado || 'Pendente'}>
                      {terminoFormatado || (
                        <span className="text-muted-foreground/60">Pendente</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}