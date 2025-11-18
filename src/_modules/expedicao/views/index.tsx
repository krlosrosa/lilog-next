'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/_shared/_components/ui/tabs';
import UploadArquivos from '../components/uploadArquivos';
import { ListaTransporte } from './listaTransporte';
import { GerarMapasCarregamento } from '../components/gerarMapasCarregamento';
import { ConfiguracoesImpressao } from './configuracoesImpressao';
import { useState } from 'react';
import { GerarMapaConsolidado } from '../components/groupGerarMapa';

export function GerarMapa() {
  const [valueTab, setValueTab] = useState('upload');
  return (
    <div>
      <Tabs hidden={false} value={valueTab} onValueChange={setValueTab}>
        <TabsList hidden={false}>
          <TabsTrigger value="upload">
            Upload de Arquivos e Validação
          </TabsTrigger>
          <TabsTrigger value="validarTransporte">
            validacaoTransporte
          </TabsTrigger>
          <TabsTrigger value="definicoes">Definicoes</TabsTrigger>
          <TabsTrigger value="gerarMapas">Gerar Mapas</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <UploadArquivos setValueTab={setValueTab} />
        </TabsContent>
        <TabsContent value="validarTransporte">
          <ListaTransporte setValueTab={setValueTab} />
        </TabsContent>
        <TabsContent value="definicoes">
          <ConfiguracoesImpressao setValueTab={setValueTab} />
        </TabsContent>
        <TabsContent value="gerarMapas">
          <GerarMapaConsolidado setValueTab={setValueTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
