'use client';

import { Input } from "@/_shared/_components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Label } from "@/_shared/_components/ui/label";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ViagemSearchProps {
  viagemId: string;
  onViagemIdChange: (value: string) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export function ViagemSearch({ 
  viagemId, 
  onViagemIdChange, 
  isLoading = false,
  error 
}: ViagemSearchProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="viagem-id" className="text-base font-semibold">
          Buscar Viagem Ravex
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="viagem-id"
            type="text"
            placeholder="Digite o ID da viagem Ravex"
            value={viagemId}
            onChange={(e) => onViagemIdChange(e.target.value)}
            className="pl-9 pr-10"
            disabled={isLoading}
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Informe o ID da viagem para buscar automaticamente as informações do veículo
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erro ao buscar viagem: {error.message || 'Viagem não encontrada'}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
