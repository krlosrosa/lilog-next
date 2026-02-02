"use client";

import Link from "next/link";
import { InventoryForm } from "../components/InventoryForm";
import { Card, CardContent, CardHeader } from "@/_shared/_components/ui/card";
import { Button } from "@/_shared/_components/ui/button";
import { ArrowLeft } from "lucide-react";

export function NewInventoryPage() {
  return (
    <div className="w-full px-4 py-6 md:px-6 md:py-8 space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
          <Link href="/estoque">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para listagem
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Nova ordem de inventário
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Defina o nome da ordem, o escopo da contagem (Rua ou Categoria) e
            anexe o arquivo contábil (Saldo do Sistema).
          </p>
        </div>
      </header>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="space-y-1">
          <h2 className="text-lg font-semibold">Dados da ordem</h2>
          <p className="text-sm text-muted-foreground">
            Preencha os campos e envie o arquivo CSV ou XLSX com o saldo
            contábil de referência.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <InventoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
