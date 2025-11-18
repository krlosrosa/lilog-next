'use client';
import { useUpdateSearchParam } from '@/_shared/hooks/useUpdateSearchParams';
import { Input } from '@/_shared/_components/ui/input';
import { Label } from '@/_shared/_components/ui/label';
import { Skeleton } from '@/_shared/_components/ui/skeleton';
import { useUser } from '@/_shared/providers/UserContext';
import { useUserFuncionarioOperations } from '../../hooks/useUserFuncionarioOperations';
import { DataTableFuncionario } from './tableUser/data-table-user';
import { columnsFuncionario } from './tableUser/columnsUser';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ListarUsuarioFuncionaio() {
  const { user } = useUser();
  const { setValue: setSearch, value: search } = useUpdateSearchParam('search');
  const [isMounted, setIsMounted] = useState(false);

  const { operations } = useUserFuncionarioOperations();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Garante valor consistente: usa string vazia durante SSR, valor real após hidratação
  const centerId = isMounted && user?.centerSelect ? user.centerSelect : '';

  const { data: listUsers, isLoading: isLoadingUsers } = operations.buscarUsers(
    centerId,
    {
      search: search,
    },
  );

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="search-processo">Buscar por Processo</Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="search-processo"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Digite o nome ou ID do usuário..."
              className="pl-9"
              disabled={!isMounted}
            />
          </div>
        </div>
      </div>

      {/* Tabela ou Loading */}
      {!isMounted || !user?.centerSelect || isLoadingUsers ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        listUsers && (
          <DataTableFuncionario columns={columnsFuncionario} data={listUsers} />
        )
      )}
    </div>
  );
}
