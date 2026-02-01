'use client';

import { ResultadoDemandaDto } from "@/_services/api/model";
import { AlertTriangle, Calendar, CheckCircle2, Clock, FileText, Package, Truck, User } from "lucide-react";
import { Badge } from "@/_shared/_components/ui/badge";

interface HeaderResultadoReturnProps {
  resultadoConferencia?: ResultadoDemandaDto | null;
  statusConferencia: string;
}

export function HeaderResultadoReturn({ resultadoConferencia, statusConferencia }: HeaderResultadoReturnProps) {
  // Verificação de segurança
  if (!resultadoConferencia) {
    return null;
  }
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Conferência Finalizada':
        return 'default';
      case 'Em Andamento':
        return 'secondary';
      case 'Não Iniciado':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatTemperature = (temp?: number | null): string => {
    if (temp === null || temp === undefined) return '-';
    return `${temp}°C`;
  };

  return (
    <div className="border-2 border-slate-800 bg-white">
      {/* Cabeçalho Principal */}
      <div className="bg-slate-800 px-3 py-2 border-b-2 border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-sm font-bold uppercase tracking-wide">
              Relatório de Conferência
            </h1>
            <p className="text-slate-300 text-[10px] mt-0.5">
              Demanda #{resultadoConferencia.demandaId}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {resultadoConferencia.FechouComAnomalia && (
              <div className="flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                <AlertTriangle className="h-2.5 w-2.5" />
                COM ANOMALIA
              </div>
            )}
            <Badge variant={getStatusBadgeVariant(statusConferencia) as any} className="text-[9px] font-bold px-2 py-0.5">
              {statusConferencia.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Informações Principais */}
      <div className="grid grid-cols-2 gap-0 border-b border-slate-300">
        {/* Coluna Esquerda - Transporte */}
        <div className="border-r border-slate-300">
          <div className="bg-slate-100 px-2 py-1 border-b border-slate-300">
            <h3 className="text-slate-800 text-[10px] font-bold uppercase flex items-center gap-1">
              <Truck className="h-3 w-3" />
              Transporte
            </h3>
          </div>
          <div className="p-2 space-y-1">
            <InfoItem label="Placa" value={resultadoConferencia.placa} />
            <InfoItem label="Motorista" value={resultadoConferencia.motorista} />
            <InfoItem label="Transportadora" value={resultadoConferencia.transportadora} />
            <InfoItem label="Doca" value={resultadoConferencia.doca} />
            <InfoItem label="Temperatura do Baú" value={formatTemperature(resultadoConferencia.temperaturaBau)} />
            <InfoItem label="Temperatura do Produto" value={formatTemperature(resultadoConferencia.temperaturaProduto)} />
          </div>
        </div>

        {/* Coluna Direita - Responsáveis */}
        <div>
          <div className="bg-slate-100 px-2 py-1 border-b border-slate-300">
            <h3 className="text-slate-800 text-[10px] font-bold uppercase flex items-center gap-1">
              <User className="h-3 w-3" />
              Responsáveis
            </h3>
          </div>
          <div className="p-2 space-y-1">
            <InfoItem label="Criado Por" value={resultadoConferencia.criadoPor} />
            <InfoItem label="Conferente" value={resultadoConferencia.conferente} />
          </div>
        </div>
      </div>

      {/* Notas Fiscais - Linha Separada */}
      {resultadoConferencia.notas && resultadoConferencia.notas.length > 0 && (
        <div className="border-b border-slate-300">
          <div className="bg-slate-100 px-2 py-1 border-b border-slate-300">
            <h3 className="text-slate-800 text-[10px] font-bold uppercase flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Notas Fiscais ({resultadoConferencia.notas.length})
            </h3>
          </div>
          <div className="p-1.5">
            <div className="flex flex-wrap gap-1">
              {resultadoConferencia.notas.map((nota, index) => (
                <NotaChip key={index} nota={nota} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timeline de Eventos - Apenas até Finalizado a Conferência */}
      <div>
        <div className="bg-slate-100 px-2 py-1 border-b border-slate-300">
          <h3 className="text-slate-800 text-[10px] font-bold uppercase flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Cronologia
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-0">
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
            highlight 
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between items-baseline gap-1.5">
      <span className="text-slate-600 text-[8px] font-semibold uppercase tracking-wide">
        {label}:
      </span>
      <span className="text-slate-900 text-[9px] font-bold text-right">
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
    <div className={`p-1.5 ${borderRight ? 'border-r border-slate-300' : ''} ${highlight ? 'bg-slate-50' : ''}`}>
      <div className="text-slate-600 text-[7px] font-semibold uppercase tracking-wide mb-0.5">
        {label}
      </div>
      <div className="text-slate-900 text-[9px] font-bold">
        {value}
      </div>
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
      case 'devolucao_parcial':
        return 'bg-red-600 text-white border-red-700';
      case 'reentrega':
        return 'bg-purple-600 text-white border-purple-700';
      default:
        return 'bg-slate-600 text-white border-slate-700';
    }
  };

  return (
    <div className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border ${getTipoColor(nota.tipo)}`}>
      <span className="text-[8px] font-bold">
        {nota.notaFiscal || '-'}
      </span>
      {nota.notaFiscalParcial && (
        <span className="text-[6px] opacity-80">
          (P)
        </span>
      )}
      {nota.tipo && (
        <span className="text-[6px] opacity-90 ml-0.5">
          • {nota.tipo}
        </span>
      )}
    </div>
  );
}
