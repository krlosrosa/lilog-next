'use client';

import { Button } from '@/_shared/_components/ui/button';
import { ConfirmModal } from '@/_shared/_components/ui/modalExcluirUsuario';
import { useUser } from '@/_shared/providers/UserContext';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useUserOperations } from '../hooks/useUserOperations';

export default function ExcluirUsuario({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const { operations } = useUserOperations();

  function handleDelete() {
    operations.deleteUser({
      centerId: user?.centerSelect as string,
      id: userId,
    });
  }

  return (
    <div>
      <ConfirmModal
        onConfirm={handleDelete}
        onOpenChange={setOpen}
        open={open}
        title="Confirmar Exclusão do usuario"
        description="Essa ação não pode ser desfeita"
      >
        <div className="flex w-full gap-2 p-1">
          <Trash2 />
          <span>Excluir</span>
        </div>
      </ConfirmModal>
    </div>
  );
}
