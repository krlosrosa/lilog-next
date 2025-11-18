'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_shared/_components/ui/tabs";
import CardDashboard from "../components/cardDashboard";
import FiltrosTransporte from "../components/filtros";
import GraficoHoraHora from "../components/graficoHoraHora";
import ListaTransportePorDia from "../components/listaaTransportePorDia";
import CardDetalhamentoTransporte from "../components/cardDetalhamentoTransporte";
import ModalDetalhamentoTransporte from "../components/cardDetalhamentoTransporte";
import { useState } from "react";

export default function DashboardTransporteView() {
  const [openModalDetalhamentoTransporte, setOpenModalDetalhamentoTransporte] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      <h1>Dashboard de Transporte</h1>
          <FiltrosTransporte />
      <Tabs defaultValue="transportes">
        <TabsList defaultValue="transportes">
          <TabsTrigger value="transportes">
            Transportes
          </TabsTrigger>
          <TabsTrigger value="acompanhamento">
            hora a hora
          </TabsTrigger>
          <TabsTrigger value="detalhamento">
            detalhamento
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transportes">
          <CardDashboard />
          <ListaTransportePorDia />
        </TabsContent>
        <TabsContent value="acompanhamento">
          <GraficoHoraHora />
        </TabsContent>
        <TabsContent value="detalhamento">
          <ModalDetalhamentoTransporte transporteId="53055630" />
        </TabsContent>
      </Tabs>
    </div>
  )
}