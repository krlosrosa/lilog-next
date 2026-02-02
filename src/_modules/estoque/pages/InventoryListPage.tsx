"use client";

import Link from "next/link";
import { useUser } from "@/_shared/providers/UserContext";
import { useInventariosByCenterAndData } from "../hooks/queries/useInventariosByCenterAndData";
import { Button } from "@/_shared/_components/ui/button";
import { Card, CardContent, CardHeader } from "@/_shared/_components/ui/card";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function getDataHoje() {
  return format(new Date(), "yyyy-MM-dd", { locale: ptBR });
}

export function InventoryListPage() {
  const { user } = useUser();
  const centerId = user?.centerSelect ?? null;
  const data = getDataHoje();
  const { data: inventarios, isLoading, isError } = useInventariosByCenterAndData(centerId, data);

  return (
    <div className="w-full px-4 py-6 md:px-6 md:py-8 space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Ordens de inventário
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Visualize e gerencie as ordens de inventário do centro.
          </p>
        </div>
        <Button asChild className="gap-2 shrink-0">
          <Link href="/estoque/novo">
            <Plus className="h-4 w-4" aria-hidden />
            Nova ordem
          </Link>
        </Button>
      </header>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="space-y-1">
          <h2 className="text-lg font-semibold">Listagem</h2>
          <p className="text-sm text-muted-foreground">
            Centro: {centerId || "—"} · Data: {data}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {!centerId && (
            <p className="text-muted-foreground text-sm py-4">
              Selecione um centro para listar as ordens de inventário.
            </p>
          )}
          {centerId && isLoading && (
            <p className="text-muted-foreground text-sm py-4">Carregando…</p>
          )}
          {centerId && isError && (
            <p className="text-destructive text-sm py-4">
              Erro ao carregar inventários. Tente novamente.
            </p>
          )}
          {centerId && !isLoading && !isError && inventarios && inventarios.length === 0 && (
            <p className="text-muted-foreground text-sm py-4">
              Nenhuma ordem de inventário para esta data. Crie uma nova ordem acima.
            </p>
          )}
          {centerId && !isLoading && inventarios && inventarios.length > 0 && (
            <ul className="divide-y divide-border text-sm">
              {inventarios.map((inv) => (
                <li
                  key={inv.id}
                  className="flex items-center justify-between py-3 first:pt-0"
                >
                  <div>
                    <span className="font-medium">{inv.descricao ?? `Inventário #${inv.id}`}</span>
                    <span className="text-muted-foreground ml-2">
                      {inv.tipo} · {inv.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
