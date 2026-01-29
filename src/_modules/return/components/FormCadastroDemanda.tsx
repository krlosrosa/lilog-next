'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/_shared/_components/ui/card";
import { Button } from "@/_shared/_components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/_shared/_components/ui/form";
import { Input } from "@/_shared/_components/ui/input";
import { Checkbox } from "@/_shared/_components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Warehouse, Package, CheckSquare } from "lucide-react";
import z from "zod";
import { addDemandaDevolucaoBody } from "@/_services/api/schema/devolucao/devolucao.zod";

interface FormCadastroDemandaProps {
  form: UseFormReturn<z.infer<typeof addDemandaDevolucaoBody>>;
  onSubmit: (data: z.infer<typeof addDemandaDevolucaoBody>) => void;
  isSubmitting?: boolean;
}

export function FormCadastroDemanda({ 
  form, 
  onSubmit, 
  isSubmitting = false 
}: FormCadastroDemandaProps) {
  return (
    <Card className="border shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Warehouse className="h-5 w-5" />
          Informações do Armazém
        </CardTitle>
        <CardDescription>
          Preencha as informações sobre a descarga do veículo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Grid principal - 3 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Doca */}
              <FormField
                control={form.control}
                name="doca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Warehouse className="h-4 w-4 text-muted-foreground" />
                      Doca de Descarga
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: Doca 1"
                        className="h-10"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Onde o veículo será descarregado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Quantidade de Paletes */}
              <FormField
                control={form.control}
                name="paletesRetorno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      Quantidade de Paletes
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                        className="h-10"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Paletes que serão retornados
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Telefone */}
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone do Motorista</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="(00) 00000-0000"
                        className="h-10"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Para contato
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Carga Segregada */}
            <div className="pt-2 border-t">
              <FormField
                control={form.control}
                name="cargaSegregada"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-2 cursor-pointer">
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        Carga Segregada
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Marque se a carga está segregada (separada por tipo ou destino)
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Botão de Submit */}
            <div className="pt-4 border-t flex justify-end">
              <Button 
                type="submit" 
                className="min-w-[200px]"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando Demanda...
                  </>
                ) : (
                  'Criar Demanda'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
