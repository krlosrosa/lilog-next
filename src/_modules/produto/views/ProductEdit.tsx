"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ProductEditForm } from "../components/ProductEditForm";
import { Card, CardContent, CardHeader } from "@/_shared/_components/ui/card";
import { Button } from "@/_shared/_components/ui/button";
import { Skeleton } from "@/_shared/_components/ui/skeleton";
import { ArrowLeft, AlertCircle, Package } from "lucide-react";
import { useProductEdit } from "../hooks/useProductEdit";

export default function ProductEdit() {
  const params = useParams();
  const router = useRouter();
  const sku = typeof params.sku === "string" ? params.sku : null;
  const {
    produto,
    initialValues,
    isLoading,
    isError,
    error,
  } = useProductEdit(sku);

  function handleSuccess() {
    router.push("/produto");
  }

  if (!sku) {
    return (
      <div className="w-full px-4 py-6 md:px-6 md:py-8 space-y-8">
        <Card className="shadow-sm border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col sm:flex-row items-start gap-4 py-6">
            <div className="rounded-full bg-destructive/10 p-2 shrink-0">
              <AlertCircle className="h-5 w-5 text-destructive" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-destructive mb-1">SKU não informado</h3>
              <p className="text-sm text-muted-foreground">
                Acesse a edição através da listagem de produtos.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="shrink-0">
              <Link href="/produto">Voltar para listagem</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Editar produto
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {sku && `Atualize os dados do produto SKU: ${sku}`}
          </p>
        </div>
      </header>

      {isLoading && (
        <Card className="shadow-sm border-border/50">
          <CardHeader className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isError && (
        <Card className="shadow-sm border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col sm:flex-row items-start gap-4 py-6">
            <div className="rounded-full bg-destructive/10 p-2 shrink-0">
              <AlertCircle className="h-5 w-5 text-destructive" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-destructive mb-1">
                Erro ao carregar produto
              </h3>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error
                  ? error.message
                  : "Não foi possível carregar o produto. Verifique o SKU e tente novamente."}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                SKU: <strong>{sku}</strong>
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="shrink-0">
              <Link href="/produto">Voltar para listagem</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {!initialValues && !isLoading && !isError && (
        <Card className="shadow-sm border-dashed border-border/70 bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Package className="h-8 w-8 text-muted-foreground" aria-hidden />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              Produto não encontrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              O produto com SKU <strong>{sku}</strong> não foi encontrado na listagem.
            </p>
            <Button asChild>
              <Link href="/produto">Voltar para listagem</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {initialValues && produto && !isLoading && !isError && (
        <Card className="shadow-sm border-border/50 animate-in fade-in duration-300">
          <CardHeader className="space-y-1">
            <h2 className="text-lg font-semibold">Dados do produto</h2>
            <p className="text-sm text-muted-foreground">
              Edite os campos e clique em Atualizar para salvar as alterações.
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <ProductEditForm sku={sku} onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
