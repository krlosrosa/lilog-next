'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import { Button } from '@/_shared/_components/ui/button';
import { Separator } from '@/_shared/_components/ui/separator';
import { Package, CheckCircle, FileText, Eye, Download, ArrowLeft } from 'lucide-react';
import { GerarMapas } from './gerarMapas';
import { GerarMapasCarregamento } from './gerarMapasCarregamento';
import { GerarProtocoloMapa } from './gerarProtocoloMapa';

type TipoMapa = 'separacao' | 'conferencia' | 'protocolo' | null;

interface GerarMapaConsolidadoProps {
  setValueTab?: (value: string) => void;
}

export function GerarMapaConsolidado({ setValueTab }: GerarMapaConsolidadoProps) {
  const [tipoMapaSelecionado, setTipoMapaSelecionado] =
    useState<TipoMapa>('separacao');

  const handleSelecionarTipo = (tipo: TipoMapa) => {
    setTipoMapaSelecionado(tipo);
  };

  const opcoes = [
    {
      titulo: 'Mapa de Separação',
      tipo: 'separacao' as TipoMapa,
      icone: Package,
    },
    {
      titulo: 'Mapa de Conferência',
      tipo: 'conferencia' as TipoMapa,
      icone: CheckCircle,
    },
    {
      titulo: 'Protocolo',
      tipo: 'protocolo' as TipoMapa,
      icone: FileText,
    },
  ];

  return (
    <div className="w-full space-y-4 p-0">
      {/* Cabeçalho Compacto */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold">Gerar Mapa</h1>
          <p className="text-muted-foreground text-xs">
            Selecione o tipo de mapa que deseja gerar
          </p>
        </div>
        {setValueTab && (
          <Button
            onClick={() => setValueTab('definicoes')}
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Menu Lateral Compacto */}
        <div className="lg:col-span-3">
          <Card className="border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Tipo de Mapa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 p-0 px-3 pb-3">
              {opcoes.map((opcao, index) => {
                const Icone = opcao.icone;
                const isSelecionado = tipoMapaSelecionado === opcao.tipo;

                return (
                  <div key={opcao.tipo}>
                    <button
                      onClick={() => handleSelecionarTipo(opcao.tipo)}
                      className={`w-full rounded-md px-3 py-2 text-left transition-colors ${
                        isSelecionado
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icone className={`h-4 w-4 ${isSelecionado ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                        <span className="text-sm font-medium">{opcao.titulo}</span>
                        {isSelecionado && (
                          <CheckCircle className="ml-auto h-3.5 w-3.5 text-primary-foreground" />
                        )}
                      </div>
                    </button>
                    {index < opcoes.length - 1 && (
                      <Separator className="my-1" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Área Principal */}
        <div className="lg:col-span-9">
          <Card className="border">
            <CardContent className="p-4">
              {tipoMapaSelecionado === 'separacao' ? (
                <GerarMapas />
              ) : tipoMapaSelecionado === 'conferencia' ? (
                <GerarMapasCarregamento />
              ) : tipoMapaSelecionado === 'protocolo' ? (
                <GerarProtocoloMapa />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="text-muted-foreground mb-4 h-12 w-12" />
                  <h3 className="text-lg font-medium">Selecione um tipo de mapa</h3>
                  <p className="text-muted-foreground text-sm">
                    Escolha uma das opções ao lado para começar
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}