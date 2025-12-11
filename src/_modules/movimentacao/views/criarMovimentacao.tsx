'use client';
import { Button } from "@/_shared/_components/ui/button";
import { TableMovimentacao } from "../components/table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/_shared/_components/ui/label";
import { Input } from "@/_shared/_components/ui/input";

export default function CriarMovimentacao(){
  const [filter, setFilter] = useState<string>('');
  const  router = useRouter();
  return (
    <div>
      <h1>Criar Movimentação</h1>
      <div className="flex items-center gap-2 p-2">
        <Label>
          Filtrar:
        </Label>
        <Input
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
          placeholder="Digite o filtro"
        />
      </div>
      <TableMovimentacao globalFilter={filter} setGlobalFilter={setFilter}/>
      <div className="fixed right-6 bottom-6 z-50">
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        aria-label="Criar nova demanda"
        onClick={() => router.push('/movimentacao/criar')}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
    </div>
  );
}