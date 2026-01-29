import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetInfoViagemRavex } from "@/_modules/devolucao/hooks/queries/getInfoViagemRavex";
import useGetNfCadastradas from "@/_modules/devolucao/hooks/queries/getNfCadastradas";
import useDemandaPorIdQuery from "@/_modules/devolucao/hooks/queries/demandaPorId";
import useAddNota from "@/_modules/devolucao/hooks/mutation/addNota";
import { AddNotaDto } from "@/_services/api/model";
import { ReturnInfoGeralRavexNotasItem, ReturnInfoGeralRavexNotasItemItensItem } from "@/_services/api/model";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";

export function useCadastrarNotaFiscal() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const demandaId = parseInt(id as string);
  const queryClient = useQueryClient();
  
  // Pegar viagemId da URL se existir (vindo do cadastro de demanda)
  const viagemIdFromUrl = searchParams?.get('viagemId') || '';
  const [viagemId, setViagemId] = useState<string>(viagemIdFromUrl);
  
  // Atualizar viagemId quando a URL mudar (quando vier do cadastro de demanda)
  useEffect(() => {
    if (viagemIdFromUrl && viagemIdFromUrl !== viagemId) {
      setViagemId(viagemIdFromUrl);
    }
  }, [viagemIdFromUrl]);
  const [selectedNota, setSelectedNota] = useState<ReturnInfoGeralRavexNotasItem | null>(null);
  const [selectedItens, setSelectedItens] = useState<ReturnInfoGeralRavexNotasItemItensItem[]>([]);
  const [nfParcial, setNfParcial] = useState<string>('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Buscar demanda
  const { data: demanda, isLoading: isLoadingDemanda } = useDemandaPorIdQuery(id as string);

  // Buscar informações da viagem
  const { data: infoViagem, isLoading: isLoadingViagem, error: errorViagem } = useGetInfoViagemRavex(viagemId);

  // Buscar notas já cadastradas
  const { data: notasCadastradas, isLoading: isLoadingNotasCadastradas } = useGetNfCadastradas(id as string);

  // Mutation para adicionar nota
  const { addNotaMutation, isAddingNota } = useAddNota();

  // Verificar quais notas já foram adicionadas
  const notasAdicionadas = useMemo(() => {
    if (!notasCadastradas) return new Set<string>();
    return new Set(notasCadastradas.map(nf => nf.notaFiscal));
  }, [notasCadastradas]);

  // Função para verificar se uma nota já foi adicionada
  const isNotaAlreadyAdded = (notaFiscal: string) => {
    return notasAdicionadas.has(notaFiscal);
  };

  // Função para abrir modal de confirmação
  const handleOpenConfirmModal = (nota: ReturnInfoGeralRavexNotasItem, itens: ReturnInfoGeralRavexNotasItemItensItem[]) => {
    setSelectedNota(nota);
    setSelectedItens(itens);
    setNfParcial('');
    setIsConfirmModalOpen(true);
  };

  // Função para confirmar e adicionar nota
  const handleConfirmAddNota = async () => {
    if (!selectedNota || !selectedItens.length) return;

    const notaData: AddNotaDto = {
      empresa: selectedNota.empresa as 'LDB' | 'ITB' | 'DPA',
      devolucaoDemandaId: demandaId,
      notaFiscal: selectedNota.notaFiscal,
      motivoDevolucao: selectedNota.motivoDevolucao,
      descMotivoDevolucao: selectedNota.descMotivoDevolucao ?? '',
      nfParcial: selectedNota.tipo === 'DEVOLUCAO_PARCIAL' ? nfParcial : undefined,
      idViagemRavex: viagemId,
      tipo: selectedNota.tipo,
      itens: selectedItens.map((item) => ({
        sku: item.sku,
        descricao: item.descricao,
        lote: undefined,
        fabricacao: undefined,
        sif: undefined,
        quantidadeCaixas: item.quantidadeCaixas ?? 0,
        quantidadeUnidades: item.quantidadeUnidades ?? 0,
        avariaCaixas: undefined,
        tipo: selectedNota.tipo,
        demandaId: demandaId,
      })),
    };

    try {
      const promise = addNotaMutation({ data: notaData });
      
      // Invalidar queries após sucesso (não bloqueante)
      promise.then((response: string) => {
        // Invalidar queries para atualizar a lista de notas cadastradas
        queryClient.invalidateQueries({ queryKey: ['nf-cadastradas', 'demandas', id] });
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
        
        setIsConfirmModalOpen(false);
        setSelectedNota(null);
        setSelectedItens([]);
        setNfParcial('');
      });
      
      toast.promise(promise, {
        loading: 'Adicionando nota fiscal...',
        success: (response: string) => {
          return `Nota fiscal adicionada com sucesso! ID: ${response}`;
        },
        error: (err: any) => `${getAxiosErrorMessage(err) || 'Erro ao adicionar nota fiscal. Tente novamente mais tarde.'}`,
      });
    } catch (error) {
      toast.error('Erro ao adicionar nota fiscal');
    }
  };

  return {
    demandaId,
    demanda,
    isLoadingDemanda,
    viagemId,
    setViagemId,
    infoViagem,
    isLoadingViagem,
    errorViagem,
    notasCadastradas,
    isLoadingNotasCadastradas,
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
  };
}
