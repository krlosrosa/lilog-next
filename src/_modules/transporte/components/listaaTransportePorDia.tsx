'use client';
import { columnsTransporte } from "./table/columnsTransporte";
import { DataTableTransporte } from "./table/data-table-Transporte";
import useGetAllTransportes from "../hooks/useGetAllTransportes";
import { useTransporteFilter } from "../hooks/useTransporteFilter";
import { Loader2 } from "lucide-react";
import { FilterTable } from "./table/filterTable";
import { useState } from "react";
import CardDashboard from "./cardDashboard";

export default function ListaTransportePorDia() {
  const { filters } = useTransporteFilter();
  const [globalFilter, setGlobalFilter] = useState('');
  const { transportes, isLoading } = useGetAllTransportes(filters.dataRegistro);

  return (
    <div>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 
      <>
        <CardDashboard />
        <FilterTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        <DataTableTransporte columns={columnsTransporte} data={transportes ?? []} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </>
      }
    </div>
  )
}