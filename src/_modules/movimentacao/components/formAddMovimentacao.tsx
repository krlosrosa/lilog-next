'use client';

import { CriarNovaMovimentacaoMutationBody } from "@/_services/api/service/movimentacao/movimentacao";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { useState } from "react";
import { Trash2, Upload, FileSpreadsheet, ArrowRight, Warehouse, Palette, Package } from "lucide-react";
import { useCriarMovimentacao } from "../hooks/criarMovimentacao";
import { useMovimentacao } from "../hooks/useMovimentacao";

export function FormAddMovimentacao() {
  const { handleFileChange, items, setItems } = useMovimentacao();
  const { criarMovimentacao, isCriandoMovimentacao } = useCriarMovimentacao();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setItems([]);
    setUploadedFile(null);
  };

  const handleSubmitAll = async () => {
    if (items.length === 0) return;
    criarMovimentacao(items);
    setItems([]);
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Card de Upload */}
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Upload de Movimentações</CardTitle>
          </div>
          <CardDescription>
            Faça upload de um arquivo Excel (.xlsx, .xls) para adicionar movimentações em massa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isLoading}
            />
            <Button
              type="button"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isLoading ? 'Processando...' : 'Selecionar Arquivo'}
            </Button>

            {uploadedFile && (
              <div className="flex items-center gap-2 flex-1">
                <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
              </div>
            )}

            {items.length > 0 && (
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10"
                disabled={isLoading || isCriandoMovimentacao}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Limpar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Movimentações */}
      {items.length > 0 && (
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Movimentações Carregadas</CardTitle>
                  <CardDescription>
                    {items.length} {items.length === 1 ? 'item' : 'itens'} carregados do arquivo
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={handleSubmitAll}
                disabled={isCriandoMovimentacao}
                className="bg-green-600 hover:bg-green-700"
              >
                {isCriandoMovimentacao ? 'Enviando...' : `Enviar ${items.length} Movimentações`}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-all duration-200 hover:border-primary/50"
                >
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Informações Principais */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Warehouse className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{item.idCentro}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{item.palete}</span>
                        </div>
                      </div>

                      {/* Rota */}
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Origem</div>
                          <div className="font-semibold text-sm bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded">
                            {item.origem}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="text-center">
                          <div className="text-xs text-muted-foreground">Destino</div>
                          <div className="font-semibold text-sm bg-green-50 dark:bg-green-950 px-3 py-1 rounded">
                            {item.destino}
                          </div>
                        </div>
                      </div>

                      {/* Informações Adicionais */}
                      <div className="flex flex-wrap gap-3">
                        {item.prioridade > 0 && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">Prioridade</div>
                            <div className={`font-semibold text-sm px-3 py-1 rounded ${
                              item.prioridade > 2 
                                ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400' 
                                : 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
                            }`}>
                              {item.prioridade}
                            </div>
                          </div>
                        )}
                        
                        {item.sku && (
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">SKU</div>
                            <div className="font-medium text-sm bg-muted px-3 py-1 rounded">
                              {item.sku}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Descrição */}
                    {item.descricao && (
                      <div className="mt-3 text-sm text-muted-foreground border-t pt-2">
                        {item.descricao}
                      </div>
                    )}
                  </div>

                  {/* Botão de Remover */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(index)}
                    className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10"
                    disabled={isCriandoMovimentacao}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Resumo */}
            {items.length > 1 && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Total de {items.length} movimentações
                  </span>
                  <Button
                    variant="link"
                    onClick={handleClearAll}
                    className="text-destructive"
                    disabled={isCriandoMovimentacao}
                  >
                    <Trash2 className="mr-1 h-3.5 w-3.5" />
                    Remover todas
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Indicador de Estado Vazio */}
      {items.length === 0 && !uploadedFile && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhum arquivo carregado
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Faça upload de um arquivo Excel para carregar as movimentações em massa
          </p>
        </div>
      )}
    </div>
  );
}
