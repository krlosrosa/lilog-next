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
import { Card, CardContent } from '@/_shared/_components/ui/card';
import { Badge } from '@/_shared/_components/ui/badge';
import { Upload, FileSpreadsheet, X, Users, Loader2 } from 'lucide-react';
import { useUser } from '@/_shared/providers/UserContext';
import { useUserFuncionarioOperations } from '../../hooks/useUserFuncionarioOperations';

export default function UploadUserFuncionarioFileModal() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { operations, isLoading } = useUserFuncionarioOperations();
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
        <Button className="flex items-center gap-2" size="sm" variant="outline">
          <Upload className="h-4 w-4" />
          Importar Funcionários
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg">Importar Funcionários</DialogTitle>
              <p className="text-muted-foreground text-sm">
                Faça upload de arquivo Excel com dados dos funcionários
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Área de Upload */}
          <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <label
                htmlFor="file"
                className="flex cursor-pointer flex-col items-center justify-center space-y-3"
              >
                <FileSpreadsheet className="text-primary h-10 w-10" />
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium">
                    {file ? file.name : 'Selecionar arquivo .xlsx'}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Clique ou arraste o arquivo Excel
                  </p>
                </div>
                <input
                  id="file"
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </CardContent>
          </Card>

          {/* Informações do Arquivo */}
          {file && (
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearFile}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ações */}
          {file && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleUpload}
                disabled={isLoading}
                className="flex-1 gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Importar Funcionários
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Informações Adicionais */}
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs">
                .xlsx
              </Badge>
              <p className="text-muted-foreground text-xs">
                Certifique-se de que o arquivo está no formato Excel correto com as colunas necessárias
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}