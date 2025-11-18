'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/_shared/_components/ui/card';
import { Label } from '@/_shared/_components/ui/label';
import { Input } from '@/_shared/_components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import { Switch } from '@/_shared/_components/ui/switch';
import { Checkbox } from '@/_shared/_components/ui/checkbox';
import { Button } from '@/_shared/_components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/_shared/_components/ui/collapsible';
import { Badge } from '@/_shared/_components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/_shared/_components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/_shared/_components/ui/tooltip';
import { ChevronDown, ArrowRight, ArrowLeft, Loader2, AlertCircle, Settings, Info } from 'lucide-react';
import { useShipments } from '../others/providers/shipments.provider';
import { ConfiguracaoImpressa } from '../others/types/configuracaoImpressa';
import { useTransporteOperations } from '../hooks/useTransporteOperations';
import { useUser } from '@/_shared/providers/UserContext';
import { useGetConfiguracaoMapa } from '@/_modules/center/hooks/queries/useGetConfiguracaoMapa';

const defaultValue: ConfiguracaoImpressa = {
  tipoImpressao: 'CLIENTE',
  empresa: 'DPA',
  quebraPalete: false,
  tipoQuebra: null,
  valorQuebra: null,
  separarPaleteFull: false,
  separarUnidades: false,
  exibirInfoCabecalho: null,
  segregarFifo: [],
  dataMaximaPercentual: 0,
  tipoImpressaoConferencia: 'CLIENTE',
  ordemConferencia: null,
  ordemFifo: null,
  ordemPaletes: null,
  ordemPicking: null,
  ordemUnidades: null,
};

