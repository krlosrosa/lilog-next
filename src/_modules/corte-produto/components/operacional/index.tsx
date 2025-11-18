'use client';
import { useState } from "react";
import ListaItensSelecionadosParaCorte from "./listaItensSelecionadosParaCorte";
import { ListaProdutosCorteOperacional } from "./listaProdutosCorteope";
import { Package, List, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuscarProdutosCorte } from "../../hooks/userBuscarProdutosCort";
import { useCorte } from "../../context/corte.provider";
import { useRouter } from "next/navigation";
import { Button } from "@/_shared/_components/ui/button";
import { Badge } from "@/_shared/_components/ui/badge";

export default function CorteOperacional() {
  const router = useRouter();
  const { produtosCorte, isBuscandoProdutosCorte, setTransporteId, transporteId, globalFilter, setGlobalFilter } = useBuscarProdutosCorte();
  const { selectedProdutos, setSelectedProdutos } = useCorte();
  const [step, setStep] = useState<('listaProdutos' | 'listaItensSelecionados')>('listaProdutos');
  
  const handleTabChange = (newStep: 'listaProdutos' | 'listaItensSelecionados') => {
    setStep(newStep);
  };
  
  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          {/* Header com botão voltar */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="h-9 w-9 shrink-0"
              aria-label="Voltar para página anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">Corte Operacional</h2>
            </div>
          </div>

          {/* Tabs Manual */}
          <div className="inline-flex h-9 w-full items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
            <button
              type="button"
              onClick={() => handleTabChange('listaProdutos')}
              className={cn(
                "inline-flex h-[calc(100%-2px)] flex-1 items-center justify-center gap-2 rounded-md border border-transparent px-3 py-1 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                step === 'listaProdutos'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Lista de Produtos"
              aria-selected={step === 'listaProdutos'}
            >
              <List className="h-4 w-4" />
              Lista de Produtos
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('listaItensSelecionados')}
              className={cn(
                "inline-flex h-[calc(100%-2px)] flex-1 items-center justify-center gap-2 rounded-md border border-transparent px-3 py-1 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                step === 'listaItensSelecionados'
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Itens Selecionados"
              aria-selected={step === 'listaItensSelecionados'}
            >
              <Package className="h-4 w-4" />
              <Badge variant="outline">{selectedProdutos.length}</Badge>
              Itens Selecionados
            </button>
          </div>

          {/* Conteúdo */}
          <div className="transition-all duration-300 ease-in-out">
            {step === 'listaProdutos' && (
              <div className="animate-in fade-in-0 slide-in-from-left-2 duration-300">
                <ListaProdutosCorteOperacional produtosCorte={produtosCorte ?? []} isBuscandoProdutosCorte={isBuscandoProdutosCorte} setTransporteId={setTransporteId} transporteId={transporteId} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
              </div>
            )}
            {step === 'listaItensSelecionados' && (
              <div className="animate-in fade-in-0 slide-in-from-right-2 duration-300">
                <ListaItensSelecionadosParaCorte selectedProdutos={selectedProdutos} setSelectedProdutos={setSelectedProdutos} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}