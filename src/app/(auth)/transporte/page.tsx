import Transporte from "@/_modules/transporte/components";
import CardDashboard from "@/_modules/transporte/components/cardDashboard";
import FiltrosTransporte from "@/_modules/transporte/components/filtros";
import GraficoHoraHora from "@/_modules/transporte/components/graficoHoraHora";
import ListaTransportePorDia from "@/_modules/transporte/components/listaaTransportePorDia";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_shared/_components/ui/tabs";

export default function TransportePage() {
  return (
    <div className="p-2 space-y-4">
      <FiltrosTransporte />
      <Tabs defaultValue="transporte">
        <TabsList className="w-full">
          <TabsTrigger value="transporte">
            Transporte
          </TabsTrigger>
          <TabsTrigger value="graficoHoraHora">
            Grafico Hora Hora
          </TabsTrigger>
          <TabsTrigger value="overview">
            OverView
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transporte">
          <Transporte />
        </TabsContent>
        <TabsContent value="graficoHoraHora">
          <GraficoHoraHora />
        </TabsContent>
        <TabsContent value="overview">
          <ListaTransportePorDia />
        </TabsContent>
      </Tabs>
    </div>
  )
}