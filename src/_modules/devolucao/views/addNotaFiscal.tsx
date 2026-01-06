'use client';
import { useParams } from "next/navigation";
import { useDevolucao } from "../hooks/usedevolucao";
import { useEffect } from "react";
import InfoDemandaHeader from "../components/infoDemandaHeader";
import ListarNfsRavex from "../components/addNotaFiscal/listaNfRavex";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";
import Link from "next/link";

export default function AddNotaFiscal() {
  const { id } = useParams();
  const { setDemandaId, demanda, data: infoViagem  , viagemId, setViagemId } = useDevolucao();
  useEffect(() => {
    setDemandaId(id as string);
  }, [id]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1>Adicionar Nota Fiscal</h1>
        <Button>
          <Link href={`/devolucao/demanda/${id}`}>
            Voltar
          </Link>
        </Button>
      </div>
      <InfoDemandaHeader demanda={demanda} />
      <Input
        type="text"
        value={viagemId ?? 'Nenhuma viagem selecionada'}
        onChange={(e) => setViagemId(e.target.value)}
        className="bg-background"
      />
      <ListarNfsRavex idViagemRavex={viagemId ?? ''} notas={infoViagem?.notas ?? []} />
    </div>
  )
}