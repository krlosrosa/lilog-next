'use client';
import { useTransporteFilter } from "../hooks/useTransporteFilter";
import { Button } from "@/_shared/_components/ui/button";
import { Calendar } from "@/_shared/_components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/_shared/_components/ui/popover";
import { Label } from "@/_shared/_components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_shared/_components/ui/select";
import { CalendarIcon, Filter, X, Truck, CheckSquare, Package, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Switch } from "@/_shared/_components/ui/switch";

export default function FiltrosTransporte() {
  const { filters, setFilters } = useTransporteFilter();
  const [cargaParada, setCargaParada] = useState<boolean>(filters.cargaParada === 'true');
  const [date, setDate] = useState<Date | undefined>(
    filters.dataRegistro ? new Date(filters.dataRegistro) : undefined
  );

  useEffect(() => {
    setFilters({
      dataRegistro: date ? format(date, 'yyyy-MM-dd') : null,
    });
  }, [date, setFilters]);

  useEffect(() => {
    setFilters({
      cargaParada: cargaParada ? 'true' : 'false',
    });
  }, [cargaParada, setFilters]);

  const handleStatusChange = (field: 'separacao' | 'conferencia' | 'carregamento' | 'cargaParada', value: string) => {
    setFilters({
      [field]: value === 'all' ? null : value,
    });
  };

  const getStatusIcon = (type: 'separacao' | 'conferencia' | 'carregamento' | 'cargaParada') => {
    switch (type) {
      case 'separacao': return <Package className="h-3.5 w-3.5" />;
      case 'conferencia': return <CheckSquare className="h-3.5 w-3.5" />;
      case 'carregamento': return <Truck className="h-3.5 w-3.5" />;
      default: return <Filter className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Grid de Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-muted/30 rounded-lg border">
        {/* Filtro de Data */}
        <div className="space-y-2">
          <Label htmlFor="dataRegistro" className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Data de Registro
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dataRegistro"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-11",
                  !date && "text-muted-foreground",
                  date && "border-primary/50 bg-primary/5"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  <span className="font-medium">
                    {format(date, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Filtro de Separação */}
        <div className="space-y-2">
          <Label htmlFor="separacao" className="text-sm font-medium flex items-center gap-2">
            {getStatusIcon('separacao')}
            Separação
          </Label>
          <Select
            value={filters.separacao || 'all'}
            onValueChange={(value) => handleStatusChange('separacao', value)}
          >
            <SelectTrigger 
              id="separacao" 
              className={cn(
                "h-11",
                filters.separacao && "border-primary/50 bg-primary/5"
              )}
            >
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="NAO_INICIADO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Não Iniciado
                </div>
              </SelectItem>
              <SelectItem value="EM_PROGRESSO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  Em Progresso
                </div>
              </SelectItem>
              <SelectItem value="CONCLUIDO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Concluído
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Conferência */}
        <div className="space-y-2">
          <Label htmlFor="conferencia" className="text-sm font-medium flex items-center gap-2">
            {getStatusIcon('conferencia')}
            Conferência
          </Label>
          <Select
            value={filters.conferencia || 'all'}
            onValueChange={(value) => handleStatusChange('conferencia', value)}
          >
            <SelectTrigger 
              id="conferencia" 
              className={cn(
                "h-11",
                filters.conferencia && "border-primary/50 bg-primary/5"
              )}
            >
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="NAO_INICIADO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Não Iniciado
                </div>
              </SelectItem>
              <SelectItem value="EM_PROGRESSO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  Em Progresso
                </div>
              </SelectItem>
              <SelectItem value="CONCLUIDO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Concluído
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filtro de Carregamento */}
        <div className="space-y-2">
          <Label htmlFor="carregamento" className="text-sm font-medium flex items-center gap-2">
            {getStatusIcon('carregamento')}
            Carregamento
          </Label>
          <Select
            value={filters.carregamento || 'all'}
            onValueChange={(value) => handleStatusChange('carregamento', value)}
          >
            <SelectTrigger 
              id="carregamento" 
              className={cn(
                "h-11",
                filters.carregamento && "border-primary/50 bg-primary/5"
              )}
            >
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="NAO_INICIADO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  Não Iniciado
                </div>
              </SelectItem>
              <SelectItem value="EM_PROGRESSO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  Em Progresso
                </div>
              </SelectItem>
              <SelectItem value="CONCLUIDO">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  Concluído
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="cargaParada" className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="h-3.5 w-3.5" />
            Carga Parada
          </Label>
          <Switch id="cargaParada" checked={cargaParada} onCheckedChange={setCargaParada} />
        </div>
      </div>
    </div>
  );
}