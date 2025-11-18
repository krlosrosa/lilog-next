'use client';

import { Button } from '@/_shared/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/_shared/_components/ui/input';
import { SimpleSelect } from '@/_shared/_components/ui/SelectSimples';
import { EditUserDtoTurno, UserDtoOutput } from '@/_services/api/model';
import { useUserFuncionarioOperations } from '../../hooks/useUserFuncionarioOperations';
import { useEditarFuncionario } from '../../hooks/mutation/funcionarios/useEditarFuncionario';

const opcoesTurno = [
  {
    label: 'manhã',
    value: 'MANHA',
  },
  {
    label: 'tarde',
    value: 'TARDE',
  },
  {
    label: 'noite',
    value: 'NOITE',
  },
  {
    label: 'intermédiario',
    value: 'INTERMEDIARIO',
  },
];

export default function EditarFuncionario({ user }: { user: UserDtoOutput }) {
  const { open, setOpen, name, setName, turno, setTurno, handleEdit, isEditing } = useEditarFuncionario(user);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full gap-2 p-1">
          <Edit className="h-4 w-4" />
          <span>Editar</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Editar Usuário
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Nome do Usuário
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome completo"
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Turno</label>
            <SimpleSelect
              value={turno}
              onChange={setTurno}
              options={opcoesTurno}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-3 border-t border-gray-200 pt-4">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="min-w-24"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEdit}
            disabled={isEditing}
            className="min-w-24 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
