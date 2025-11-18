'use client';

import { TableTransporte } from '../components/tableTransporte';
import { useShipments } from '../others/providers/shipments.provider';
import { ListaTransportesFaltantes } from './listaTransportesFaltantes';
import { useTransporteOperations } from '../hooks/useTransporteOperations';
import { Button } from '@/_shared/_components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/_shared/_components/ui/card';
import { Badge } from '@/_shared/_components/ui/badge';
import { ArrowLeft, Loader2, Settings, Truck, AlertTriangle } from 'lucide-react';

export function ListaTransporte({
  setValueTab,
}: {
  setValueTab: (value: string) => void;
}) {
  const { validationSuccess } = useShipments();
  const { operations } = useTransporteOperations();

  const transportesIds = validationSuccess?.data.transportesUnicos || [];

  const { data: transportes, isLoading } =
    operations.buscarTodosTransportesData(transportesIds);

  const nomesSet = new Set(transportes?.map((o) => o.numeroTransporte));
  const transportesFaltantes = transportesIds.filter((t) => !nomesSet.has(t));

  if (isLoading) {
    return (
      <div className="mx-auto space-y-4 p-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Carregando transportes...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const temTransportes = transportes && transportes.length > 0;
  const temFaltantes = transportesFaltantes.length > 0;

  return (
    <div className="mx-auto space-y-4 p-4">
      {/* Header com Ações */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setValueTab('upload')}
          className="gap-2"
          size="sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <Button
          variant="default"
          onClick={() => setValueTab('definicoes')}
          className="gap-2"
          disabled={temFaltantes || !temTransportes}
          size="sm"
        >
          <Settings className="h-4 w-4" />
          Configurações
        </Button>
      </div>

      {/* Card Principal */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold">Validação de Transportes</CardTitle>
              <p className="text-muted-foreground text-sm">
                Verificação dos transportes encontrados no sistema
              </p>
            </div>
            <Badge variant={temFaltantes ? "destructive" : "default"} className="text-xs">
              {transportes?.length || 0}/{transportesIds.length} encontrados
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Transportes Faltantes */}
          {temFaltantes && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <h3 className="text-sm font-medium text-destructive">
                  Transportes Não Encontrados ({transportesFaltantes.length})
                </h3>
              </div>
              <ListaTransportesFaltantes transportesFaltantes={transportesFaltantes} />
            </div>
          )}

          {/* Transportes Encontrados */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                Transportes Encontrados
                {temTransportes && (
                  <Badge variant="secondary" className="text-xs">
                    {transportes.length}
                  </Badge>
                )}
              </h3>
            </div>
            
            {temTransportes ? (
              <TableTransporte transportes={transportes} />
            ) : (
              <div className="rounded-lg border border-dashed p-4 text-center">
                <Truck className="mx-auto h-8 w-8 text-muted-foreground/50" />
                <p className="text-muted-foreground text-sm mt-2">
                  Nenhum transporte encontrado no sistema
                </p>
              </div>
            )}
          </div>

          {/* Aviso de Bloqueio */}
          {temFaltantes && (
            <div className="rounded-lg bg-amber-50 p-3 border border-amber-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <p className="text-amber-800 text-xs font-medium">
                  Resolva os transportes faltantes para continuar com as configurações
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}