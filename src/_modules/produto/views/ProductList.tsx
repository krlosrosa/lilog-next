"use client";

import { useProductList } from "../hooks/useProductList";
import { ProductTable } from "../components/ProductTable";
import { ProductActionButtons } from "../components/ProductActionButtons";
import { AddVariosItens } from "../components/add-varios-itens";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Card, CardContent, CardHeader } from "@/_shared/_components/ui/card";
import { Skeleton } from "@/_shared/_components/ui/skeleton";
import { Search, AlertCircle, Package, FileQuestion } from "lucide-react";

export default function ProductList() {
  const {
    produtos,
    searchTerm,
    setSearchTerm,
    isLoading,
    isError,
    error,
  } = useProductList();

  const showEmptyState = !isLoading && produtos.length === 0 && !searchTerm;
  const showSearchEmptyState = !isLoading && produtos.length === 0 && searchTerm;
  const showContent = !isLoading && !isError;

  return (
    <div className="w-full px-4 py-6 md:px-6 md:py-8 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Produtos
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Gerencie o cadastro de produtos e importe em lote via planilha.
        </p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Card className="flex-1 shadow-sm border-border/50 max-w-md">
          <CardHeader className="pb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" aria-hidden />
              Buscar produtos
            </h2>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2"
            >
              <Label htmlFor="search-produtos" className="text-sm font-medium sr-only">
                Buscar por SKU, descrição, EAN, DUM, segmento ou empresa
              </Label>
              <Input
                id="search-produtos"
                type="search"
                placeholder="SKU, descrição, EAN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={isLoading}
                className="h-10 bg-background"
                aria-describedby="search-hint"
              />
              <p id="search-hint" className="text-xs text-muted-foreground">
                Digite para filtrar a lista em tempo real.
              </p>
            </form>
          </CardContent>
        </Card>
        <ProductActionButtons />
      </div>

      {isError && (
        <Card className="shadow-sm border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col sm:flex-row items-start gap-4 py-6">
            <div className="rounded-full bg-destructive/10 p-2 shrink-0">
              <AlertCircle className="h-5 w-5 text-destructive" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-destructive mb-1">
                Erro ao carregar produtos
              </h3>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error
                  ? error.message
                  : "Não foi possível carregar os dados. Tente novamente."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-md rounded-md" />
          <div className="rounded-md border border-border/50 overflow-hidden">
            <Skeleton className="h-12 w-full" />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-12 w-full border-t" />
            ))}
          </div>
        </div>
      )}

      {showContent && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {showEmptyState ? (
            <Card className="shadow-sm border-dashed border-border/70 bg-muted/30">
              <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" aria-hidden />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Nenhum produto cadastrado
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm mb-4">
                  Cadastre um novo produto ou importe vários através de planilha
                  Excel.
                </p>
                <ProductActionButtons />
              </CardContent>
            </Card>
          ) : (
            <ProductTable
              produtos={produtos}
              emptyMessage={
                showSearchEmptyState
                  ? "Nenhum produto encontrado para a busca informada."
                  : undefined
              }
            />
          )}

          <Card id="importar" className="shadow-sm border-border/50 scroll-mt-8">
            <CardHeader>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-muted-foreground" aria-hidden />
                Importar produtos em lote
              </h2>
              <p className="text-sm text-muted-foreground">
                Envie uma planilha Excel para cadastrar vários produtos de uma vez.
              </p>
            </CardHeader>
            <CardContent>
              <AddVariosItens />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
