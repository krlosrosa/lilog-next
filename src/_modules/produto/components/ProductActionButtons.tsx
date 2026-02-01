"use client";

import Link from "next/link";
import { Button } from "@/_shared/_components/ui/button";
import { Plus, Package } from "lucide-react";

export function ProductActionButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm" className="h-9 gap-2">
        <Link href="/produto/cadastrar">
          <Plus className="h-4 w-4" aria-hidden />
          Novo produto
        </Link>
      </Button>
      <Button asChild variant="outline" size="sm" className="h-9 gap-2">
        <Link href="/produto#importar">
          <Package className="h-4 w-4" aria-hidden />
          Adicionar vários (Excel)
        </Link>
      </Button>
    </div>
  );
}
