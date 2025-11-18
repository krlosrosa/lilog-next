import { Label } from '@/_shared/_components/ui/label';
import { useProdutividadeOperations } from '../../hooks/useProdutividadeOperations';
import { Input } from '@/_shared/_components/ui/input';
import { Button } from '@/_shared/_components/ui/button';
import { Avatar, AvatarFallback } from '@/_shared/_components/ui/avatar';
import { useState } from 'react';
import { Check, X, UserPlus } from 'lucide-react';
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

  // 5. Derivar o usuário selecionado a partir do ID do formulário
  const selectedUser = listUsers?.find((user) => user.id === funcionarioId);

  const filteredUsers = listUsers?.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.id.toLowerCase().includes(searchLower)
    );
  });

  const handleSelectUser = (user: UserDto) => {
    form.setValue('funcionarioId', user.id, { shouldValidate: true });
    form.setValue('turno', user.turno, { shouldValidate: true });
  };

  const handleRemoveSelection = () => {
    form.setValue('funcionarioId', undefined, { shouldValidate: true });
    form.setValue('turno', undefined, { shouldValidate: true });
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

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

      {filteredUsers && filteredUsers.length > 0 ? (
        <div className="space-y-2">
          <Label>Funcionários ({filteredUsers.length})</Label>
          <div
            className={`bg-muted/20 flex flex-col gap-1.5 overflow-y-auto rounded-md border p-2 ${selectedUser ? 'max-h-48' : 'max-h-64'
              }`}
          >
            {filteredUsers.map((user) => {
              const isSelected = selectedUser?.id === user.id;
              return (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border p-2 transition-colors ${isSelected
                    ? 'bg-primary/10 border-primary'
                    : 'bg-background hover:bg-muted/50'
                    }`}
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
                  {isSelected && <Check className="text-primary h-4 w-4" />}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        listUsers &&
        listUsers.length > 0 &&
        searchTerm && (
          <div className="space-y-2">
            <Label>Nenhum funcionário encontrado</Label>
            <div className="bg-muted/20 flex flex-col items-center justify-center rounded-md border p-6">
              <p className="text-muted-foreground mb-3 text-sm">
                Não encontramos funcionários com "{searchTerm}"
              </p>
              {onAddNewFuncionario && (
                <AddNewFuncionario>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onAddNewFuncionario}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Cadastrar novo funcionário
                  </Button>
                </AddNewFuncionario>
              )}
            </div>
          </div>
        )
      )}

      <div className="pt-2">
        <Button type="submit" disabled={!selectedUser} className="w-full">
          Adicionar Demanda
        </Button>
      </div>
    </div>
  );
}
