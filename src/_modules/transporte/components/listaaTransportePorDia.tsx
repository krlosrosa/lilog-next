'use client';
import { columnsTransporte } from "./table/columnsTransporte";
import { DataTableTransporte } from "./table/data-table-Transporte";
import useGetAllTransportes from "../hooks/useGetAllTransportes";
import { useTransporteFilter } from "../hooks/useTransporteFilter";
import { Loader2 } from "lucide-react";

export default function ListaTransportePorDia() {
  const { filters } = useTransporteFilter();
  const { transportes, isLoading } = useGetAllTransportes(filters.dataRegistro);

  return (
    <div>
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <DataTableTransporte columns={columnsTransporte} data={transportes ?? []} />}
    </div>
  )
}