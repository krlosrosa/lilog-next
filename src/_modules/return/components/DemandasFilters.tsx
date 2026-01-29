'use client';

import { Input } from "@/_shared/_components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface DemandasFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  className?: string;
}

export function DemandasFilters({ 
  searchQuery, 
  onSearchChange,
  className 
}: DemandasFiltersProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar demanda por ID, placa, motorista..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
    </div>
  );
}
