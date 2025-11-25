import { Label } from '@/_shared/_components/ui/label';
import { useProdutividadeOperations } from '../../hooks/useProdutividadeOperations';
import { Input } from '@/_shared/_components/ui/input';
import { Button } from '@/_shared/_components/ui/button';
import { Avatar, AvatarFallback } from '@/_shared/_components/ui/avatar';
import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import type { UserDto } from '@/_services/api/model';
import { useFormContext } from 'react-hook-form';
import AddNewFuncionario from '../funcionario/addNewFuncionario';

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

interface SelecionarFuncionarioProps {
  onBack?: () => void;
  onAddNewFuncionario?: () => void;
}

export default function SelecionarFuncionario({
  onBack,
  onAddNewFuncionario,
}: SelecionarFuncionarioProps) {
  const form = useFormContext();
  const funcionarioId = form.watch('funcionarioId');
  const { operations } = useProdutividadeOperations();
  const [searchTerm, setSearchTerm] = useState('');


  const { data: listUsers, isLoading: isLoadingUsers } =
    operations.useListarUsuariosQuery();

  // Lógica de filtragem: Retorna a lista completa se a busca estiver vazia
  const filteredUsers = searchTerm.length > 0 ? listUsers?.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toLowerCase().includes(searchTerm.toLowerCase())) : listUsers;

  // Usuário selecionado
  const selectedUser = listUsers?.find((user) => user.id === funcionarioId);

  const handleSelectUser = (user: UserDto) => {
    form.setValue('funcionarioId', user.id, { shouldValidate: true });
    form.setValue('turno', user.turno, { shouldValidate: true });
    // Limpa a busca após selecionar para que a seção de "Selecionado" seja prioritária
    setSearchTerm('');
  };

  const handleRemoveSelection = () => {
    form.setValue('funcionarioId', undefined, { shouldValidate: true });
    form.setValue('turno', undefined, { shouldValidate: true });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoadingUsers) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="funcionario">Funcionário</Label>
          {onAddNewFuncionario && (
            <AddNewFuncionario>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onAddNewFuncionario}
                className="text-muted-foreground hover:text-foreground h-7"
              >
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                Novo funcionário
              </Button>
            </AddNewFuncionario>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            id="funcionario"
            type="text"
            placeholder="Digite o nome ou ID do funcionário"
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1"
          />
        </div>
      </div>

      {/* Funcionário Selecionado: Aparece se houver um usuário selecionado */}
      {selectedUser && (
        <div className="space-y-2">
          <Label>Funcionário Selecionado</Label>
          <div className="bg-primary/10 border-primary flex items-center gap-2 rounded-md border p-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-sm">
                {getInitials(selectedUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{selectedUser.name}</p>
              <p className="text-muted-foreground text-xs">
                ID: {selectedUser.id}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemoveSelection}
              className="hover:bg-destructive/10 hover:text-destructive h-7 w-7 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Lista de Funcionários Filtrados: 
        Aparece SOMENTE se: 
        1. NÃO HOUVER um funcionário selecionado. 
        2. HOUVER resultados filtrados.
      */}
      {!selectedUser && filteredUsers && filteredUsers?.length > 0 && (
        <div className="space-y-2">
          <Label>Funcionários ({filteredUsers?.length})</Label>
          <div className="bg-muted/20 flex max-h-64 flex-col gap-1.5 overflow-y-auto rounded-md border p-2">
            {filteredUsers?.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-background p-2 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-1 items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-muted-foreground text-xs">
                      ID: {user.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Botão de submit */}
      <div className="pt-2">
        <Button type="submit" disabled={!selectedUser} className="w-full">
          Adicionar Demanda
        </Button>
      </div>
    </div>
  );
}