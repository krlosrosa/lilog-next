'use client';

import { useUser } from '@/_shared/providers/UserContext';
import { useProdutividadeOperations } from '../../hooks/useProdutividadeOperations';
import { Button } from '@/_shared/_components/ui/button';
import { DemandaCreateDataComPaletesIdsProcesso } from '@/_services/api/model';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { FormPalete } from './formPalete';
import SelecionarFuncionario from './selecionarFuncionario';
import { ArrowLeft, Plus } from 'lucide-react';
import { useState } from 'react';
import { useAddProdutividade } from '../../hooks/mutation/useAddProdutividade';
import { Form } from '@/_shared/_components/ui/form';

export default function AddProdutividade() {

  const { isCriandoDemanda, criarDemandaProdutividade, forms, setCurrentTab, currentTab } =
    useAddProdutividade();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="fixed right-6 bottom-6 z-50">
          <Button
            disabled={isCriandoDemanda}
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            aria-label="Criar nova demanda"
          >
            <Plus className="h-16 w-16" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Adicionar Produtividade</DialogTitle>
            {currentTab === 'funcionario' && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setCurrentTab('palete')}
                className="text-muted-foreground hover:text-foreground h-7"
              >
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                Voltar
              </Button>
            )}
          </div>
          <DialogDescription>
            Preencha os dados abaixo para adicionar uma nova produtividade.
          </DialogDescription>
        </DialogHeader>
        <Form {...forms}>
          <form
            onSubmit={forms.handleSubmit(criarDemandaProdutividade)}
            className="space-y-4"
          >
            {currentTab === 'palete' ? (
              <FormPalete
                onAddFuncionario={() => setCurrentTab('funcionario')}
              />
            ) : (
              <SelecionarFuncionario
                onAddNewFuncionario={() => {}}
                onBack={() => setCurrentTab('palete')}
              />
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
