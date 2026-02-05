'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import { Button } from "@/_shared/_components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/_shared/_components/ui/collapsible";
import { Separator } from "@/_shared/_components/ui/separator";
import { 
  FileText, 
  Package, 
  User, 
  Building, 
  ChevronDown, 
  ChevronUp,
  Plus,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { ReturnInfoGeralRavexNotasItem, ReturnInfoGeralRavexNotasItemItensItem } from "@/_services/api/model";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_shared/_components/ui/table";
import { Input } from "@/_shared/_components/ui/input";

interface NotaFiscalCardProps {
  nota: ReturnInfoGeralRavexNotasItem;
  idViagemRavex: string;
  demandaId: number;
  isAlreadyAdded: boolean;
  onAddNota: (nota: ReturnInfoGeralRavexNotasItem, itens: ReturnInfoGeralRavexNotasItemItensItem[], nfParcial?: string) => void;
  isAdding?: boolean;
}

export function NotaFiscalCard({
  nota,
  idViagemRavex,
  demandaId,
  isAlreadyAdded,
  onAddNota,
  isAdding = false,
}: NotaFiscalCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [itens, setItens] = useState<ReturnInfoGeralRavexNotasItemItensItem[]>(nota.itens ?? []);
  const [nfParcial, setNfParcial] = useState<string>('');

  useEffect(() => {
    setItens(nota.itens ?? []);
  }, [nota]);

  const handleItemChange = (item: ReturnInfoGeralRavexNotasItemItensItem) => {
    setItens(itens.map((i) => i.sku === item.sku ? item : i));
  };

  const hasDivergence = (item: ReturnInfoGeralRavexNotasItemItensItem) => {
    const qtdRavex = Number(item.quantidadeRavex ?? 0);
    const qtdCaixas = Number(item.quantidadeCaixas ?? 0);
    const decimal = Number(item.decimal ?? 0);
    const tol = 1e-6;
    return qtdRavex !== qtdCaixas && qtdRavex !== decimal;
  };

  const getTipoBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case 'DEVOLUCAO':
        return 'default';
      case 'DEVOLUCAO_PARCIAL':
        return 'outline';
      case 'REENTREGA':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className={`w-full border-l-4 ${isAlreadyAdded ? 'border-l-green-500 bg-green-50/50 dark:bg-green-950/20' : 'border-l-primary'}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="flex items-center gap-2 flex-wrap">
                  <span>Nota Fiscal #{nota.notaFiscal}</span>
                  {isAlreadyAdded && (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Já Adicionada
                    </Badge>
                  )}
                  {nota.notaFiscalParcial && (
                    <Badge variant="outline">
                      Parcial: {nota.notaFiscalParcial}
                    </Badge>
                  )}
                  <Badge variant={getTipoBadgeVariant(nota.tipo)}>
                    {nota.tipo}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{nota.empresa}</span>
                    </div>
                    {nota.operador && (
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{nota.operador}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Package className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{itens.length} item(s)</span>
                    </div>
                  </div>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          
          {nota.descMotivoDevolucao && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-md border border-yellow-200 dark:border-yellow-900">
              <p className="text-xs font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                Motivo de Devolução
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                {nota.descMotivoDevolucao}
              </p>
            </div>
          )}
        </CardHeader>

        <CollapsibleContent>
          <Separator />
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  Itens da Nota Fiscal
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead className="w-[100px]">Peso Líq.</TableHead>
                        <TableHead className="w-[100px]">Qtd. Ravex</TableHead>
                        <TableHead className="w-[100px]">Qtd. Caixas</TableHead>
                        <TableHead className="w-[100px]">Qtd. Unidades</TableHead>
                        <TableHead className="w-[100px]">Decimal</TableHead>
                        <TableHead className="w-[80px]">Fator</TableHead>
                        <TableHead className="w-[80px]">Divergência</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itens.map((item) => {
                        const divergencia = hasDivergence(item);
                        return (
                          <TableRow
                            key={item.sku}
                            className={divergencia ? "bg-destructive/5" : undefined}
                          >
                            <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                            <TableCell className="text-sm">{item.descricao}</TableCell>
                            <TableCell className="text-sm">{item.pesoLiquido}</TableCell>
                            <TableCell className="text-sm">{item.quantidadeRavex}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.quantidadeCaixas ?? 0}
                                onChange={(e) => {
                                  handleItemChange({
                                    ...item,
                                    quantidadeCaixas: parseInt(e.target.value) || 0,
                                  });
                                }}
                                className="h-8 w-full"
                                disabled={isAlreadyAdded}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.quantidadeUnidades ?? 0}
                                onChange={(e) => {
                                  handleItemChange({
                                    ...item,
                                    quantidadeUnidades: parseInt(e.target.value) || 0,
                                  });
                                }}
                                className="h-8 w-full"
                                disabled={isAlreadyAdded}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.decimal ?? 0}
                                onChange={(e) => {
                                  const v = parseFloat(e.target.value);
                                  handleItemChange({
                                    ...item,
                                    decimal: Number.isNaN(v) ? 0 : v,
                                  });
                                }}
                                className="h-8 w-full"
                                disabled={isAlreadyAdded}
                              />
                            </TableCell>
                            <TableCell className="text-sm">{item.fatorConversao}</TableCell>
                            <TableCell>
                              {divergencia ? (
                                <Badge variant="destructive" className="text-xs">
                                  Sim
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground text-xs">—</span>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {!isAlreadyAdded && (
                <div className="flex justify-end pt-2 border-t">
                  <Button
                    onClick={() => onAddNota(nota, itens, nota.tipo === 'DEVOLUCAO_PARCIAL' ? nfParcial : undefined)}
                    disabled={isAdding}
                    className="gap-2"
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adicionando...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Adicionar Nota Fiscal
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