export function Definicoes({
  setValueTab,
}: {
  setValueTab: (value: string) => void;
}) {
  const { configuracaoImpressa, setConfiguracaoImpressa } = useShipments();
  const { user } = useUser();
  const [empresa, setEmpresa] = useState<'DPA' | 'ITB' | 'LDB'>(
    user?.empresa || 'DPA',
  );
  const { configuracaoImpressa: configuracaoImpressaFromDB, error, isLoadingConfiguracaoImpressa } = useGetConfiguracaoMapa(empresa)
  const [isOpen, setIsOpen] = useState(false);

  // Sincroniza dados do banco com o provider quando chegarem ou empresa mudar
  useEffect(() => {
    if (configuracaoImpressaFromDB && !isLoadingConfiguracaoImpressa) {
      setConfiguracaoImpressa(configuracaoImpressaFromDB);
    }
  }, [configuracaoImpressaFromDB, isLoadingConfiguracaoImpressa, setConfiguracaoImpressa, empresa]);

  const estado = useMemo(() => {
    // Prioridade: Provider > Banco > Default
    return configuracaoImpressa || configuracaoImpressaFromDB || defaultValue;
  }, [configuracaoImpressa, configuracaoImpressaFromDB]);

  const handleUpdate = (
    field: keyof ConfiguracaoImpressa,
    value: string | number | boolean | null | string[],
  ) => {
    const newConfig = {
      ...estado,
      [field]: value,
    };
    setConfiguracaoImpressa(newConfig);
  };

  // Estado de loading
  if (isLoadingConfiguracaoImpressa) {
    return (
      <div className="mx-auto space-y-4 py-2">
        <Card className="border shadow-sm">
          <CardContent className="flex flex-col items-center justify-center gap-2 py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-muted-foreground text-sm">Carregando configuração...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const temErro = !!(error && !configuracaoImpressaFromDB);

  return (
    <div className="mx-auto space-y-4 py-2">
      {/* Header compacto */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold tracking-tight">Configurações de Impressão</h1>
          <p className="text-muted-foreground text-xs">
            Configure as definições para geração de mapas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setValueTab('validarTransporte')}
            variant="outline"
            size="sm"
            className="gap-1.5 h-9"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar
          </Button>
          <Button
            onClick={() => setValueTab('gerarMapas')}
            size="sm"
            className="gap-1.5 h-9"
            disabled={temErro}
          >
            Gerar Mapas
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-md p-1.5">
              <Settings className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base font-semibold">Definições de Impressão</CardTitle>
              <CardDescription className="text-xs">
                Configure o comportamento da impressão e separação de mapas
              </CardDescription>
            </div>
            {temErro && (
              <Badge variant="destructive" className="text-xs">
                Configuração Não Encontrada
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Mensagem de erro compacta */}
          {temErro && (
            <Alert variant="destructive" className="border-destructive/20 bg-destructive/5 py-2">
              <AlertCircle className="h-3.5 w-3.5" />
              <div className="ml-2">
                <AlertTitle className="text-xs font-medium">Configuração não encontrada</AlertTitle>
                <AlertDescription className="text-xs">
                  Empresa <strong>{empresa}</strong> e centro <strong>{user?.centerSelect}</strong> sem cadastro.
                </AlertDescription>
              </div>
            </Alert>
          )}

          {/* Configurações Principais - Layout compacto em grid */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-muted h-px flex-1" />
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">PRINCIPAIS</h3>
              <div className="bg-muted h-px flex-1" />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="tipo-impressao" className="text-xs font-medium flex items-center gap-1">
                  Tipo de Impressão
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">Define o tipo de impressão padrão para os mapas</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={estado.tipoImpressao}
                  onValueChange={(value) => handleUpdate('tipoImpressao', value)}
                >
                  <SelectTrigger id="tipo-impressao" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLIENTE">Cliente</SelectItem>
                    <SelectItem value="TRANSPORTE">Transporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tipo-conferencia" className="text-xs font-medium flex items-center gap-1">
                  Impressão Conferência
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">Tipo de impressão para documentos de conferência</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select
                  value={estado.tipoImpressaoConferencia}
                  onValueChange={(value) =>
                    handleUpdate(
                      'tipoImpressaoConferencia',
                      value as 'TRANSPORTE' | 'CLIENTE',
                    )
                  }
                >
                  <SelectTrigger id="tipo-conferencia" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLIENTE">Cliente</SelectItem>
                    <SelectItem value="TRANSPORTE">Transporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="empresa" className="text-xs font-medium">Empresa</Label>
                <Select
                  value={empresa}
                  onValueChange={(value) =>
                    setEmpresa(value as 'DPA' | 'ITB' | 'LDB')
                  }
                >
                  <SelectTrigger id="empresa" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DPA">DPA</SelectItem>
                    <SelectItem value="ITB">ITB</SelectItem>
                    <SelectItem value="LDB">LDB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Configurações Avançadas - Mais compactas */}
          <Collapsible open={isOpen} onOpenChange={temErro ? undefined : setIsOpen} disabled={temErro}>
            <div className="space-y-3">
              <CollapsibleTrigger 
                className="flex w-full items-center justify-between rounded-md border p-3 hover:bg-muted/50 transition-colors"
                disabled={temErro}
              >
                <div className="flex items-center gap-2">
                  <div className={`bg-primary/10 rounded p-1.5 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                    <ChevronDown className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold">Configurações Avançadas</h3>
                    <p className="text-muted-foreground text-xs">
                      Quebra de palete, separação e FIFO
                    </p>
                  </div>
                </div>
                <Badge variant={isOpen ? "default" : "outline"} className="text-xs">
                  {isOpen ? 'Expandido' : 'Expandir'}
                </Badge>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-4">
                {/* Quebra de Palete - Layout mais compacto */}
                <div className="rounded-lg border p-3 space-y-3">
                  <h4 className="text-sm font-medium">Quebra de Palete</h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="flex items-center justify-between rounded border p-3">
                      <div>
                        <Label className="text-xs font-medium">Ativar Quebra</Label>
                        <p className="text-muted-foreground text-xs">Habilitar quebra</p>
                      </div>
                      <Switch
                        checked={estado.quebraPalete}
                        onCheckedChange={(checked) =>
                          handleUpdate('quebraPalete', checked)
                        }
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Tipo de Quebra</Label>
                      <Select
                        value={estado.tipoQuebra || undefined}
                        onValueChange={(value) =>
                          handleUpdate(
                            'tipoQuebra',
                            value as 'LINHAS' | 'PERCENTUAL',
                          )
                        }
                        disabled={!estado.quebraPalete}
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PERCENTUAL">Porcentual</SelectItem>
                          <SelectItem value="LINHAS">Linhas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Valor</Label>
                      <Input
                        type="text"
                        value={estado.valorQuebra || ''}
                        onChange={(e) =>
                          handleUpdate('valorQuebra', e.target.value || null)
                        }
                        placeholder="Digite o valor"
                        disabled={!estado.quebraPalete}
                        className="h-9 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Opções de Separação - Mais compacto */}
                <div className="rounded-lg border p-3 space-y-3">
                  <h4 className="text-sm font-medium">Opções de Separação</h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="flex items-center justify-between rounded border p-3">
                      <div>
                        <Label className="text-xs font-medium">Separar Palete Full</Label>
                        <p className="text-muted-foreground text-xs">Paletes completos</p>
                      </div>
                      <Switch
                        checked={estado.separarPaleteFull}
                        onCheckedChange={(checked) =>
                          handleUpdate('separarPaleteFull', checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded border p-3">
                      <div>
                        <Label className="text-xs font-medium">Separar Unidades</Label>
                        <p className="text-muted-foreground text-xs">Unidades individuais</p>
                      </div>
                      <Switch
                        checked={estado.separarUnidades}
                        onCheckedChange={(checked) =>
                          handleUpdate('separarUnidades', checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Outras Configurações - Compactado */}
                <div className="rounded-lg border p-3 space-y-3">
                  <h4 className="text-sm font-medium">Outras Configurações</h4>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">Exibir no Cabeçalho</Label>
                      <Select
                        value={estado.exibirInfoCabecalho || undefined}
                        onValueChange={(value) =>
                          handleUpdate(
                            'exibirInfoCabecalho',
                            value as 'NENHUM' | 'PRIMEIRO' | 'TODOS',
                          )
                        }
                      >
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NENHUM">Nenhum</SelectItem>
                          <SelectItem value="PRIMEIRO">Primeiro</SelectItem>
                          <SelectItem value="TODOS">Todos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">% Data Máxima</Label>
                      <Input
                        type="number"
                        value={estado.dataMaximaPercentual}
                        onChange={(e) =>
                          handleUpdate(
                            'dataMaximaPercentual',
                            Number(e.target.value) || 0,
                          )
                        }
                        className="h-9 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Segregar por FIFO</Label>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                      <div className="flex items-center space-x-2 rounded border p-2">
                        <Checkbox
                          id="fifo-amarelo"
                          checked={
                            estado.segregarFifo?.includes('amarelo') || false
                          }
                          onCheckedChange={(checked) => {
                            const current = estado.segregarFifo || [];
                            const updated = checked
                              ? [...new Set([...current, 'amarelo'])]
                              : current.filter((item) => item !== 'amarelo');
                            handleUpdate('segregarFifo', updated);
                          }}
                        />
                        <Label
                          htmlFor="fifo-amarelo"
                          className="flex-1 cursor-pointer text-xs"
                        >
                          Amarelo
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded border p-2">
                        <Checkbox
                          id="fifo-vermelho"
                          checked={
                            estado.segregarFifo?.includes('vermelho') || false
                          }
                          onCheckedChange={(checked) => {
                            const current = estado.segregarFifo || [];
                            const updated = checked
                              ? [...new Set([...current, 'vermelho'])]
                              : current.filter((item) => item !== 'vermelho');
                            handleUpdate('segregarFifo', updated);
                          }}
                        />
                        <Label
                          htmlFor="fifo-vermelho"
                          className="flex-1 cursor-pointer text-xs"
                        >
                          Vermelho
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded border p-2">
                        <Checkbox
                          id="fifo-laranja"
                          checked={
                            estado.segregarFifo?.includes('laranja') || false
                          }
                          onCheckedChange={(checked) => {
                            const current = estado.segregarFifo || [];
                            const updated = checked
                              ? [...new Set([...current, 'laranja'])]
                              : current.filter((item) => item !== 'laranja');
                            handleUpdate('segregarFifo', updated);
                          }}
                        />
                        <Label
                          htmlFor="fifo-laranja"
                          className="flex-1 cursor-pointer text-xs"
                        >
                          Laranja
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}