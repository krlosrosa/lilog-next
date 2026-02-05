'use client';

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useCadastrarNotaFiscal } from "../hooks/useCadastrarNotaFiscal";
import { ModalViagemSearch } from "../components/ModalViagemSearch";
import { DemandaInfoCards } from "../components/DemandaInfoCards";
import { NotaFiscalCard } from "../components/NotaFiscalCard";
import { ModalConfirmacaoNota, type ItemDivergencia } from "../components/ModalConfirmacaoNota";
import { Button } from "@/_shared/_components/ui/button";
import { Loader2, FileText, ArrowLeft } from "lucide-react";
import type { ReturnInfoGeralRavexNotasItemItensItem } from "@/_services/api/model";

export default function CadastrarNotaFiscal() {
  const { id } = useParams();
  const router = useRouter();
  const {
    demanda,
    isLoadingDemanda,
    viagemId,
    setViagemId,
    infoViagem,
    isLoadingViagem,
    errorViagem,
    isNotaAlreadyAdded,
    handleOpenConfirmModal,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    selectedNota,
    selectedItens,
    nfParcial,
    setNfParcial,
    handleConfirmAddNota,
    isAddingNota,
  } = useCadastrarNotaFiscal();

  const hasDivergence = (item: ReturnInfoGeralRavexNotasItemItensItem) => {
    const qtdRavex = Number(item.quantidadeRavex ?? 0);
    const qtdCaixas = Number(item.quantidadeCaixas ?? 0);
    const decimal = Number(item.decimal ?? 0);
    const tol = 1e-6;
    return qtdRavex !== qtdCaixas && qtdRavex !== decimal;
  };

  const itensComDivergencia = useMemo((): ItemDivergencia[] => {
    if (!selectedItens.length) return [];
    return selectedItens
      .filter(hasDivergence)
      .map((item) => ({ sku: item.sku, descricao: item.descricao ?? '' }));
  }, [selectedItens]);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 space-y-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/return/demanda/${id}`)}
        className="gap-2 -ml-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Cadastrar Notas Fiscais</h1>
          <p className="text-muted-foreground">
            Adicione notas fiscais à demanda selecionada
          </p>
        </div>
        <ModalViagemSearch
          viagemId={viagemId}
          onViagemIdChange={setViagemId}
          onConfirm={() => {}}
          isLoading={isLoadingViagem}
        />
      </div>

      {/* Loading da Demanda */}
      {isLoadingDemanda && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Carregando informações da demanda...
            </p>
          </div>
        </div>
      )}

      {/* Cards de Informações da Demanda */}
      {demanda && !isLoadingDemanda && (
        <DemandaInfoCards demanda={demanda} />
      )}

      {/* Erro ao buscar viagem */}
      {errorViagem && viagemId && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">
            Erro ao buscar viagem: {errorViagem.message || 'Viagem não encontrada'}
          </p>
        </div>
      )}

      {/* Loading da Viagem */}
      {isLoadingViagem && viagemId && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Buscando notas fiscais da viagem...
            </p>
          </div>
        </div>
      )}

      {/* Lista de Notas Fiscais */}
      {infoViagem && !isLoadingViagem && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Notas Fiscais Disponíveis
            </h2>
            <p className="text-sm text-muted-foreground">
              {infoViagem.notas.length} {infoViagem.notas.length === 1 ? 'nota encontrada' : 'notas encontradas'}
            </p>
          </div>

          {infoViagem.notas.length === 0 ? (
            <div className="p-8 border-2 border-dashed rounded-lg bg-muted/30 text-center">
              <p className="text-muted-foreground">
                Nenhuma nota fiscal encontrada para esta viagem
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {infoViagem.notas.map((nota) => (
                <NotaFiscalCard
                  key={`${nota.notaFiscal}-${nota.notaFiscalParcial || ''}`}
                  nota={nota}
                  idViagemRavex={viagemId}
                  demandaId={parseInt(demanda?.id?.toString() || '0')}
                  isAlreadyAdded={isNotaAlreadyAdded(nota.notaFiscal)}
                  onAddNota={handleOpenConfirmModal}
                  isAdding={isAddingNota && selectedNota?.notaFiscal === nota.notaFiscal}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Estado inicial - quando não há viagem */}
      {!viagemId && !isLoadingViagem && (
        <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Clique em "Buscar Viagem" para carregar as notas fiscais disponíveis
            </p>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {selectedNota && (
        <ModalConfirmacaoNota
          open={isConfirmModalOpen}
          onOpenChange={setIsConfirmModalOpen}
          onConfirm={handleConfirmAddNota}
          tipo={selectedNota.tipo}
          nfParcial={nfParcial}
          onNfParcialChange={setNfParcial}
          isLoading={isAddingNota}
          numeroNota={selectedNota.notaFiscal}
          itensComDivergencia={itensComDivergencia}
        />
      )}
    </div>
  );
}
