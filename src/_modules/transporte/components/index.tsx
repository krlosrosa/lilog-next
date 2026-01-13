'use client';
import { ResultTransporteDtoOutput, ResultTransporteDtoOutputCarregamento, ResultTransporteDtoOutputConferencia, ResultTransporteDtoOutputSeparacao } from "@/_services/api/model";
import useGetAllTransportes from "../hooks/useGetAllTransportes";
import CardKanbam from "./cardKanbam";
import KanbanColumnHeader from "./kanbanColumnHeader";
import { useTransporteFilter } from "../hooks/useTransporteFilter";

const calcularEstatisticas = (
  todosTransportes: ResultTransporteDtoOutput[],
  transportesFiltrados: ResultTransporteDtoOutput[],
  processo: 'separacao' | 'conferencia' | 'carregamento'
) => {
  const total = todosTransportes.length;
  
  const emAndamento = transportesFiltrados.filter((item) => {
    const status = item[processo];
    if (processo === 'separacao') {
      return status === ResultTransporteDtoOutputSeparacao.EM_PROGRESSO;
    }
    if (processo === 'conferencia') {
      return status === ResultTransporteDtoOutputConferencia.EM_PROGRESSO;
    }
    return status === ResultTransporteDtoOutputCarregamento.EM_PROGRESSO;
  }).length;
  
  const concluidos = transportesFiltrados.filter((item) => {
    const status = item[processo];
    if (processo === 'separacao') {
      return status === ResultTransporteDtoOutputSeparacao.CONCLUIDO;
    }
    if (processo === 'conferencia') {
      return status === ResultTransporteDtoOutputConferencia.CONCLUIDO;
    }
    return status === ResultTransporteDtoOutputCarregamento.CONCLUIDO;
  }).length;
  
  const naoIniciados = todosTransportes.filter((item) => {
    const status = item[processo];
    if (processo === 'separacao') {
      return status === ResultTransporteDtoOutputSeparacao.NAO_INICIADO;
    }
    if (processo === 'conferencia') {
      return status === ResultTransporteDtoOutputConferencia.NAO_INICIADO;
    }
    return status === ResultTransporteDtoOutputCarregamento.NAO_INICIADO;
  }).length;

  return { total, emAndamento, concluidos, naoIniciados };
};

