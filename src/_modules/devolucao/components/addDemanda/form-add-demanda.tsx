'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDemandaDevolucaoBody } from "@/_services/api/schema/devolucao/devolucao.zod";
import z from "zod";
import { useDevolucao } from "../../hooks/usedevolucao";
import { useEffect, useState } from "react";
import { FormInputField } from "@/_shared/_components/ui/forms/FormInputField";
import { Button } from "@/_shared/_components/ui/button";
import { Form } from "@/_shared/_components/ui/form";
import { FormCheckboxField } from "@/_shared/_components/ui/forms/FormCheckboxField";
import { Input } from "@/_shared/_components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/_shared/_components/ui/dialog";
import FloatButton from "@/_shared/_components/ui/floatButton";
import { Plus } from "lucide-react";
import useAddDemandaDevolucao from "../../hooks/useAddDemandaDevolucao";

export default function FormAddDemanda() {
  const { open, setOpen, form, handleCriarDemanda, isCriandoDemanda, viagemId, setViagemId, infoViagem, isLoading } = useAddDemandaDevolucao();

  useEffect(() => {
    if (infoViagem) {
      form.setValue('placa', infoViagem.placa);
      form.setValue('motorista', infoViagem.motorista);
      form.setValue('idTransportadora', infoViagem.transportadora);
      form.setValue('viagemId', viagemId ?? '');
    }
  }, [infoViagem]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger  asChild>
        <div className="fixed right-6 bottom-6 z-50">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            aria-label="Criar nova demanda"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-4xl">
        <div className="space-y-6">
          {/* Seção de Viagem Ravex */}
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold text-foreground">Viagem Ravex</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                ID da Viagem
              </label>
              <Input
                type="text"
                value={viagemId ?? 'Nenhuma viagem selecionada'}
                onChange={(e) => setViagemId(e.target.value)}
                className="bg-background"
              />
            </div>
          </div>

          {/* Formulário com layout de duas colunas */}
          {isLoading ? <div>Carregando...</div> : <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCriarDemanda)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna 1 */}
                <div className="space-y-6">
                  <FormInputField
                    control={form.control}
                    name="placa"
                    label="Placa do Veículo"
                    placeholder="Digite a placa do veículo"
                  />
                  <FormInputField
                    control={form.control}
                    name="motorista"
                    label="Nome do Motorista"
                    placeholder="Digite o nome do motorista"
                  />
                  <FormInputField
                    control={form.control}
                    name="idTransportadora"
                    label="Nome da Transportadora"
                    placeholder="Digite o nome da transportadora"
                  />
                  <FormInputField
                    control={form.control}
                    name="viagemId"
                    label="ID Viagem Ravex"
                    placeholder="Digite o id da viagem"
                  />
                </div>

                {/* Coluna 2 */}
                <div className="space-y-6">
                  <FormInputField
                    control={form.control}
                    name="telefone"
                    label="Telefone do Motorista"
                    placeholder="Digite o telefone do motorista"
                  />
                  <div className="pt-6">
                    <FormCheckboxField
                      control={form.control}
                      name="cargaSegregada"
                      label="Existe carga segregada"
                    />
                  </div>
                  <FormInputField
                    control={form.control}
                    name="paletesRetorno"
                    label="Paletes Retornados"
                    placeholder="Digite a quantidade de paletes"
            
                  />
                  <FormInputField
                    control={form.control}
                    name="doca"
                    label="Doca de Descarga"
                    placeholder="Digite a doca"
                  />
                </div>
              </div>

              {/* Botão de submit - centralizado */}
              <div className="pt-4 border-t">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-2.5 text-base font-medium"
                >
                  Criar Demanda
                </Button>
              </div>
            </form>
          </Form>}
        </div>
      </DialogContent>
    </Dialog>
  )
}