"use client";

import Link from "next/link";
import { ProductForm } from "../components/ProductForm";
import { Card, CardContent, CardHeader } from "@/_shared/_components/ui/card";
import { Button } from "@/_shared/_components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ProductCreate() {
  return (
    <div className="w-full px-4 py-6 md:px-6 md:py-8 space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
          <Link href="/produto">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para listagem
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Cadastrar produto
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Preencha os dados do produto para cadastrá-lo no sistema.
          </p>
        </div>
      </header>

      <Card className="shadow-sm border-border/50">
        <CardHeader className="space-y-1">
          <h2 className="text-lg font-semibold">Dados do produto</h2>
          <p className="text-sm text-muted-foreground">
            Informe os campos obrigatórios conforme a documentação do produto.
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
}
