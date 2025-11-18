'use client';

import { AugmentedZodDto } from "@/_services/api/model";
import { Button } from "@/_shared/_components/ui/button";
import { Trash2, Package, Scissors } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import ConfirmarCorte from "../confirmarCorte";
import { Dispatch, SetStateAction } from "react";

type ListaItensSelecionadosParaCorteProps = {
  selectedProdutos: AugmentedZodDto[];
  setSelectedProdutos: Dispatch<SetStateAction<AugmentedZodDto[]>>;
}

export default function ListaItensSelecionadosParaCorte({ selectedProdutos, setSelectedProdutos }: ListaItensSelecionadosParaCorteProps) {

  const handleRemoverItem = (index: number) => {
    setSelectedProdutos((prev: AugmentedZodDto[]) => prev.filter((_, i) => i !== index));
  };

  if (selectedProdutos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground text-sm">Nenhum item selecionado para corte</p>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Itens Selecionados para Corte</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedProdutos.length} {selectedProdutos.length === 1 ? 'item selecionado' : 'itens selecionados'}
            </p>
          </div>
          <ConfirmarCorte>
            <Button 
              className="gap-2"
              size="sm"
            >
              <Scissors className="h-4 w-4" />
              Confirmar Corte
            </Button>
          </ConfirmarCorte>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {selectedProdutos.map((item, index) => (
            <div 
              key={`${item.sku}-${item.lote}-${index}`}
              className="border rounded-lg bg-card hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
                    <div className="min-w-0">
                      <span className="text-xs text-muted-foreground block">SKU</span>
                      <p className="font-medium truncate">{item.sku}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-muted-foreground block">Descrição</span>
                      <p className="font-medium truncate">{item.descricao || '-'}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-muted-foreground block">Lote</span>
                      <p className="font-medium">{item.lote}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-muted-foreground block">Transporte</span>
                      <p className="font-medium">{item.transporte}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-muted-foreground block">Caixas</span>
                      <p className="font-semibold">{item.caixas || 0}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs text-muted-foreground block">Unidades</span>
                      <p className="font-semibold">{item.quantidade || 0}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 ml-2"
                    onClick={() => handleRemoverItem(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
