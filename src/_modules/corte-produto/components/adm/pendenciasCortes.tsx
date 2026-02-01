'use client';

import { useState } from "react";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import ListarCortePendentesAdm from "../listarCortePendentesAdm";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PendenciasCortes() {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Pendências de Cortes
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5">
                Gerencie e acompanhe os cortes pendentes de aprovação
              </p>
            </div>
            <Button className="gap-2 shrink-0" onClick={() => router.push('/corte/adm/cadastrar')}>
              <Plus className="h-4 w-4" />
              Cadastrar Corte
            </Button>
          </div>

          {/* Filtro */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar por transporte ou SKU"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Conteúdo */}
          <div className="transition-all duration-300 ease-in-out">
            <ListarCortePendentesAdm filter={filter} />
          </div>
        </div>
      </div>
    </div>
  )
}