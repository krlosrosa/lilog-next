'use client';

import { ReactNode } from 'react';
import { Button } from '@/_shared/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  children: ReactNode;
}

export const ConfirmModal = ({
  open,
  onOpenChange,
  title = 'Confirmar ação',
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  children,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {description && <p className="my-4">{description}</p>}
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
