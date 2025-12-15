'use client';
import { useState } from "react";
import { useContagemLite } from "../hooks/contagem-lite/useLite";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";
import { Upload } from "lucide-react";
import { TableCadastroContagemLite } from "../components/table-lite";
import RemoveCadastroLite from "../components/removeCadastroLite";
import StatusContagem from "../components/statusContagem";
import DownloadAnomaliaExcel from "../components/download-anomalia-excel";
import SelecionarData from "../components/selecionarData";

export default function CadastrarContagemLite() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleFileChange, items, handleCadastrarContagemLite, dataRef, setDataRef } = useContagemLite();

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

  const handleCadastrar = async () => {
    if (!uploadedFile) return;
    
    setIsLoading(true);
    try {
      await handleCadastrarContagemLite();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ações principais */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Upload de arquivo */}
        <div className="flex items-center gap-2">
          <SelecionarData
            data={dataRef}
            setData={setDataRef}
          />
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
            className="h-9 px-4"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isLoading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Excel
          </Button>
          
          {uploadedFile && (
            <span className="text-sm text-muted-foreground truncate max-w-xs">
              {uploadedFile.name}
            </span>
          )}
        </div>

        {/* Botões de ação */}
        {uploadedFile && (
          <Button 
            onClick={handleCadastrar} 
            disabled={isLoading} 
            size="sm" 
            className="h-9 px-4"
          >
            {isLoading ? 'Processando...' : 'Cadastrar Contagem'}
          </Button>
        )}
        <div className="flex items-center gap-2">

        <RemoveCadastroLite />
        <DownloadAnomaliaExcel />
        </div>
      </div>

      {/* Status da contagem */}
      <StatusContagem />

      {/* Tabela de pré-visualização */}
      {uploadedFile && items.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pré-visualização</h3>
            <span className="text-sm text-muted-foreground">
              Mostrando {Math.min(items.length, 10)} de {items.length} registros
            </span>
          </div>
          <TableCadastroContagemLite 
            globalFilter={globalFilter} 
            setGlobalFilter={setGlobalFilter} 
            items={items.slice(0, 10)} 
          />
        </div>
      )}
    </div>
  );
}