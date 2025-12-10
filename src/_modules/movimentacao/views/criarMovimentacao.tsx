'use client';
import { Button } from "@/_shared/_components/ui/button";
import { TableMovimentacao } from "../components/table";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CriarMovimentacao(){
  const  router = useRouter();
  return (
    <div>
      <h1>Criar Movimentação</h1>
      <TableMovimentacao/>
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