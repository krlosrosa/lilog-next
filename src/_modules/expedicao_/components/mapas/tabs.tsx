import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_shared/_components/ui/tabs";
import { ClipboardList, FileText, PackageCheck } from "lucide-react";
import { Separacao } from "./separacao";
import { ImpressaoMapa } from "../../others/types/items";
import { ConfiguracaoImpressao } from "../../others/types/configuracaoImpressa";
import MapasConferencia from "./conferencia";
import Protocolo from "./protocolo";

type TabsMapasProps = {
  configuracaoImpressao: ConfiguracaoImpressao | null;
  clientesSegregados: string[];
}

export function TabsMapas({ configuracaoImpressao, clientesSegregados }: TabsMapasProps) {

  const styleTabs = "py-4 w-52 items-center data-[state=active]:bg-primary/10 data-[state=active]:text-primary justify-start border-b border-b-secondary/10 rounded-none hover:bg-primary/10 hover:cursor-pointer";
  return (
    <Tabs defaultValue="separacao" className="w-full">
      <div className="flex gap-2">
        <TabsList className="flex bg-transparent flex-col rounded-none mt-10 items-stretch">
          <TabsTrigger value="separacao" className={styleTabs}>
            <PackageCheck className="h-4 w-4" />
            Mapa de Separação
          </TabsTrigger>
          <TabsTrigger value="conferencia" className={styleTabs}>
            <ClipboardList className="h-4 w-4" />
            Mapa de Conferência
          </TabsTrigger>
          <TabsTrigger value="protocolo" className={styleTabs}>
            <FileText className="h-4 w-4" />
            Protocolo
          </TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="separacao">
            <Separacao
              configuracaoImpressao={configuracaoImpressao}
              clientesSegregados={clientesSegregados}
            />
          </TabsContent>
          <TabsContent value="conferencia">
            <MapasConferencia/>
          </TabsContent>
          <TabsContent value="protocolo">
            <Protocolo/>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
