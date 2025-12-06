'use client';
import { useDashboardProdutividade } from "../../hooks/useDashboardProdutividade";
import { Card } from "@/_shared/_components/ui/card";
import { CardContent } from "@/_shared/_components/ui/card";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";
import ProdutividadeDiaDia from "./produtividadeDiaDia";
import RankingFuncionarioT5 from "./rankingFuncionarioT5";
import RankingFuncionariosB5 from "./rankingFunctionariosB5";
import PorTurno from "./porTurno";
import { useFilterDash } from "../../hooks/useFilterDash";
import { Select, SelectTrigger } from "@/_shared/_components/ui/select";
import { SelectValue } from "@/_shared/_components/ui/select";
import { SelectContent } from "@/_shared/_components/ui/select";
import { SelectItem } from "@/_shared/_components/ui/select";
import { DataTableFuncionario } from "./table/data-table-funcionario";
import { columnsFuncionarioDashboard } from "./table/columnsFuncionario";

export default function Dashboard() {
  const {
    isBuscandoDashDiaDia,
    produtividadeDiaDia,
    top5ProdutividadeDiaDia,
    bottom5ProdutividadeDiaDia,
    porTurnoEProcesso,
    listaProdutividadePorFuncionario, 
  } = useDashboardProdutividade();
  const { filters, setFilter } = useFilterDash();
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
                  value={filters.dataInicio}
                  onChange={(e) => setFilter('dataInicio', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Fim</label>
                <Input
                  type="date"
                  value={filters.dataFim}
                  onChange={(e) => setFilter('dataFim', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Processo</label>
                <Select
                  value={filters.processo}
                  onValueChange={(value) => setFilter('processo', value)}
                >
                  <SelectTrigger id="processo">
                    <SelectValue placeholder="Selecione um processo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SEPARACAO">Separação</SelectItem>
                    <SelectItem value="CONFERENCIA">Conferência</SelectItem>
                    <SelectItem value="CARREGAMENTO">Carregamento</SelectItem>
                  </SelectContent>
                </Select>
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
      <PorTurno porTurnoEProcesso={porTurnoEProcesso || []} />
      <DataTableFuncionario columns={columnsFuncionarioDashboard} data={listaProdutividadePorFuncionario || []} />
    </div>
  )
}