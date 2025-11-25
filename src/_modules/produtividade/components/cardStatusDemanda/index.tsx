'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Badge } from "@/_shared/_components/ui/badge";
import useBuscarProdutividadePorDemanda from "../../hooks/queries/useBuscarProdutividadePorDemanda";
import { Loader2, PlayCircle, Package, PauseCircle, CheckCircle2, User, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getStatusColor } from "../../utils/getSatusColor";
import { useState } from "react";

type CardStatusDemandaProps = {
  demandaId: number;
  children: React.ReactNode;
}

const formatDateTime = (dateString: string | undefined) => {
  if (!dateString) return '-';
  try {
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch {
    return dateString;
  }
};

const formatTime = (milliseconds: number | null | undefined) => {
  if (milliseconds === null || milliseconds === undefined || isNaN(milliseconds)) {
    return '-';
  }
  // Converte milissegundos para minutos
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours}h ${mins}m`;
};

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '-';
  }
  return value.toLocaleString('pt-BR');
};

const calculatePauseDuration = (inicio: string, fim: string | null | undefined) => {
  if (!inicio || !fim) return '-';
  try {
    const inicioDate = new Date(inicio);
    const fimDate = new Date(fim);
    const diffMs = fimDate.getTime() - inicioDate.getTime();
    if (diffMs < 0) return '-';
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  } catch {
    return '-';
  }
};

export default function CardStatusDemanda({ demandaId, children }: CardStatusDemandaProps) {

  const [isOpen, setIsOpen] = useState(false);
  const { produtividade, isBuscandoProdutividade } = useBuscarProdutividadePorDemanda(demandaId.toString(), isOpen)



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="min-w-10/12 flex flex-col max-h-[90vh]">
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center justify-between gap-3 pr-8">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="truncate">Status da Demanda #{produtividade?.idDemanda || demandaId}</span>
              {produtividade?.statusDemanda && (
                <Badge className={`${getStatusColor(produtividade.statusDemanda)} px-2 py-1 text-xs shrink-0`}>
                  {produtividade.statusDemanda}
                </Badge>
              )}
            </div>
            {produtividade?.processo && (
              <Badge variant="outline" className="text-sm font-medium shrink-0">
                {produtividade.processo}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
          {isBuscandoProdutividade ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="py-4 overflow-y-auto flex-1 min-h-0 space-y-6">
            {/* Funcionário */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Funcionário:</span>
              <span className="text-sm font-semibold text-foreground">{produtividade?.nomeFuncionario || '-'}</span>
            </div>

            {/* Card de Resumo */}
            <div className="from-background to-muted/20 rounded-lg border p-2 shadow-sm">
              {/* Linha de Métricas */}
              <div className="flex flex-wrap items-start gap-4 justify-between px-4 py-1">

                {/* Paletes na Demanda */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {produtividade?.listaPaletes ? produtividade.listaPaletes.length : 0}
                    </p>
                    <div className="text-xs text-muted-foreground">Paletes na Demanda</div>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-border shrink-0" />

                {/* Total de Pausas */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {formatNumber(produtividade?.pausas)}
                    </p>
                    <div className="text-xs text-muted-foreground">Total de Pausas</div>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-border shrink-0" />

                {/* Caixas */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {formatNumber(produtividade?.caixas)}
                    </p>
                    <div className="text-xs text-muted-foreground">Caixas</div>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-border shrink-0" />

                {/* Unidades */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {formatNumber(produtividade?.unidades)}
                    </p>
                    <div className="text-xs text-muted-foreground">Unidades</div>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-border shrink-0" />

                {/* Paletes */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {formatNumber(produtividade?.paletes)}
                    </p>
                    <div className="text-xs text-muted-foreground">Paletes</div>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-border shrink-0" />

                {/* Tempo Trabalhado */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {formatTime(produtividade?.tempoTrabalhado)}
                    </p>
                    <div className="text-xs text-muted-foreground">Tempo Trabalhado</div>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-border shrink-0" />

                {/* Tempo de Pausa */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {formatTime(produtividade?.tempoPausas)}
                    </p>
                    <div className="text-xs text-muted-foreground">Tempo de Pausa</div>
                  </div>
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-border shrink-0" />

                {/* Produtividade */}
                <div className="flex items-center justify-center shrink-0">
                  <div className="space-y-0.5 text-center">
                    {produtividade?.produtividade !== null && produtividade?.produtividade !== undefined && !isNaN(produtividade.produtividade) ? (
                      <div className="bg-green-100 text-green-800 font-semibold inline-flex items-center rounded-full px-2 py-0.5 text-xs mx-auto">
                        {produtividade.produtividade.toFixed(2)}
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-muted-foreground leading-tight">-</p>
                    )}
                    <div className="text-xs text-muted-foreground">Produtividade</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Container */}
            <div className="relative">
              {/* Linha vertical da timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

              {/* Evento: Início */}
              <div className="relative flex items-start gap-4 pb-6">
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 ring-4 ring-background">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1 pt-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">Demanda Iniciada</h3>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{formatDateTime(produtividade?.inicio)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Processo iniciado com sucesso
                  </p>
                </div>
              </div>

              {/* Eventos: Paletes Adicionados */}
              {produtividade?.listaPaletes && produtividade.listaPaletes.length > 0 && (
                <>
                  <div className="relative flex items-start gap-4 pb-2">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-4 ring-background">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        Paletes Adicionados ({produtividade.listaPaletes.length})
                      </h3>
                    </div>
                  </div>
                  {produtividade.listaPaletes.map((palete, index) => (
                    <div key={palete.id} className="relative pb-1.5 pl-14">
                      <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-md border border-blue-200/50 dark:border-blue-800/30 p-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-semibold text-foreground">#{palete.id}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{palete.empresa}</span>
                          <span className="text-muted-foreground">•</span>
                          <Badge className={`${getStatusColor(palete.status)} px-1.5 py-0 text-[10px] h-4`}>
                            {palete.status}
                          </Badge>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Caixas: <span className="font-medium text-foreground">{formatNumber(palete.quantidadeCaixas)}</span></span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Unid: <span className="font-medium text-foreground">{formatNumber(palete.quantidadeUnidades)}</span></span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Paletes: <span className="font-medium text-foreground">{formatNumber(palete.quantidadePaletes)}</span></span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{palete.segmento}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Visitas: <span className="font-medium text-foreground">{formatNumber(palete.enderecoVisitado)}</span></span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Transp: <span className="font-medium text-foreground">{palete.transporteId}</span></span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Eventos: Pausas */}
              {produtividade?.listaPausas && produtividade.listaPausas.length > 0 && (
                <>
                  <div className="relative flex items-start gap-4 pb-2 pt-2">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 ring-4 ring-background">
                      <PauseCircle className="h-6 w-6" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-sm font-semibold text-foreground">
                        Pausas ({produtividade.pausas})
                      </h3>
                    </div>
                  </div>
                  {produtividade.listaPausas.map((pausa) => (
                    <div key={pausa.id} className="relative pb-1.5 pl-14">
                      <div className="bg-yellow-50/50 dark:bg-yellow-950/20 rounded-md border border-yellow-200/50 dark:border-yellow-800/30 p-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-semibold text-foreground">{pausa.motivo}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">Início: <span className="font-medium text-foreground">{formatDateTime(pausa.inicio)}</span></span>
                          {pausa.fim && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">Fim: <span className="font-medium text-foreground">{formatDateTime(pausa.fim)}</span></span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">Duração: <span className="font-medium text-foreground">{calculatePauseDuration(pausa.inicio, pausa.fim)}</span></span>
                            </>
                          )}
                          {pausa.descricao && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{pausa.descricao}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Evento: Fim */}
              {produtividade?.fim && (
                <div className="relative flex items-start gap-4 pt-2">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 ring-4 ring-background">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1 pt-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">Demanda Finalizada</h3>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{formatDateTime(produtividade.fim)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Processo concluído com sucesso
                    </p>
                  </div>
                </div>
              )}
            </div>
            </div>
          )}
      </DialogContent>
    </Dialog>
  )
}