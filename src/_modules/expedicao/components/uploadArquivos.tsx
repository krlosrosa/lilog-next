'use client';
import { CompactFileUpload } from '@/_shared/_components/expedicao/uploadFile';
import { useState, useEffect } from 'react';
import { useExpedicao } from '../hooks';
import { Button } from '@/_shared/_components/ui/button';
import { TableErrorExpedicao } from './tableError';
import { useShipments } from '../others/providers/shipments.provider';
import { ProdNaoEncontrado } from './errors/produtoNaoEncontrado';
import { Card, CardContent, CardHeader, CardTitle } from '@/_shared/_components/ui/card';
import { Badge } from '@/_shared/_components/ui/badge';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

export default function UploadArquivos({
  setValueTab,
}: {
  setValueTab: (value: string) => void;
}) {
  const { validationFailure, validationSuccess } = useShipments();
  const [shipments, setShipments] = useState<File | null>(null);
  const [products, setProducts] = useState<File | null>(null);
  const [routes, setRoutes] = useState<File | null>(null);
  const { handleValidateInputs, isLoading } = useExpedicao({ setValueTab });

  useEffect(() => {
    if (validationFailure?.error) {
      setShipments(null);
      setProducts(null);
      setRoutes(null);
      const shipmentsInput = document.getElementById(
        'shipments',
      ) as HTMLInputElement;
      const productsInput = document.getElementById(
        'products',
      ) as HTMLInputElement;
      const routesInput = document.getElementById('routes') as HTMLInputElement;
      if (shipmentsInput) shipmentsInput.value = '';
      if (productsInput) productsInput.value = '';
      if (routesInput) routesInput.value = '';
    }
  }, [validationFailure?.error]);

  const handleShipmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setShipments(selected || null);
  };
  const handleProductsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setProducts(selected || null);
  };
  const handleRoutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setRoutes(selected || null);
  };

  function handleSubmit() {
    handleValidateInputs({
      shipments,
      products,
      routes,
    });
  }

  const arquivosSelecionados = [shipments, products, routes].filter(Boolean).length;

  return (
    <div className="mx-auto space-y-4 p-4">
      {/* Header Compacto */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">Upload de Arquivos</h1>
        </div>
        <p className="text-muted-foreground text-xs">
          Envie os arquivos necessários para processamento
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">Arquivos Requeridos</CardTitle>
            <Badge variant={arquivosSelecionados > 0 ? "default" : "outline"} className="text-xs">
              {arquivosSelecionados}/3 selecionados
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <CompactFileUpload
              id="shipments"
              title="Remessas"
              file={shipments}
              onChange={handleShipmentsChange}
            />
            <CompactFileUpload
              id="products"
              title="Produtos"
              file={products}
              onChange={handleProductsChange}
            />
            <CompactFileUpload
              id="routes"
              title="Rotas"
              file={routes}
              onChange={handleRoutesChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <Button
              disabled={isLoading || (!shipments && !products && !routes)}
              onClick={handleSubmit}
              size="sm"
              className="gap-2 min-w-28"
            >
              {isLoading ? (
                <>
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Processando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Enviar Arquivos
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Errors Section */}
      {validationFailure?.errors && validationFailure.errors.length > 0 && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              Erros de Validação ({validationFailure.errors.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TableErrorExpedicao errors={validationFailure.errors} />
          </CardContent>
        </Card>
      )}

      {validationFailure?.produtosNaoEncontrados && validationFailure.produtosNaoEncontrados.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              Produtos Não Encontrados ({validationFailure.produtosNaoEncontrados.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {validationFailure.produtosNaoEncontrados.map((produto) => (
              <ProdNaoEncontrado key={produto.id} produto={produto} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Success Indicator */}
      {validationSuccess && !validationFailure && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-800">
              <CheckCircle className="h-4 w-4" />
              Arquivos Validados com Sucesso
            </CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}