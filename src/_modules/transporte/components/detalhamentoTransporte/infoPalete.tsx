import { TransporteComRelacionamentosGetDtoPaletesItem } from "@/_services/api/model";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import { Package, Box, Layers, ChevronDown, ChevronRight, Palette } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/_shared/_components/ui/collapsible";
import { useState } from "react";

export default function InfoPaleteList({ paletes }: { paletes: TransporteComRelacionamentosGetDtoPaletesItem[] }) {
  
  const formatarData = (dataString?: string) => {
    if (!dataString) return '-';
    return new Date(dataString).toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Agrupar paletes por tipo de processo
  const paletesAgrupados = paletes.reduce((acc, palete) => {
    const processo = palete.tipoProcesso || 'OUTROS';
    if (!acc[processo]) {
      acc[processo] = [];
    }
    acc[processo].push(palete);
    return acc;
  }, {} as Record<string, TransporteComRelacionamentosGetDtoPaletesItem[]>);

  // Ordenar os grupos por ordem desejada
  const ordemProcessos = ['SEPARACAO', 'CONFERENCIA', 'CARREGAMENTO'];
  const gruposOrdenados = Object.entries(paletesAgrupados).sort(([a], [b]) => {
    const indexA = ordemProcessos.indexOf(a);
    const indexB = ordemProcessos.indexOf(b);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  // Estado para controlar quais grupos estão abertos
  const [gruposAbertos, setGruposAbertos] = useState<Record<string, boolean>>({});

  const toggleGrupo = (processo: string) => {
    setGruposAbertos(prev => ({
      ...prev,
      [processo]: !prev[processo]
    }));
  };

  return(
    <div className="border rounded-lg bg-white">
      {/* Header principal do componente */}
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-lg">Paletes por Processo</h2>
          <Badge variant="secondary" className="text-sm h-6">
            {paletes.length} {paletes.length === 1 ? 'palete' : 'paletes'}
          </Badge>
        </div>
        
        {/* Resumo geral no header */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span className="font-medium">{paletes.reduce((sum, p) => sum + (p.quantidadeCaixas || 0), 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4" />
            <span className="font-medium">{paletes.reduce((sum, p) => sum + (p.quantidadeUnidades || 0), 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span className="font-medium">{paletes.reduce((sum, p) => sum + (p.quantidadePaletes || 0), 0)}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo dos grupos */}
      <div className="p-3 space-y-2">
        {gruposOrdenados.map(([processo, paletesDoGrupo]) => {
          const estaAberto = gruposAbertos[processo] ?? false; 
          
          return (
            <Collapsible 
              key={processo} 
              open={estaAberto} 
              onOpenChange={() => toggleGrupo(processo)}
              className="border rounded-md bg-white"
            >
              {/* Header do grupo collapsible */}
              <CollapsibleTrigger className="w-full p-3 transition-colors hover:bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {estaAberto ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                    <h3 className="font-medium text-sm capitalize">
                      {processo.toLowerCase()}
                    </h3>
                    <Badge variant="outline" className="text-xs h-5">
                      {paletesDoGrupo.length} {paletesDoGrupo.length === 1 ? 'palete' : 'paletes'}
                    </Badge>
                  </div>
                  
                  {/* Resumo do grupo no header */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      <span>{paletesDoGrupo.reduce((sum, p) => sum + (p.quantidadeCaixas || 0), 0)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Box className="w-3 h-3" />
                      <span>{paletesDoGrupo.reduce((sum, p) => sum + (p.quantidadeUnidades || 0), 0)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      <span>{paletesDoGrupo.reduce((sum, p) => sum + (p.quantidadePaletes || 0), 0)}</span>
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>

              {/* Conteúdo do grupo */}
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-2 border-t pt-2">
                  {paletesDoGrupo.map((palete) => (
                    <Card key={palete.id} className="w-full p-3 transition-shadow border shadow-sm hover:shadow-md">
                      <CardContent className="p-0">
                        {/* Primeira linha - Informações principais */}
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm">{palete.empresa}</span>
                            <Badge 
                              variant={palete.validado ? "default" : "secondary"} 
                              className="text-xs h-5"
                            >
                              {palete.validado ? '✓' : '…'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{palete.segmento}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Package className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs font-medium">{palete.quantidadeCaixas}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Box className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs font-medium">{palete.quantidadeUnidades}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Layers className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs font-medium">{palete.quantidadePaletes}</span>
                            </div>
                          </div>
                        </div>

                        {/* Segunda linha - Informações secundárias */}
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{palete.enderecoVisitado || 'Sem endereço'}</span>
                            <span>Demanda: {palete.demandaId || '-'}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs h-5">
                              {palete.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatarData(palete?.inicio?.toString())}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}