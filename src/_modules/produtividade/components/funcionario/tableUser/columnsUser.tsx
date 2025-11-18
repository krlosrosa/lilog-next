'use client';

import { RoleDtoOutput, UserDtoOutput } from '@/_services/api/model';
import { Button } from '@/_shared/_components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import ExcluirUsuario from '../excluirUsuario';
import { Edit, Lock, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/_shared/_components/ui/dropdown-menu';
import EditarFuncionario from '../editarUsuario';

export const columnsFuncionario: ColumnDef<UserDtoOutput>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'centerId',
    header: 'Centro',
  },
  {
    accessorKey: 'empresa',
    header: 'Empresa',
  },
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'turno',
    header: 'Turno',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="w-full"
              onSelect={(e) => e.preventDefault()}
            >
              <EditarFuncionario user={user} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full"
              onSelect={(e) => e.preventDefault()}
            >
              <ExcluirUsuario userId={user.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
