"use client";

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
  inventoryFormSchema,
  type InventoryFormValues,
  TIPO_FILTRO_OPTIONS,
} from "../schemas/inventory-form.schema";
import { AccountingUpload } from "./AccountingUpload";
import { useCreateInventory } from "../hooks/useCreateInventory";
import { useUser } from "@/_shared/providers/UserContext";

const defaultValues: InventoryFormValues = {
  nome: "",
  tipoFiltro: "",
  arquivoContabil: null,
};

export function InventoryForm() {
  const { user } = useUser();
  const centerId = user?.centerSelect ?? null;
  const { handleCreateInventory, isCreating } = useCreateInventory(centerId);

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema) as Resolver<InventoryFormValues>,
    defaultValues,
  });

  function onSubmit(values: InventoryFormValues) {
    return handleCreateInventory(values).then(() => {
      form.reset(defaultValues);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormInputField
            control={form.control}
            name="nome"
            label="Nome da ordem"
            placeholder="Ex.: Inventário Rua A - Jan/2025"
          />

          <FormField
            control={form.control}
            name="tipoFiltro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Escopo da contagem</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione Rua ou Categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIPO_FILTRO_OPTIONS.map((opt) => (
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

        <FormField
          control={form.control}
          name="arquivoContabil"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AccountingUpload
                  id="inventory-accounting-file"
                  file={field.value}
                  onChange={field.onChange}
                  required
                  disabled={isCreating}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 border-t pt-4">
          <Button
            type="submit"
            disabled={isCreating}
            className="min-w-[140px]"
          >
            {isCreating ? "Criando…" : "Criar ordem de inventário"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset(defaultValues)}
            disabled={isCreating}
          >
            Limpar
          </Button>
        </div>
      </form>
    </Form>
  );
}
