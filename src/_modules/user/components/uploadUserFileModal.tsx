'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { Button } from '@/_shared/_components/ui/button';
import { Upload, FileSpreadsheet, X } from 'lucide-react';
import { useUserOperations } from '../hooks/useUserOperations';
import { useUser } from '@/_shared/providers/UserContext';

export default function UploadUserFileModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { operations, isLoading } = useUserOperations();
  const { user } = useUser();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
  };

  const handleUpload = async () => {
    if (!file) return;
    await operations.addUserBatchFunction(
      user?.centerSelect as string,
      file,
      setOpen,
    );
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" /> Importar Usuários
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload de Usuários (Excel)</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <label
            htmlFor="file"
            className="border-muted-foreground/25 hover:border-primary flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition"
          >
            <FileSpreadsheet className="text-primary mb-2 h-8 w-8" />
            <span className="text-muted-foreground text-sm">
              {file ? file.name : 'Clique para selecionar um arquivo .xlsx'}
            </span>
            <input
              id="file"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <div className="flex items-center justify-between">
              <Button onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Processando...' : 'Enviar arquivo'}
              </Button>
              <Button variant="ghost" size="icon" onClick={clearFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
