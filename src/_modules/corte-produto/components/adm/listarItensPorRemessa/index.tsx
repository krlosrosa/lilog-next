'use client';
import { useAddCorteProdutoAdm } from "@/_modules/corte-produto/hooks/useAddCorteProdutoAdm";
import { Input } from "@/_shared/_components/ui/input";
import { Loader2, ArrowLeft } from "lucide-react";
import { DataTableItensPorRemessa } from "./data-table-corte";
import { columnsItensPorRemessa } from "./columnsCorte";
import { Button } from "@/_shared/_components/ui/button";
import { Label } from "@/_shared/_components/ui/label";
import { ConfirmarAddCorteModal } from "./confirmarAddCorteModal";
import { useRouter } from "next/navigation";

export default function ListarItensPorRemessa() {
  const router = useRouter();
  const { produtosCorteFiltered, isBuscandoProdutosCorte, setTransporteId, transporteId, globalFilter, setGlobalFilter, filterRemessa, setFilterRemessa, open, setOpen, handleCadastrarCorte } = useAddCorteProdutoAdm();
  
  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="h-9 w-9 shrink-0"
            aria-label="Voltar para página anterior"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="space-y-1 flex-1">
            <h1 className="text-2xl font-bold">Listar Itens por Remessa</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie os cortes de produtos por remessa
            </p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="space-y-4 rounded-lg border bg-background p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="transporte" className="text-sm font-medium">
              ID do Transporte
            </Label>
            <Input
              id="transporte"
              placeholder="Digite o ID do transporte"
              value={transporteId}
              onChange={(e) => setTransporteId(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="remessa" className="text-sm font-medium">
              Filtro da Remessa
            </Label>
            <Input
              id="remessa"
              placeholder="Digite o filtro da remessa"
              value={filterRemessa}
              onChange={(e) => setFilterRemessa(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="flex items-end">
            <ConfirmarAddCorteModal dadosFiltrados={produtosCorteFiltered ?? []} open={open} setOpen={setOpen} handleAddCorteProduto={handleCadastrarCorte}>

            <Button
              disabled={isBuscandoProdutosCorte || !transporteId || filterRemessa.length !== 10}
              className="w-full h-9"
              >
              Cadastrar Corte
            </Button>
              </ConfirmarAddCorteModal>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className="space-y-4">
        {isBuscandoProdutosCorte ? (
          <div className="flex h-64 items-center justify-center rounded-lg border bg-background">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Carregando produtos...</p>
            </div>
          </div>
        ) : (
          <DataTableItensPorRemessa columns={columnsItensPorRemessa} data={produtosCorteFiltered ?? []} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        )}
      </div>
    </div>
  )
}