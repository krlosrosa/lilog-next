import { ResultadoDemandaDto } from "@/_services/api/model";
import { AlertTriangle, Calendar, CheckCircle2, Clock, FileText, Package, Truck, User } from "lucide-react";

export default function HeaderResultado({ resultadoConferencia }: { resultadoConferencia: ResultadoDemandaDto }) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'finalizado':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'em andamento':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="border-2 border-slate-800 bg-white print:break-inside-avoid">
      {/* Cabeçalho Principal */}
      <div className="bg-slate-800 px-4 py-3 border-b-2 border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-lg font-bold uppercase tracking-wide">
              Relatório de Conferência
            </h1>
            <p className="text-slate-300 text-xs mt-0.5">
              Demanda #{resultadoConferencia.demandaId}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {resultadoConferencia.FechouComAnomalia && (
              <div className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                <AlertTriangle className="h-3 w-3" />
                COM ANOMALIA
              </div>
            )}
            <div className={`px-3 py-1 rounded text-xs font-bold border ${getStatusColor(resultadoConferencia.Status)}`}>
              {resultadoConferencia.Status?.toUpperCase() || 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Informações Principais */}
      <div className="grid grid-cols-2 gap-0 border-b border-slate-300">
        {/* Coluna Esquerda - Transporte */}
        <div className="border-r border-slate-300">
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-300">
            <h3 className="text-slate-800 text-xs font-bold uppercase flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5" />
              Transporte
            </h3>
          </div>
          <div className="p-3 space-y-2">
            <InfoItem label="Placa" value={resultadoConferencia.placa} />
            <InfoItem label="Motorista" value={resultadoConferencia.motorista} />
            <InfoItem label="Transportadora" value={resultadoConferencia.transportadora} />
            <InfoItem label="Doca" value={resultadoConferencia.doca} />
          </div>
        </div>

        {/* Coluna Direita - Responsáveis */}
        <div>
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-300">
            <h3 className="text-slate-800 text-xs font-bold uppercase flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              Responsáveis
            </h3>
          </div>
          <div className="p-3 space-y-2">
            <InfoItem label="Criado Por" value={resultadoConferencia.criadoPor} />
            <InfoItem label="Conferente" value={resultadoConferencia.conferente} />
          </div>
        </div>
      </div>

      {/* Notas Fiscais - Linha Separada */}
      {resultadoConferencia.notas && resultadoConferencia.notas.length > 0 && (
        <div className="border-b border-slate-300">
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-300">
            <h3 className="text-slate-800 text-xs font-bold uppercase flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Notas Fiscais ({resultadoConferencia.notas.length})
            </h3>
          </div>
          <div className="p-2">
            <div className="flex flex-wrap gap-1.5">
              {resultadoConferencia.notas.map((nota, index) => (
                <NotaChip key={index} nota={nota} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline de Eventos */}
      <div>
        <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-300">
          <h3 className="text-slate-800 text-xs font-bold uppercase flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Cronologia
          </h3>
        </div>
        <div className="grid grid-cols-5 gap-0">
          <TimelineItem 
            label="Criado em" 
            value={formatDate(resultadoConferencia.criadoEm)} 
            borderRight 
          />
          <TimelineItem 
            label="Liberado" 
            value={formatDate(resultadoConferencia.LiberadoParaConferenciaEm)} 
            borderRight 
          />
          <TimelineItem 
            label="Início" 
            value={formatDate(resultadoConferencia.InicioConferenciaEm)} 
            borderRight
          />
          <TimelineItem 
            label="Fim" 
            value={formatDate(resultadoConferencia.FimConferenciaEm)} 
            borderRight
            highlight 
          />
          <TimelineItem 
            label="Finalizado" 
            value={formatDate(resultadoConferencia.FinalizadoEm)} 
            highlight 
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between items-baseline gap-2">
      <span className="text-slate-600 text-[9px] font-semibold uppercase tracking-wide">
        {label}:
      </span>
      <span className="text-slate-900 text-[10px] font-bold text-right">
        {value || '-'}
      </span>
    </div>
  );
}

function TimelineItem({ 
  label, 
  value, 
  borderRight, 
  highlight 
}: { 
  label: string; 
  value: string; 
  borderRight?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={`p-2 ${borderRight ? 'border-r border-slate-300' : ''} ${highlight ? 'bg-slate-50' : ''}`}>
      <div className="text-slate-600 text-[8px] font-semibold uppercase tracking-wide mb-0.5">
        {label}
      </div>
      <div className="text-slate-900 text-[10px] font-bold">
        {value}
      </div>
    </div>
  );
}

function NotaItem({ nota }: { nota: any }) {
  const getTipoColor = (tipo?: string) => {
    switch (tipo?.toLowerCase()) {
      case 'entrada':
        return 'bg-green-100 text-green-700';
      case 'saida':
        return 'bg-blue-100 text-blue-700';
      case 'devolucao':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-1.5 last:border-b-0 last:pb-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-900 text-[9px] font-bold truncate">
            NF: {nota.notaFiscal || '-'}
          </span>
          {nota.notaFiscalParcial && (
            <span className="text-amber-600 text-[8px] font-semibold">
              (Parcial)
            </span>
          )}
        </div>
        {nota.descMotivoDevolucao && (
          <p className="text-slate-600 text-[8px] truncate mt-0.5">
            {nota.descMotivoDevolucao}
          </p>
        )}
      </div>
      {nota.tipo && (
        <span className={`px-1.5 py-0.5 rounded text-[7px] font-bold uppercase ${getTipoColor(nota.tipo)}`}>
          {nota.tipo}
        </span>
      )}
    </div>
  );
}

function NotaChip({ nota }: { nota: any }) {
  const getTipoColor = (tipo?: string) => {
    switch (tipo?.toLowerCase()) {
      case 'entrada':
        return 'bg-green-600 text-white border-green-700';
      case 'saida':
        return 'bg-blue-600 text-white border-blue-700';
      case 'devolucao':
        return 'bg-red-600 text-white border-red-700';
      default:
        return 'bg-slate-600 text-white border-slate-700';
    }
  };

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${getTipoColor(nota.tipo)}`}>
      <span className="text-[9px] font-bold">
        {nota.notaFiscal || '-'}
      </span>
      {nota.notaFiscalParcial && (
        <span className="text-[7px] opacity-80">
          (P)
        </span>
      )}
      {nota.tipo && (
        <span className="text-[7px] opacity-90 ml-0.5">
          • {nota.tipo}
        </span>
      )}
    </div>
  );
}