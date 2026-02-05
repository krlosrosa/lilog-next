"use client";

import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_shared/_components/ui/form";
import { FormInputField } from "@/_shared/_components/ui/forms/FormInputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_shared/_components/ui/select";
import { Button } from "@/_shared/_components/ui/button";
import {
  produtoFormSchema,
  type ProdutoFormValues,
  SEGMENTO_OPTIONS,
  EMPRESA_OPTIONS,
  TIPO_PESO_OPTIONS,
} from "../schemas/produto-form.schema";
import { useProductEdit } from "../hooks/useProductEdit";

const emptyValues: ProdutoFormValues = {
  codDum: "",
  codEan: "",
  sku: "",
  descricao: "",
  shelf: 0,
  pesoLiquidoCaixa: "",
  pesoLiquidoUnidade: "",
  unPorCaixa: 1,
  caixaPorPallet: 1,
  segmento: "",
  empresa: "",
  tipoPeso: "PPAR",
};

interface ProductEditFormProps {
  sku: string;
  onSuccess?: () => void;
}

export function ProductEditForm({ sku, onSuccess }: ProductEditFormProps) {
  const { initialValues, handleUpdateProduct, isUpdating } = useProductEdit(sku);

  const form = useForm<ProdutoFormValues>({
    resolver: zodResolver(produtoFormSchema) as Resolver<ProdutoFormValues>,
    defaultValues: initialValues ?? emptyValues,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues]);

  async function onSubmit(values: ProdutoFormValues) {
    await handleUpdateProduct(values);
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FormInputField
            control={form.control}
            name="sku"
            label="SKU"
            placeholder="Ex.: PROD-001"
            description="Identificador único do produto (não editável na API)"
          />
          <FormInputField
            control={form.control}
            name="descricao"
            label="Descrição"
            placeholder="Nome do produto"
          />
          <FormInputField
            control={form.control}
            name="codEan"
            label="Código EAN"
            placeholder="Código de barras EAN"
          />
          <FormInputField
            control={form.control}
            name="codDum"
            label="Código DUM"
            placeholder="Código DUM"
          />
          <FormInputField
            control={form.control}
            name="shelf"
            label="Shelf"
            type="number"
            placeholder="0"
          />
          <FormInputField
            control={form.control}
            name="pesoLiquidoCaixa"
            label="Peso líquido da caixa"
            placeholder="Ex.: 12.5"
          />
          <FormInputField
            control={form.control}
            name="pesoLiquidoUnidade"
            label="Peso líquido da unidade"
            placeholder="Ex.: 0.5"
          />
          <FormInputField
            control={form.control}
            name="unPorCaixa"
            label="Unidades por caixa"
            type="number"
            placeholder="1"
          />
          <FormInputField
            control={form.control}
            name="caixaPorPallet"
            label="Caixas por pallet"
            type="number"
            placeholder="1"
          />
          <FormField
            control={form.control}
            name="segmento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Segmento</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione SEC ou REF" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SEGMENTO_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="empresa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione LDB, ITB ou DPA" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EMPRESA_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="tipoPeso"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de peso</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione PVAR ou PPAR" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIPO_PESO_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3 border-t pt-4">
          <Button type="submit" disabled={isUpdating} className="min-w-[140px]">
            {isUpdating ? "Atualizando…" : "Atualizar produto"}
          </Button>
          {initialValues && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset(initialValues)}
              disabled={isUpdating}
            >
              Restaurar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
