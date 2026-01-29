'use client';

import { ListarDemandasDto } from "@/_services/api/model";
import { DataTableDemandaDevolucao } from "@/_modules/devolucao/components/tableDemanda/data-table-demanda-devolucao";
import { columnsDemandaReturn } from "./columnsDemandaReturn";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

interface DemandasTableProps {
  demandas: ListarDemandasDto[] | undefined;
  isLoading: boolean;
  searchQuery: string;
}

export function DemandasTable({ 
  demandas, 
  isLoading, 
  searchQuery 
}: DemandasTableProps) {
  const filteredDemandas = useMemo(() => {
    if (!demandas) return [];
    
    if (!searchQuery.trim()) return demandas;

    const query = searchQuery.toLowerCase();
    return demandas.filter((demanda) => {
      return (
        demanda.id.toString().includes(query) ||
        demanda.placa.toLowerCase().includes(query) ||
        demanda.motorista.toLowerCase().includes(query) ||
        (demanda.idTransportadora && demanda.idTransportadora.toLowerCase().includes(query)) ||
        (demanda.doca && demanda.doca.toLowerCase().includes(query))
      );
    });
  }, [demandas, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Carregando demandas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Demandas</h2>
        <p className="text-sm text-muted-foreground">
          {filteredDemandas.length} {filteredDemandas.length === 1 ? 'demanda encontrada' : 'demandas encontradas'}
        </p>
      </div>
      
      <DataTableDemandaDevolucao 
        columns={columnsDemandaReturn} 
        data={filteredDemandas} 
      />
    </div>
  );
}
