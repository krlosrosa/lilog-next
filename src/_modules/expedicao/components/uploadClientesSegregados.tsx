'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/_shared/_components/ui/input';
import { Button } from '@/_shared/_components/ui/button';
import { FileSpreadsheet, Upload, X } from 'lucide-react';
import { convertFileToClientesSegregados } from '../others/utils/convertClientsSegregaded';
import { useShipments } from '../others/providers/shipments.provider';

export function UploadClientesSegregados() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const { handleSegregedClientes } = useShipments();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const clientes = await (
        await convertFileToClientesSegregados(file)
      ).map((item) => item.codCliente);
      handleSegregedClientes(clientes);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Upload className="h-3 w-3" />
          </Button>
        </div>
        {uploadedFile && (
          <Button disabled={isLoading} size="sm" className="h-9">
            {isLoading ? 'Processando...' : 'Cadastrar'}
          </Button>
        )}
      </div>

      {uploadedFile && (
        <div className="bg-muted flex items-center justify-between rounded-lg p-2">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">{uploadedFile.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
