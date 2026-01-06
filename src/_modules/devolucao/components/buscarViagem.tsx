'use client';
import { Input } from "@/_shared/_components/ui/input";

type BuscarViagemProps = {
  viagemId: string;
  setViagemId: (viagemId: string) => void;
}

export default function BuscarViagem({ viagemId, setViagemId }: BuscarViagemProps) {
  return (
    <div>
      <h1>Buscar Viagem</h1>
      <Input
        placeholder="Digite o ID da viagem"
        value={viagemId ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setViagemId(e.target.value)}
      />
    </div>
  )
}