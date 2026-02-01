"use client";

import { Input } from "@/_shared/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_shared/_components/ui/select";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { value: "", label: "Todos os status" },
  { value: "AGUARDANDO_LIBERACAO", label: "Aguardando Liberação" },
  { value: "AGUARDANDO_CONFERENCIA", label: "Aguardando Conferência" },
  { value: "EM_CONFERENCIA", label: "Em Conferência" },
  { value: "CONFERENCIA_FINALIZADA", label: "Conferência Finalizada" },
  { value: "FINALIZADO", label: "Finalizado" },
  { value: "CANCELADO", label: "Cancelado" },
];

interface DemandasFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  className?: string;
}

export function DemandasFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  className,
}: DemandasFiltersProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row items-stretch sm:items-center gap-4", className)}>
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar demanda por ID, placa, motorista..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
      <Select value={statusFilter || "all"} onValueChange={(v) => onStatusChange(v === "all" ? "" : v)}>
        <SelectTrigger className="w-full sm:w-[220px] shrink-0">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value || "all"} value={opt.value || "all"}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
