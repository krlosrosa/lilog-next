'use client';
import { Button } from '@/_shared/_components/ui/button';
import { Separator } from '@/_shared/_components/ui/separator';
import { Badge } from '@/_shared/_components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/_shared/_components/ui/card';
import { Alert, AlertDescription } from '@/_shared/_components/ui/alert';
import { columnsSeparacao } from './tableMapas/columnsSeparacao';
import { MapaSeparacao } from './mapas/mapa-separacao';
import { useMapa } from '../hooks/useMapa';
import { useShipments } from '../others/providers/shipments.provider';
import { useTransporteOperations } from '../hooks/useTransporteOperations';
import {
  BuscarTodosTransportesSeparacao,
} from '@/_services/api/model';
import { TableTransporte } from './tableTransporte';
import { ModalCadastrarPaletes } from './modalCadastrarPaletes';
import { Package, AlertTriangle, Printer, FileText } from 'lucide-react';

export function GerarMapas() {
  const {
    mapasCombinados,
    isLoading,
    gerarMapas,
    printRef,
  } = useMapa();
  const { configuracaoImpressa, validationSuccess } = useShipments();
  const { operations } = useTransporteOperations();
  const transportesIds = validationSuccess?.data.transportesUnicos || [];
  const { data: transportes, isLoading: isLoadingTransportes } =
    operations.buscarTodosTransportesData(transportesIds);

  const temMapas = mapasCombinados.length > 0;
  const mapasSeparacao = mapasCombinados.filter(
    (mapa) => mapa.processo === 'SEPARACAO',
  );

  const transportesPendentes = transportes?.filter(
    (transporte) =>
      transporte.separacao !== BuscarTodosTransportesSeparacao.NAO_INICIADO,
  );
  const temTransportes =
    transportesPendentes && transportesPendentes.length > 0;
  const transportesJaImpressos = transportes?.filter(
    (transporte) => transporte.qtdImpressoes && transporte.qtdImpressoes > 0,
  );

  return (
    <div className="space-y-4">
      {/* Header de Ações */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Mapa de Separação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => gerarMapas('separacao')}
              disabled={isLoading || temTransportes}
              className="gap-2"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Printer className="h-4 w-4" />
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
              <Badge variant="secondary" className="gap-1">
                <FileText className="h-3 w-3" />
                {mapasSeparacao.length} mapa(s) gerado(s)
              </Badge>
            )}
          </div>

          {/* Alertas de Status */}
          {transportesPendentes && transportesPendentes.length > 0 && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 text-sm">
                <span className="font-medium">{transportesPendentes.length} transporte(s)</span> em processo de separação
              </AlertDescription>
            </Alert>
          )}

          {transportesJaImpressos && transportesJaImpressos.length > 0 && (
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
        {transportesPendentes && transportesPendentes.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Transportes em Separação
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TableTransporte transportes={transportesPendentes} />
            </CardContent>
          </Card>
        )}

        {transportesJaImpressos && transportesJaImpressos.length > 0 && (
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
              <Printer className="h-4 w-4 text-primary" />
              Visualização dos Mapas ({mapasSeparacao.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div ref={printRef} className="space-y-0">
              {mapasSeparacao.map((mapa, index) => {
                if (mapa.tipo === 'picking') {
                  return (
                    <div key={`${index}-${mapa.id}`} className="print-page-break border-b last:border-b-0">
                      <MapaSeparacao
                        tipo={configuracaoImpressa?.tipoImpressao || 'TRANSPORTE'}
                        exibirCliente={
                          configuracaoImpressa?.exibirInfoCabecalho || 'NENHUM'
                        }
                        mapa={mapa}
                        columnsExibir={configuracaoImpressa?.ordemPicking ?? []}
                        columns={columnsSeparacao}
                      />
                    </div>
                  );
                }
                if (mapa.tipo === 'palete') {
                  return (
                    <div key={`${index}-${mapa.id}`} className="print-page-break border-b last:border-b-0">
                      <MapaSeparacao
                        tipo={configuracaoImpressa?.tipoImpressao || 'TRANSPORTE'}
                        exibirCliente={
                          configuracaoImpressa?.exibirInfoCabecalho || 'NENHUM'
                        }
                        mapa={mapa}
                        columnsExibir={configuracaoImpressa?.ordemPaletes ?? []}
                        columns={columnsSeparacao}
                      />
                    </div>
                  );
                }
                if (mapa.tipo === 'unidade') {
                  return (
                    <div key={`${index}-${mapa.id}`} className="print-page-break border-b last:border-b-0">
                      <MapaSeparacao
                        tipo={configuracaoImpressa?.tipoImpressao || 'TRANSPORTE'}
                        exibirCliente={
                          configuracaoImpressa?.exibirInfoCabecalho || 'NENHUM'
                        }
                        mapa={mapa}
                        columnsExibir={configuracaoImpressa?.ordemUnidades ?? []}
                        columns={columnsSeparacao}
                      />
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