export default function Transporte() {
  const { filters } = useTransporteFilter();


  const { transportes, isLoading } = useGetAllTransportes(filters.dataRegistro);
  
  const todosTransportes = transportes || [];
  const transportesSeparacao = ordenarPorProcesso(
    todosTransportes.filter((item) => definirProcesso(item, 'separacao') === 'separacao'),
    'separacao'
  );
  const transportesConferencia = ordenarPorProcesso(
    todosTransportes.filter((item) => definirProcesso(item, 'conferencia') === 'conferencia'),
    'conferencia'
  );
  const transportesCarregamento = ordenarPorProcesso(
    todosTransportes.filter((item) => definirProcesso(item, 'carregamento') === 'carregamento'),
    'carregamento'
  );
  const statsSeparacao = calcularEstatisticas(todosTransportes, todosTransportes, 'separacao');
  const statsConferencia = calcularEstatisticas(todosTransportes, todosTransportes, 'conferencia');
  const statsCarregamento = calcularEstatisticas(todosTransportes, todosTransportes, 'carregamento');

  const cargaParada = todosTransportes.filter((item) => item.cargaParada === true);
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        {/* Coluna Separação */}
        <div className="flex flex-col border-2 border-border bg-muted/30">
          <KanbanColumnHeader
            title="Separação"
            total={statsSeparacao.total}
            emAndamento={statsSeparacao.emAndamento}
            concluidos={statsSeparacao.concluidos}
            naoIniciados={statsSeparacao.naoIniciados}
            variant="primary"
          />
          <div className="flex-1 p-1 space-y-1 min-h-[200px] overflow-y-auto">
            {transportesSeparacao.length > 0 ? (
              transportesSeparacao.map((item) => (
                <CardKanbam key={item.numeroTransporte} processo="separacao" item={item} />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Nenhum transporte
              </div>
            )}
          </div>
        </div>

        {/* Coluna Conferência */}
        <div className="flex flex-col border-2 border-border bg-muted/30">
          <KanbanColumnHeader
            title="Conferência"
            total={statsConferencia.total}
            emAndamento={statsConferencia.emAndamento}
            concluidos={statsConferencia.concluidos}
            naoIniciados={statsConferencia.naoIniciados}
            variant="secondary"
          />
          <div className="flex-1 p-3 space-y-2 min-h-[200px] overflow-y-auto">
            {transportesConferencia.length > 0 ? (
              transportesConferencia.map((item) => (
                <CardKanbam key={item.numeroTransporte} processo="conferencia" item={item} />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Nenhum transporte
              </div>
            )}
          </div>
        </div>

        {/* Coluna Carregamento */}
        <div className="flex flex-col border-2 border-border bg-muted/30">
          <KanbanColumnHeader
            title="Carregamento"
            total={statsCarregamento.total}
            emAndamento={statsCarregamento.emAndamento}
            concluidos={statsCarregamento.concluidos}
            naoIniciados={statsCarregamento.naoIniciados}
            variant="accent"
          />
          <div className="flex-1 p-3 space-y-2 min-h-[200px] overflow-y-auto">
            {transportesCarregamento.length > 0 ? (
              transportesCarregamento.map((item) => (
                <CardKanbam key={item.numeroTransporte} processo="carregamento" item={item} />
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Nenhum transporte
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function definirProcesso(transporte: ResultTransporteDtoOutput, processo: 'separacao' | 'conferencia' | 'carregamento') {
 
  if(processo === 'separacao') {
    if (transporte.separacao === ResultTransporteDtoOutputSeparacao.EM_PROGRESSO) {
      return 'separacao';
    }
  }

  if(processo = 'conferencia') {
    if (transporte.conferencia === ResultTransporteDtoOutputConferencia.EM_PROGRESSO || (transporte.separacao === ResultTransporteDtoOutputSeparacao.CONCLUIDO && transporte.conferencia === ResultTransporteDtoOutputConferencia.NAO_INICIADO)) {
      return 'conferencia';
    }
  }

  if(processo = 'carregamento') {
    if (transporte.carregamento === ResultTransporteDtoOutputCarregamento.EM_PROGRESSO || (transporte.conferencia === ResultTransporteDtoOutputConferencia.CONCLUIDO && transporte.carregamento === ResultTransporteDtoOutputCarregamento.NAO_INICIADO)) {
      return 'carregamento';
    }
  }
  return null;
}


function pesoStatus(status: any) {
  switch (status) {
    case ResultTransporteDtoOutputSeparacao.NAO_INICIADO:
    case ResultTransporteDtoOutputConferencia.NAO_INICIADO:
    case ResultTransporteDtoOutputCarregamento.NAO_INICIADO:
      return 3;

    case ResultTransporteDtoOutputSeparacao.EM_PROGRESSO:
    case ResultTransporteDtoOutputConferencia.EM_PROGRESSO:
    case ResultTransporteDtoOutputCarregamento.EM_PROGRESSO:
      return 2;

    case ResultTransporteDtoOutputSeparacao.CONCLUIDO:
    case ResultTransporteDtoOutputConferencia.CONCLUIDO:
    case ResultTransporteDtoOutputCarregamento.CONCLUIDO:
      return 1;

    default:
      return 0;
  }
}

function ordenarPorProcesso(
  lista: ResultTransporteDtoOutput[],
  processo: 'separacao' | 'conferencia' | 'carregamento'
) {
  return [...lista].sort((a, b) => {
    const statusA = a[processo];
    const statusB = b[processo];

    return pesoStatus(statusB) - pesoStatus(statusA); // DESC
  });
}