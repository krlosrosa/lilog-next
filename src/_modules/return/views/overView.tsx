'use client';

import FloatButton from "@/_shared/_components/ui/floatButton";
import { useOverViewDevolucao } from "../hooks/useOverViewDevolucao";
import { DateSelector } from "../components/DateSelector";
import { StatsCards } from "../components/StatsCards";
import { DemandasFilters } from "../components/DemandasFilters";
import { DemandasTable } from "../components/DemandasTable";
import Link from "next/link";

export default function OverViewDevolucao() {
  const {
    demandas,
    isLoadingDemandas,
    dataRef,
    setDataRef,
    searchQuery,
    setSearchQuery,
  } = useOverViewDevolucao();

  return (
    <div className="space-y-6">
      {/* Seletor de Data */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Visão Geral de Devoluções</h1>
        <DateSelector
          data={dataRef}
          setData={setDataRef}
          label=""
          className="w-[280px]"
        />
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
      />

      {/* Tabela de Demandas */}
      <DemandasTable
        demandas={demandas}
        isLoading={isLoadingDemandas}
        searchQuery={searchQuery}
      />

      <Link href="/return/cadastrar-demanda">
        <FloatButton />
      </Link>
    </div>
  )
}
