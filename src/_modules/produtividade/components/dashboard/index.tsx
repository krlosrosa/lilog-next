'use client';
import { useDashboardProdutividade } from "../../hooks/useDashboardProdutividade";
import GraficoDiaDia from "./graficoDiaDia";
import Top5Melhores from "./top5Melhores";
import { Card } from "@/_shared/_components/ui/card";
import { CardContent } from "@/_shared/_components/ui/card";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";
import ProdutividadeDiaDia from "./produtividadeDiaDia";
import RankingFuncionarioT5 from "./rankingFuncionarioT5";
import RankingFuncionariosB5 from "./rankingFunctionariosB5";

export default function Dashboard() {
  const {
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    isBuscandoDashDiaDia,
    produtividadeDiaDia,
    top5ProdutividadeDiaDia,
    bottom5ProdutividadeDiaDia,
  } = useDashboardProdutividade();
  return (
    <div>
      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Início</label>
                <Input
                  type="date"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Fim</label>
                <Input
                  type="date"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={() => { }}
              disabled={isBuscandoDashDiaDia}
              className="w-full sm:w-auto"
            >
              {isBuscandoDashDiaDia ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <ProdutividadeDiaDia produtividadeDiaDia={produtividadeDiaDia || []} />
      <div className="flex gap-4">

      <RankingFuncionarioT5 topFuncionarios={top5ProdutividadeDiaDia || []} />
      <RankingFuncionariosB5 topFuncionarios={bottom5ProdutividadeDiaDia || []} tipo="piores" titulo="Top 5 Piores Desempenhos" descricao="Colaboradores com menor produtividade no período" />
      </div>
    </div>
  )
}