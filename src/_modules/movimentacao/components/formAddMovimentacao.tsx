'use client';

import { CreateMovimentacaoDto } from "@/_services/api/model";
import { CriarNovaMovimentacaoMutationBody } from "@/_services/api/service/movimentacao/movimentacao";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { useState } from "react";
import { Trash2, Plus, ArrowRight, Warehouse, Palette, Package, ArrowUpDown } from "lucide-react";
import { useCriarMovimentacao } from "../hooks/criarMovimentacao";

// Configurações dos campos
const FIELD_CONFIG = {
  required: ['idCentro', 'palete', 'origem', 'destino'] as (keyof CreateMovimentacaoDto)[],
  fields: [
    {
      id: 'idCentro',
      label: 'ID Centro',
      placeholder: 'Digite o ID do centro',
      icon: Warehouse,
      required: true,
      maxLength: 50
    },
    {
      id: 'palete',
      label: 'Palete',
      placeholder: 'Digite o número do palete',
      icon: Palette,
      required: true,
      maxLength: 50
    },
    {
      id: 'origem',
      label: 'Origem',
      placeholder: 'Digite a origem',
      icon: ArrowRight,
      required: true,
      maxLength: 50
    },
    {
      id: 'destino',
      label: 'Destino',
      placeholder: 'Digite o destino',
      icon: ArrowRight,
      required: true,
      maxLength: 50
    },
    {
      id: 'prioridade',
      label: 'Prioridade',
      type: 'number',
      placeholder: 'Digite a prioridade',
      required: false
    },
    {
      id: 'sku',
      label: 'SKU',
      placeholder: 'Digite o SKU (opcional)',
      icon: Package,
      required: false
    },
    {
      id: 'lote',
      label: 'Lote',
      placeholder: 'Digite o lote (opcional)',
      required: false
    },
    {
      id: 'descricao',
      label: 'Descrição',
      placeholder: 'Digite a descrição (opcional)',
      required: false
    }
  ] as const
};

// Estado inicial limpo
const INITIAL_FORM_DATA: CreateMovimentacaoDto = {
  idCentro: '',
  palete: '',
  origem: '',
  destino: '',
  prioridade: 0,
  idUsuario: null,
  status: null,
  dataCriacao: null,
  dataExecucao: null,
  sku: null,
  descricao: null,
  lote: null,
};

export function FormAddMovimentacao() {
  const [items, setItems] = useState<CriarNovaMovimentacaoMutationBody>([]);
  const [formData, setFormData] = useState<CreateMovimentacaoDto>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {criarMovimentacao, isCriandoMovimentacao} = useCriarMovimentacao()

  const handleInputChange = (field: keyof CreateMovimentacaoDto, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddItem = async () => {
    // Validação dos campos obrigatórios
    const isValid = FIELD_CONFIG.required.every(field => 
      formData[field] && String(formData[field]).trim().length > 0
    );

    if (!isValid) return;

    setIsSubmitting(true);

    // Simula um processamento assíncrono
    await new Promise(resolve => setTimeout(resolve, 300));

    const newItem: CreateMovimentacaoDto = {
      ...formData,
      prioridade: Number(formData.prioridade) || 0,
      idUsuario: formData.idUsuario || null,
      status: formData.status || null,
      dataCriacao: formData.dataCriacao || null,
      dataExecucao: formData.dataExecucao || null,
      sku: formData.sku?.toString().trim() || null,
      descricao: formData.descricao?.toString().trim() || null,
      lote: formData.lote?.toString().trim() || null,
    };

    setItems(prev => [...prev, newItem]);
    setFormData(INITIAL_FORM_DATA);
    setIsSubmitting(false);
  };

  const handleRemoveItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const handleSubmitAll = async () => {
    if (items.length === 0) return;
    criarMovimentacao(items);
  };

  const isFormValid = FIELD_CONFIG.required.every(field => 
    formData[field] && String(formData[field]).trim().length > 0
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Card do Formulário */}
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl">Nova Movimentação</CardTitle>
          </div>
          <CardDescription>
            Preencha os campos obrigatórios (*) para adicionar uma movimentação
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Grid de Campos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FIELD_CONFIG.fields.map((field) => {
              const isRequired = field.required;
              const value = formData[field.id as keyof CreateMovimentacaoDto] || '';

              return (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id} className="flex items-center gap-1">
                    {field.label}
                    {isRequired && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  <div className="relative">
                    <Input
                      id={field.id}
                      value={value}
                      onChange={(e) => handleInputChange(field.id as keyof CreateMovimentacaoDto, e.target.value)}
                      placeholder={field.placeholder}
  
                      className={`pl-9 ${isRequired && !value ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão de Adicionar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleAddItem}
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              {isSubmitting ? 'Adicionando...' : 'Adicionar Movimentação'}
            </Button>
            
            {items.length > 0 && (
              <Button
                onClick={handleClearAll}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive/10"
                disabled={isSubmitting}
              >
                <Trash2 className="mr-2 h-5 w-5" />
                Limpar Lista
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Movimentações */}
      {items.length > 0 && (
        <Card className="border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Movimentações Adicionadas</CardTitle>
                  <CardDescription>
                    {items.length} {items.length === 1 ? 'item' : 'itens'} na lista
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={handleSubmitAll}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Enviando...' : `Enviar ${items.length} Movimentações`}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
      {items.length === 0 && !isFormValid && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Nenhuma movimentação adicionada
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Preencha o formulário acima para adicionar sua primeira movimentação. 
            Todos os campos marcados com * são obrigatórios.
          </p>
        </div>
      )}
    </div>
  );
}