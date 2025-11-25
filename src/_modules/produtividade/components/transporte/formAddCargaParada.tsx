import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/_shared/_components/ui/form";
import { Input } from "@/_shared/_components/ui/input";
import { Textarea } from "@/_shared/_components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_shared/_components/ui/select";
import { Calendar, AlertCircle } from "lucide-react";
import z from "zod";
import { UseFormReturn } from "react-hook-form";
import { criarCargaParadaBody } from "@/_services/api/schema/transporte/transporte.zod";
import { Button } from "@/_shared/_components/ui/button";

type FormAddCargaParadaProps = {
  form: UseFormReturn<z.infer<typeof criarCargaParadaBody>>;
  handleFormSubmit: (data: z.infer<typeof criarCargaParadaBody>) => void;
}

export default function FormAddCargaParada({ form, handleFormSubmit }: FormAddCargaParadaProps) {

  const motivoOptions = [
    { value: "falta_veiculo", label: "Falta de Veículo", icon: "🚛" },
    { value: "capacidade_operacional", label: "Capacidade Operacional", icon: "⚡" }
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-2">
        {/* Campo Motivo */}
        <FormField
          control={form.control}
          name="motivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                Motivo da carga parada
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                <FormControl>
                  <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione o motivo da carga parada" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-full">
                  {motivoOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="flex items-center gap-3 py-3">
                      <span className="text-lg">{option.icon}</span>
                      <span>{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 text-xs flex items-center gap-1 mt-1" />
            </FormItem>
          )}
        />
        {/* Campo Observação */}
        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Observações Adicionais
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhes sobre a situação da carga parada..."
                  className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormMessage className="text-red-500 text-xs flex items-center gap-1" />
                <span className="text-xs text-gray-500">
                  {field.value?.length || 0}/500 caracteres
                </span>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}