'use client';

import { useOverViewDevolucao } from "../hooks/useOverViewDevolucao";
import { DateSelector } from "../components/DateSelector";
import { StatsCards } from "../components/StatsCards";
import { DemandasFilters } from "../components/DemandasFilters";
import { DemandasTable } from "../components/DemandasTable";
import { Button } from "@/_shared/_components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OverViewDevolucao() {
  const router = useRouter();
  const {
    demandas,
    isLoadingDemandas,
    dataRef,
    setDataRef,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
  } = useOverViewDevolucao();

  return (
    <div className="space-y-6">
      {/* Seletor de Data */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visão Geral de Devoluções</h1>
        <div className="flex items-center gap-3">
          <DateSelector
            data={dataRef}
            setData={setDataRef}
            label=""
            className="w-[280px]"
          />
          <Button
            onClick={() => router.push('/return/cadastrar-demanda')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Adicionar Demanda
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <StatsCards
        demandas={demandas}
        isLoading={isLoadingDemandas}
      />

      {/* Filtros e Busca */}
      <DemandasFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Tabela de Demandas */}
      <DemandasTable
        demandas={demandas}
        isLoading={isLoadingDemandas}
        searchQuery={searchQuery}
      />
    </div>
  )
}
