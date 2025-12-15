'use client';
import { useState } from "react";
import { useContagemLite } from "../hooks/contagem-lite/useLite";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";
import { Upload } from "lucide-react";
import { TableCadastroContagemLite } from "../components/table-lite";
import RemoveCadastroLite from "../components/removeCadastroLite";
import StatusContagem from "../components/statusContagem";

export default function CadastrarContagemLite() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleFileChange, items, formData, handleCadastrarContagemLite } = useContagemLite()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsLoading(true);

    try {
      await handleFileChange(event);
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <div>
        <div className="flex-1">
          <Input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
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
          {uploadedFile && (
            <Button onClick={handleCadastrarContagemLite} disabled={isLoading} size="sm" className="h-9">
              {isLoading ? 'Processando...' : 'Cadastrar'}
            </Button>
          )}
        </div>
        <RemoveCadastroLite />
        <StatusContagem />
      {uploadedFile && (
        <TableCadastroContagemLite globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} items={items.slice(0, 10) || []} />
      )}
    </div>
  )
}