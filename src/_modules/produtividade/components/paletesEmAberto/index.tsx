'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/_shared/_components/ui/select";
import { Button } from "@/_shared/_components/ui/button";
import { Badge } from "@/_shared/_components/ui/badge";
import { Skeleton } from "@/_shared/_components/ui/skeleton";
import { usePaletesEmAberto } from "../../hooks/usePaletesEmAberto";
import { TablePaletesEmAberto } from "./tablePaletesEmAberto";
import { columnsPaletesEmAberto } from "./columnsPaletesEmAberto";
import { Calendar, Filter, RefreshCw } from "lucide-react";

const processos = [
  {
    value: 'SEPARACAO',
    label: 'Separação',
  },
  {
    value: 'CONFERENCIA',
    label: 'Conferência',
  },
  {
    value: 'CARREGAMENTO',
    label: 'Carregamento',
  },
] as const;

export default function PaletesEmAberto() {
  const { 
    data, 
    setData, 
    processo, 
    setProcesso, 
    paletesEmAberto, 
    isBuscandoPaletesEmAberto 
  } = usePaletesEmAberto();

  const totalPaletes = paletesEmAberto?.length || 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Paletes em Aberto</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie os paletes que ainda não foram iniciados no processo
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle className="text-lg">Filtros</CardTitle>
          </div>
          <CardDescription>
            Filtre os paletes em aberto por data e processo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            {/* Data */}
            <div className="space-y-2 flex-1">
              <Label htmlFor="data" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Data
              </Label>
              <Input 
                id="data"
                type="date" 
                value={data} 
                onChange={(e) => setData(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Processo */}
            <div className="space-y-2 flex-1">
              <Label htmlFor="processo">Processo</Label>
              <Select value={processo} onValueChange={setProcesso}>
                <SelectTrigger id="processo">
                  <SelectValue placeholder="Selecione um processo" />
                </SelectTrigger>
                <SelectContent>
                  {processos.map((processo) => (
                    <SelectItem key={processo.value} value={processo.value}>
                      {processo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Botão Buscar */}
            <div className="space-y-2 flex items-end">
              <Button 
                onClick={() => {}} 
                className="w-full sm:w-auto"
                disabled={isBuscandoPaletesEmAberto}
              >
                {isBuscandoPaletesEmAberto ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Filter className="h-4 w-4 mr-2" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Tabela */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Paletes em Aberto</CardTitle>
              <CardDescription>
                Lista de paletes que ainda não foram finalizados no processo selecionado
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm">
              {totalPaletes} {totalPaletes === 1 ? 'palete' : 'paletes'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isBuscandoPaletesEmAberto ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <TablePaletesEmAberto 
              columns={columnsPaletesEmAberto} 
              data={paletesEmAberto || []} 
            />
          )}
        </CardContent>
      </Card>

      {/* Estado Vazio */}
      {!isBuscandoPaletesEmAberto && totalPaletes === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="rounded-full bg-muted p-4">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Nenhum palete em aberto</h3>
                <p className="text-muted-foreground mt-2">
                  Não foram encontrados paletes em aberto para os filtros selecionados.
                </p>
              </div>
              <Button variant="outline" onClick={() => {}}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}