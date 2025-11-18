'use client';

import { useUser } from '@/_shared/providers/UserContext';
import { criarConfiguracaoImpressaoBody } from '@/_services/api/schema/center/center.zod';
import { Button } from '@/_shared/_components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import { Separator } from '@/_shared/_components/ui/separator';
import { Form } from '@/_shared/_components/ui/form';
import { Loader2 } from 'lucide-react';
import { DadosBasicos } from './sections/dados-basicos';
import { QuebraPalete } from './sections/quebra-palete';
import { OpcoesSeparacao } from './sections/opcoes-separacao';
import { OutrasConfiguracoes } from './sections/outras-configuracoes';
import { ConfiguracoesConferencia } from './sections/configuracoes-conferencia';
import { CamposSistema } from './sections/campos-sistema';
import { useCriarConfiguracaoCentro } from '../../hooks/mutation/useCriarConfiguracaoCentro';

export function ConfigCenter() {

  const { user } = useUser();
  const { form, onSubmit, empresa, setEmpresa, ordemOpen, setOrdemOpen, sensors, isCreatingConfiguracaoCentro, isLoadingConfiguracaoImpressa } = useCriarConfiguracaoCentro();

  // Bloqueia renderização até o contexto estar pronto (evita erro de hidratação)
  if (!user?.centerSelect) {
    return null;
  }

  if (isLoadingConfiguracaoImpressa) {
    return (
      <div className="mx-auto max-w-5xl space-y-4 p-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-2 py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Carregando configuração...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurar Impressão de Mapa</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <DadosBasicos
                control={form.control}
                empresa={empresa}
                onEmpresaChange={setEmpresa}
              />

              <Separator />

              <QuebraPalete control={form.control} />

              <Separator />

              <OpcoesSeparacao control={form.control} />

              <Separator />

              <OutrasConfiguracoes control={form.control} />

              <Separator />

              <ConfiguracoesConferencia
                control={form.control}
                ordemOpen={ordemOpen}
                onOrdemOpenChange={(field, open) =>
                  setOrdemOpen((prev) => ({ ...prev, [field]: open }))
                }
                sensors={sensors}
              />

              <Separator />

              <CamposSistema control={form.control} />

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isCreatingConfiguracaoCentro}
                >
                  Limpar
                </Button>
                <Button type="submit" disabled={isCreatingConfiguracaoCentro}>
                  {isCreatingConfiguracaoCentro ? 'Salvando...' : 'Salvar Configuração'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
