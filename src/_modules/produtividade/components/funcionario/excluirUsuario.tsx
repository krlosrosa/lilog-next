'use client';

import { Trash2, AlertTriangle } from 'lucide-react';
import { useExcluirFuncionario } from '../../hooks/mutation/funcionarios/useExcluirFuncionario';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter, 
  DialogTrigger 
} from '@/_shared/_components/ui/dialog';
import { Button } from '@/_shared/_components/ui/button';

interface ExcluirUsuarioProps {
  userId: string;
}

export default function ExcluirUsuario({ userId }: ExcluirUsuarioProps) {
  const { handleDeleteFuncionario, isDeleting, open, setOpen } = useExcluirFuncionario();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent">
          <Trash2 className="h-4 w-4" />
          <span>Excluir</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mb-4 flex flex-col items-center gap-3">
            <div className="bg-destructive/10 border-destructive/20 flex h-16 w-16 items-center justify-center rounded-full border-2">
              <AlertTriangle className="text-destructive h-8 w-8" />
            </div>
            <div className="text-center">
              <DialogTitle className="text-destructive text-lg font-semibold">
                Confirmar Exclusão do Funcionário
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm">
                Esta ação não pode ser desfeita. Todos os dados relacionados a este funcionário serão permanentemente removidos.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="bg-destructive/5 border-destructive/20 flex items-start gap-3 rounded-lg border p-4">
          <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="text-destructive mb-1 text-sm font-medium">
              Atenção!
            </p>
            <p className="text-muted-foreground text-xs">
              Você está prestes a excluir um funcionário. Esta ação é irreversível e todos os dados associados serão perdidos permanentemente.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeleteFuncionario(userId)}
            disabled={isDeleting}
            className="w-full sm:w-auto"
          >
            {isDeleting ? (
              <>
                <Trash2 className="mr-2 h-4 w-4 animate-pulse" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir Funcionário
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
