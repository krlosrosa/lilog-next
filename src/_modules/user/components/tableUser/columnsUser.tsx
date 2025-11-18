'use client';

import { RoleDtoOutput, UserDtoOutput } from '@/_services/api/model';
import { Button } from '@/_shared/_components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, ShieldCheck, Trash } from 'lucide-react';
import ExcluirUsuario from '../../../produtividade/components/funcionario/excluirUsuario';
import EditarUser from '../editarUsuario';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/_shared/_components/ui/dropdown-menu';
import ResetPassword from '../resetPassword';
import Link from 'next/link';
import { CanWithCenter } from '@/_shared/providers/casl/CanWithCenter';
import { useUser } from '@/_shared/providers/UserContext';

export const columnsUser: ColumnDef<UserDtoOutput>[] = [
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
      const { user: userContext } = useUser();
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
              <EditarUser user={user} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full"
              onSelect={(e) => e.preventDefault()}
            >
              <ExcluirUsuario userId={user.id} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="w-full"
              onSelect={(e) => e.preventDefault()}
            >
              <ResetPassword user={user} />
            </DropdownMenuItem>
            <CanWithCenter
              acao="gerente"
              recurso="all"
              centro={userContext?.centerSelect}
            >
              <DropdownMenuItem
                className="w-full"
                onSelect={(e) => e.preventDefault()}
              >
                <Link
                  href={`/users/${user.id}/permissions`}
                  className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer gap-2 rounded-sm p-1"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Permissões</span>
                </Link>
              </DropdownMenuItem>
            </CanWithCenter>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
