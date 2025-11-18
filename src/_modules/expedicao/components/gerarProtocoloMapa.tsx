'use client';

import { Button } from '@/_shared/_components/ui/button';
import {
  Card,
  CardContent,
} from '@/_shared/_components/ui/card';
import { Separator } from '@/_shared/_components/ui/separator';
import { FileText, Printer, Loader2 } from 'lucide-react';
import { useMapa } from '../hooks/useMapa';
import { TableProtocolo } from './tableProtocolo';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function GerarProtocoloMapa() {
  const { gerarProtocoloMapaService, protocolos, printRef, handlePrint, isLoadingProtocolo } = useMapa();

  const totalPesoLiquido = protocolos.reduce((acc, protocolo) => acc + protocolo.pesoLiquido, 0);
  const totalPesoBruto = protocolos.reduce((acc, protocolo) => acc + protocolo.pesoBruto, 0);
  const temProtocolos = protocolos.length > 0;
  const dataAtual = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  // Formatação de números para pt-BR
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatInteger = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  return (
    <div className="mx-auto space-y-4">
      {/* Área de Controles */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Protocolo de Entrega de Mapas</h1>
          <p className="text-muted-foreground text-sm">
            Gere e imprima o protocolo de entrega com os dados sumarizados por transporte
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={gerarProtocoloMapaService}
            disabled={isLoadingProtocolo}
            variant="default"
          >
            {isLoadingProtocolo ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Gerar Protocolo
              </>
            )}
          </Button>
          {temProtocolos && (
            <Button
              onClick={handlePrint}
              variant="outline"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          )}
        </div>
      </div>

      {/* Área de Impressão */}
      <div ref={printRef} className="print:mx-0">
        {temProtocolos ? (
          <div className="space-y-4">
            {/* Cabeçalho do Protocolo */}
            <div className="flex flex-col items-center space-y-2 border-b pb-4">
              <h2 className="text-2xl font-bold">PROTOCOLO DE ENTREGA DE MAPAS</h2>
              <p className="text-muted-foreground text-sm">
                Data de Emissão: {dataAtual}
              </p>
            </div>

            {/* Resumo */}
            <div className="grid grid-cols-1 gap-1 md:grid-cols-1 lg:grid-cols-3 print:grid-cols-3">
              <Card className="bg-muted/50 p-1">
                <CardContent className="pt-3">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs font-medium">
                      Total de Transportes
                    </p>
                    <p className="text-2xl font-bold">
                      {formatInteger(protocolos.length)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 p-1">
                <CardContent className="pt-3">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs font-medium">
                      Peso Líquido Total (kg)
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(totalPesoLiquido)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50 p-1">
                <CardContent className="pt-3">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs font-medium">
                      Peso Bruto Total (kg)
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(totalPesoBruto)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Detalhamento por Transporte</h3>
              <TableProtocolo protocolos={protocolos} />
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="text-muted-foreground mb-4 h-12 w-12" />
              <p className="text-muted-foreground text-center text-sm">
                Nenhum protocolo gerado. Clique em "Gerar Protocolo" para criar o documento.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
