'use client';
import { useUpdateSearchParam } from '@/_shared/hooks/useUpdateSearchParams';
import { useUserOperations } from '../hooks/useUserOperations';
import { SimpleSelect } from '@/_shared/_components/ui/SelectSimples';
import { DataTableUser } from './tableUser/data-table-user';
import { columnsUser } from './tableUser/columnsUser';
import { Input } from '@/_shared/_components/ui/input';
import { Label } from '@/_shared/_components/ui/label';
import { Skeleton } from '@/_shared/_components/ui/skeleton';
import { useUser } from '@/_shared/providers/UserContext';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useBuscarUsuarios } from '../hooks/useBuscarUsuarios';

const listRoles = [
  { label: 'Funcionário', value: 'FUNCIONARIO' },
  { label: 'User', value: 'USER' },
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Master', value: 'MASTER' },
];

export default function ListarUsuario() {
  const { isLoadingUsers, listUsers, setSearch, search, setRole, role, isMounted } = useBuscarUsuarios()
  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="search-users">Buscar Usuário</Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              id="search-users"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Digite o nome ou ID do usuário..."
              className="pl-9"
              disabled={!isMounted}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Filtrar por Função</Label>
          <SimpleSelect
            placeholder="Selecione uma função"
            value={role}
            onChange={setRole}
            options={listRoles}
          />
        </div>
      </div>

      {/* Tabela ou Loading */}
      {!isMounted || isLoadingUsers ? (
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        listUsers && <DataTableUser columns={columnsUser} data={listUsers} />
      )}
    </div>
  );
}
