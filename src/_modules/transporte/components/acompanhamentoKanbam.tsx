import { ResultTransporteDtoOutput, ResultTransporteDtoOutputCarregamento, ResultTransporteDtoOutputConferencia, ResultTransporteDtoOutputSeparacao } from "@/_services/api/model";
import useGetAllTransportes from "../hooks/useGetAllTransportes";
import CardKanbam from "./cardKanbam";

export default function AcompanhamentoKanbam() {
  const { transportes } = useGetAllTransportes();
  
  const transportesSeparacao = transportes?.filter((item) => definirProcesso(item) === 'separacao') || [];
  const transportesConferencia = transportes?.filter((item) => definirProcesso(item) === 'conferencia') || [];
  const transportesCarregamento = transportes?.filter((item) => definirProcesso(item) === 'carregamento') || [];

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground">Acompanhamento de Transportes</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Coluna Separação */}
        <div className="flex flex-col space-y-4">
          <div className="bg-primary/10 rounded-lg p-4 border-2 border-primary/20">
            <h2 className="text-2xl font-bold text-primary">Separação</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {transportesSeparacao.length} {transportesSeparacao.length === 1 ? 'transporte' : 'transportes'}
            </p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {transportesSeparacao.length > 0 ? (
              transportesSeparacao.map((item) => (
                <CardKanbam key={item.numeroTransporte} processo="separacao" item={item} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">Nenhum transporte em separação</p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna Conferência */}
        <div className="flex flex-col space-y-4">
          <div className="bg-secondary/10 rounded-lg p-4 border-2 border-secondary/20">
            <h2 className="text-2xl font-bold text-secondary-foreground">Conferência</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {transportesConferencia.length} {transportesConferencia.length === 1 ? 'transporte' : 'transportes'}
            </p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {transportesConferencia.length > 0 ? (
              transportesConferencia.map((item) => (
                <CardKanbam key={item.numeroTransporte} processo="conferencia" item={item} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">Nenhum transporte em conferência</p>
              </div>
            )}
          </div>
        </div>

        {/* Coluna Carregamento */}
        <div className="flex flex-col space-y-4">
          <div className="bg-accent/10 rounded-lg p-4 border-2 border-accent/20">
            <h2 className="text-2xl font-bold text-accent-foreground">Carregamento</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {transportesCarregamento.length} {transportesCarregamento.length === 1 ? 'transporte' : 'transportes'}
            </p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {transportesCarregamento.length > 0 ? (
              transportesCarregamento.map((item) => (
                <CardKanbam key={item.numeroTransporte} processo="carregamento" item={item} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">Nenhum transporte em carregamento</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function definirProcesso(transporte: ResultTransporteDtoOutput) {
  if (transporte.separacao === ResultTransporteDtoOutputSeparacao.EM_PROGRESSO) {
    return 'separacao';
  }
  if (transporte.conferencia === ResultTransporteDtoOutputConferencia.EM_PROGRESSO || (transporte.separacao === ResultTransporteDtoOutputSeparacao.CONCLUIDO && transporte.conferencia === ResultTransporteDtoOutputConferencia.NAO_INICIADO)) {
    return 'conferencia';
  }
  if (transporte.carregamento === ResultTransporteDtoOutputCarregamento.EM_PROGRESSO || (transporte.conferencia === ResultTransporteDtoOutputConferencia.CONCLUIDO && transporte.carregamento === ResultTransporteDtoOutputCarregamento.NAO_INICIADO)) {
    return 'carregamento';
  }
  return null;
}