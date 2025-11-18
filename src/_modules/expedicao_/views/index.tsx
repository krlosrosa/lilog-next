'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/_shared/_components/ui/tabs';
import { useState } from 'react';
import { UploadTab } from './upload';
import { TransporteTab } from './transporte';
import { DefinicoesTab } from './definicoes';
import MapaTab from './mapa';

export function Expedicao() {
  const [valueTab, setValueTab] = useState<string>('upload');
  return (
    <div>
      <Tabs hidden={false} value={valueTab} onValueChange={setValueTab}>
        <TabsList hidden={true}>
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
          <UploadTab setValueTab={setValueTab}/>
        </TabsContent>
        <TabsContent value="validarTransporte">
          <TransporteTab setValueTab={setValueTab} />
        </TabsContent>
        <TabsContent value="definicoes">
          <DefinicoesTab setValueTab={setValueTab} />
        </TabsContent>
        <TabsContent value="gerarMapas">
          <MapaTab setValueTab={setValueTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
