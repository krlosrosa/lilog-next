import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/_shared/_components/ui/tabs";
import DefinicaoRegra1Nome from "./1-definicao";
import DefinicaoRegra2Regras from "./2-regras";
import DefinicaoRegra3Erros from "./3-erros";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/_shared/_components/ui/sheet";
import { Button } from "@/_shared/_components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useEngineAnomaliaStore } from "../../stores/engineAnomalia.store";

export default function DefinicaoRegra() {
  const [tab, setTab] = useState<string>('1-definicao');
  const { processo, event, query } = useEngineAnomaliaStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Nova Regra
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl flex flex-col p-2">
        <SheetHeader>
          <SheetTitle>
            Definicao da Regra
          </SheetTitle>
        </SheetHeader>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="1-definicao"> Definicao </TabsTrigger>
            <TabsTrigger value="2-regras"> Regras </TabsTrigger>
            <TabsTrigger value="3-erros"> Erros </TabsTrigger>
          </TabsList>
          <TabsContent value="1-definicao">
            <DefinicaoRegra1Nome />
          </TabsContent>
          <TabsContent value="2-regras">
            <DefinicaoRegra2Regras />
          </TabsContent>
          <TabsContent value="3-erros">
            <DefinicaoRegra3Erros />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}