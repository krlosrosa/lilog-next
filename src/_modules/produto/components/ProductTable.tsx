"use client";

import Link from "next/link";
import type { CreateProdutoDto } from "@/_services/api/model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_shared/_components/ui/table";
import { Badge } from "@/_shared/_components/ui/badge";
import { Button } from "@/_shared/_components/ui/button";
import { Pencil } from "lucide-react";

interface ProductTableProps {
  produtos: CreateProdutoDto[];
  emptyMessage?: string;
}

export function ProductTable({ produtos, emptyMessage = "Nenhum produto encontrado." }: ProductTableProps) {
  if (produtos.length === 0) {
    return (
      <div className="rounded-md border border-border/50 bg-muted/30 py-12 text-center">
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>SKU</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Código EAN</TableHead>
            <TableHead>Código DUM</TableHead>
            <TableHead className="text-center">Shelf</TableHead>
            <TableHead className="text-center">Un/Caixa</TableHead>
            <TableHead className="text-center">Cx/Pallet</TableHead>
            <TableHead>Segmento</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead className="w-[80px] text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produtos.map((produto) => (
            <TableRow key={produto.sku} className="hover:bg-muted/30">
              <TableCell className="font-medium">{produto.sku}</TableCell>
              <TableCell className="max-w-[200px] truncate" title={produto.descricao}>
                {produto.descricao}
              </TableCell>
              <TableCell className="text-muted-foreground">{produto.codEan}</TableCell>
              <TableCell className="text-muted-foreground">{produto.codDum}</TableCell>
              <TableCell className="text-center">{produto.shelf}</TableCell>
              <TableCell className="text-center">{produto.unPorCaixa}</TableCell>
              <TableCell className="text-center">{produto.caixaPorPallet}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-normal">
                  {produto.segmento}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {produto.empresa}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon-sm" asChild>
                  <Link
                    href={`/produto/${produto.sku}/editar`}
                    aria-label={`Editar produto ${produto.sku}`}
                  >
                    <Pencil className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
