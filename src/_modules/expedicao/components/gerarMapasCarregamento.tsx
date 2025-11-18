'use client';
import { Button } from '@/_shared/_components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import { Badge } from '@/_shared/_components/ui/badge';
import { Alert, AlertDescription } from '@/_shared/_components/ui/alert';
import { Loader2, CheckCircle, FileText, AlertTriangle, Truck, Package } from 'lucide-react';
import { columnsSeparacao } from './tableMapas/columnsSeparacao';
import { MapaConferencia } from './mapas/mapa-conferencia';
import { MinutaCarregamentoMapa } from './mapas/minuta-carregamento';
import { useMapa } from '../hooks/useMapa';
import { useShipments } from '../others/providers/shipments.provider';
import { useTransporteOperations } from '../hooks/useTransporteOperations';
import { BuscarTodosTransportesCarregamento } from '@/_services/api/model';
import { TableTransporte } from './tableTransporte';
import { ModalCadastrarPaletes } from './modalCadastrarPaletes';

export function GerarMapasCarregamento() {
  const { mapasCombinados, isLoading, handlePrint, gerarMapas, printRef } =
    useMapa();
  const { configuracaoImpressa, validationSuccess } = useShipments();
  const { operations } = useTransporteOperations();
  const transportesIds = validationSuccess?.data.transportesUnicos || [];
  const { data: transportes, isLoading: isLoadingTransportes } =
    operations.buscarTodosTransportesData(transportesIds);

  const temMapas = mapasCombinados.length > 0;
  const mapasCarregamento = mapasCombinados.filter(
    (mapa) => mapa.processo !== 'SEPARACAO',
  );

  const transportesPendentes = transportes?.filter(
    (transporte) =>
      transporte.conferencia !==
      BuscarTodosTransportesCarregamento.NAO_INICIADO,
  );
  const temTransportes =
    transportesPendentes && transportesPendentes.length > 0;
  const transportesJaImpressos = transportes?.filter(
    (transporte) => transporte.qtdImpressoes && transporte.qtdImpressoes > 0,
  );
  const temTransportesImpressos = transportesJaImpressos && transportesJaImpressos.length > 0;

  const mapasConferencia = mapasCarregamento.filter(mapa => mapa.processo === 'CONFERENCIA');
  const mapasCarregamentoCount = mapasCarregamento.filter(mapa => mapa.processo === 'CARREGAMENTO');

  return (
    <div className="space-y-4">
      {/* Header de Ações */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Mapas de Carregamento e Conferência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => gerarMapas('conferencia')}
              disabled={isLoading || temTransportes}
              className="gap-2"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Gerar Mapas
                </>
              )}
            </Button>
            
            {temMapas && (
              <ModalCadastrarPaletes
                printRef={printRef}
                mapasCombinados={mapasCombinados}
              />
            )}

            {temMapas && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  {mapasConferencia.length} conferência
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Package className="h-3 w-3" />
                  {mapasCarregamentoCount.length} carregamento
                </Badge>
              </div>
            )}
          </div>

          {/* Alertas de Status */}
          {temTransportes && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 text-sm">
                <span className="font-medium">{transportesPendentes.length} transporte(s)</span> em processo de conferência
              </AlertDescription>
            </Alert>
          )}

          {temTransportesImpressos && (
            <Alert className="border-blue-200 bg-blue-50">
              <FileText className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 text-sm">
                <span className="font-medium">{transportesJaImpressos.length} transporte(s)</span> já impressos
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Tabelas de Transportes */}
      <div className="space-y-3">
        {temTransportes && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Transportes em Conferência
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TableTransporte transportes={transportesPendentes} />
            </CardContent>
          </Card>
        )}

        {temTransportesImpressos && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Transportes Já Impressos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TableTransporte transportes={transportesJaImpressos} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Mapas Gerados */}
      {temMapas && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Visualização dos Mapas ({mapasCarregamento.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div ref={printRef} className="space-y-0">
              {mapasCarregamento.map((mapa, index) => {
                if (mapa.processo === 'CONFERENCIA') {
                  return (
                    <div key={`${index}-${mapa.id}`} className="print-page-break border-b last:border-b-0">
                      <MapaConferencia
                        mapa={mapa}
                        columnsExibir={configuracaoImpressa?.ordemConferencia ?? []}
                        columns={columnsSeparacao}
                      />
                    </div>
                  );
                }
                if (mapa.processo === 'CARREGAMENTO') {
                  return (
                    <div key={`${index}-${mapa.id}`} className="print-page-break border-b last:border-b-0">
                      <MinutaCarregamentoMapa mapa={mapa} />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}