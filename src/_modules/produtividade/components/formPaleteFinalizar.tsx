'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Plus, Trash2, StickyNote, X } from 'lucide-react';

import { Input } from '@/_shared/_components/ui/input';
import { Button } from '@/_shared/_components/ui/button';
import { Label } from '@/_shared/_components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/_shared/_components/ui/form';

// Este componente não precisa mais do seu próprio schema,
// pois ele vai ler o schema do "Form" pai via context.

interface FormPaleteProps {
  onAddFuncionario?: () => void;
}

export const FormPalete = ({ onAddFuncionario }: FormPaleteProps) => {
  // Estado local apenas para o input de digitação
  const [currentPalete, setCurrentPalete] = useState('');
  const [showObservacao, setShowObservacao] = useState(false);

  // 1. Puxa o formulário do componente pai
  const form = useFormContext();

  // 2. Assiste ao campo "paletesIds" (array de strings) do formulário principal
  const paletesIds: string[] = form.watch('paletesIds') || [];

  // Puxa os erros do form principal
  const { errors } = form.formState;

  const handleAddPalete = () => {
    const paleteValue = currentPalete.trim();
    if (paleteValue) {
      // Verifica se o palete já existe na lista
      const alreadyExists = paletesIds.some(
        (palete) => palete.toLowerCase() === paleteValue.toLowerCase(),
      );

      if (!alreadyExists) {
        // 3. Atualiza o valor no React Hook Form (usando setValue)
        form.setValue('paletesIds', [...paletesIds, paleteValue], {
          shouldValidate: true, // Opcional: validar ao adicionar
        });
        setCurrentPalete('');
      } else {
        // Limpa o input mesmo se já existir
        setCurrentPalete('');
      }
    }
  };

  // 4. Lógica de remoção para um array de strings
  const handleRemovePalete = (indexToRemove: number) => {
    const novoArray = paletesIds.filter((_, index) => index !== indexToRemove);
    form.setValue('paletesIds', novoArray, {
      shouldValidate: true, // Opcional: validar ao remover
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Impede o submit do formulário
      handleAddPalete();
    }
  };

  // 5. Removemos a tag <form> daqui, pois este componente
  // agora vive *dentro* da tag <form> do componente 'AddProdutividade'.
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="palete">Código do Palete</Label>
        <div className="flex gap-2">
          <Input
            id="palete"
            type="text"
            placeholder="Digite o código do palete"
            value={currentPalete}
            onChange={(e) => setCurrentPalete(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddPalete}
            disabled={!currentPalete.trim()}
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {paletesIds.length > 0 && (
        <div className="space-y-2">
          <Label>Paletes Adicionados ({paletesIds.length})</Label>
          <div className="bg-muted/20 flex max-h-48 flex-col gap-1.5 overflow-y-auto rounded-md border p-2">
            {/* Lógica para reverter a lista para exibição (novos primeiro) */}
            {[...paletesIds].reverse().map((palete, displayIndex) => {
              // Calcula o índice original para a remoção
              const originalIndex = paletesIds.length - 1 - displayIndex;
              return (
                <div
                  key={originalIndex} // Usar o índice como chave aqui é ok
                  className="bg-background hover:bg-muted/50 flex w-full items-center justify-between gap-2 rounded-md border p-2 transition-colors"
                >
                  <span className="flex-1 text-sm font-medium">{palete}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive/10 hover:text-destructive h-7 w-7 rounded-md transition-colors"
                    onClick={() => handleRemovePalete(originalIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Exibe o erro de 'paletesIds' (do Zod principal) */}
      {errors.paletesIds && (
        <p className="text-destructive text-sm">
          {errors.paletesIds.message?.toString()}
        </p>
      )}

      {/* 7. Campo de Observação conectado com FormField */}
      {showObservacao && (
        <FormField
          control={form.control}
          name="obs" // Nome do campo no Zod principal
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="observacao">Observação</FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowObservacao(false);
                    // Limpa o valor no RHF ao fechar
                    form.setValue('obs', null);
                  }}
                  className="text-muted-foreground hover:text-foreground h-6 w-6"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
              <FormControl>
                {/* Mantido exatamente o seu textarea com as classes */}
                <textarea
                  id="observacao"
                  placeholder="Digite uma observação (opcional)"
                  rows={3}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  {...field} // Conecta o campo
                  value={field.value || ''} // Garante que o valor não seja 'null'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="flex flex-col gap-2 pt-2">
        {!showObservacao && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowObservacao(true)}
            className="text-muted-foreground hover:text-foreground w-full"
          >
            <StickyNote className="mr-1.5 h-3.5 w-3.5" />
            Adicionar observação
          </Button>
        )}
        <Button
          type="button"
          onClick={onAddFuncionario}
          disabled={paletesIds.length === 0}
          className="w-full"
        >
          Adicionar funcionário
        </Button>
      </div>
    </div>
  );
};
