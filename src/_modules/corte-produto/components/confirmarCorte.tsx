'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { Scissors, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useCorte } from "../context/corte.provider";
import { useState } from "react";
import { Separator } from "@/_shared/_components/ui/separator";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { useAddCorteProduto } from "../hooks/useAddCorteProduto";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_shared/_components/ui/select";
import { Label } from "@/_shared/_components/ui/label";
import { TipoCorteEnum } from "../enums/tipor-corte";

interface ConfirmarCorteProps {
  children?: React.ReactNode;
}

export default function ConfirmarCorte({ children }: ConfirmarCorteProps) {
  const { selectedProdutos, setMotivoCorte, motivoCorte } = useCorte();
  const { handleAddCorteProduto, isCriandoCorteProduto } = useAddCorteProduto();
  const [isOpen, setIsOpen] = useState(false);

  const totalCaixas = selectedProdutos.reduce((acc, item) => acc + (item.caixas || 0), 0);
  const totalUnidades = selectedProdutos.reduce((acc, item) => acc + (item.quantidade || 0), 0);

  const motivosCorte = [
    { value: TipoCorteEnum.FALTA_MERCADORIA, label: 'Falta de Mercadoria' },
    { value: TipoCorteEnum.FALTA_ESPACO, label: 'Falta de Espaço' },
    { value: TipoCorteEnum.RECUSA_SEFAZ, label: 'Recusa SEFAZ' },
  ];

  const motivoPreenchido = !!motivoCorte;

  const handleConfirmar = () => {
    handleAddCorteProduto();
    setIsOpen(false);
  };

  const handleCancelar = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-2" size="sm">
            <Scissors className="h-4 w-4" />
            Confirmar Corte
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-primary" />
            Confirmar Corte de Produtos
          </DialogTitle>
          <DialogDescription>
            Revise os itens selecionados antes de confirmar o corte.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Motivo do Corte */}
          <div className="space-y-2">
            <Label htmlFor="motivo-corte" className="text-sm font-medium">
              Motivo do Corte
            </Label>
            <Select value={motivoCorte} onValueChange={setMotivoCorte}>
              <SelectTrigger id="motivo-corte" className="w-full">
                <SelectValue placeholder="Selecione o motivo do corte" />
              </SelectTrigger>
              <SelectContent>
                {motivosCorte.map((motivo) => (
                  <SelectItem key={motivo.value} value={motivo.value}>
                    {motivo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resumo */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total de Itens</p>
                <p className="text-2xl font-bold">{selectedProdutos.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total de Caixas</p>
                <p className="text-2xl font-bold">{totalCaixas}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total de Unidades</p>
                <p className="text-2xl font-bold">{totalUnidades}</p>
              </div>
            </div>
          </div>

          {/* Tabela de Itens */}
          <div className="max-h-[300px] overflow-auto border rounded-md">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 sticky top-0 z-10">
                  <tr>
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">SKU</th>
                    <th className="text-left py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">Lote</th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">Caixas</th>
                    <th className="text-right py-2 px-3 font-semibold text-muted-foreground whitespace-nowrap">Unidades</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProdutos.map((item, index) => (
                    <tr
                      key={`${item.sku}-${item.lote}-${index}`}
                      className="border-t hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-1.5 px-3 font-medium whitespace-nowrap">{item.sku}</td>
                      <td className="py-1.5 px-3 whitespace-nowrap">{item.lote}</td>
                      <td className="py-1.5 px-3 text-right font-semibold whitespace-nowrap">{item.caixas || 0}</td>
                      <td className="py-1.5 px-3 text-right font-semibold whitespace-nowrap">{item.quantidade || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerta */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Esta ação irá processar o corte dos produtos selecionados. Certifique-se de que todas as informações estão corretas.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancelar}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleConfirmar} className="gap-2" disabled={isCriandoCorteProduto || !motivoPreenchido}>
            <CheckCircle2 className="h-4 w-4" />
            {isCriandoCorteProduto ? 'Salvando...' : 'Confirmar Corte'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
