'use client';
import { AugmentedZodDto } from "@/_services/api/model";
import { useBuscarProdutosPorTransporte, getBuscarProdutosPorTransporteQueryKey } from "@/_services/api/service/corte-produto/corte-produto";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { corteProdutoItemSchema } from "../schemas/corte-produto-item.schema";
import { useCorte } from "../context/corte.provider";
import { useDebounce } from "@/_shared/hooks/useDebounce";
import { queryClient } from "@/_shared/providers/query/queryClient";
import { useUser } from "@/_shared/providers/UserContext";

export const useBuscarProdutosCorte = () => {


  const { user } = useUser();
  const forms = useForm({
    resolver: zodResolver(corteProdutoItemSchema),
    defaultValues: {
      transporte: '',
      sku: '',
      descricao: '',
      lote: '',
      caixas: 0,
      quantidade: 0,
      segmento: '',
      tipo: '',
    }
  })

  const [transporteId, setTransporteId] = useState<string>('');
  const [globalFilter, setGlobalFilter] = useState('');
  
  // Debounce do transporteId para evitar queries a cada keystroke
  const debouncedTransporteId = useDebounce(transporteId, 500);

  const { selectedProdutos, setSelectedProdutos } = useCorte();

  const { data: produtosCorte, isLoading: isBuscandoProdutosCorte } = useBuscarProdutosPorTransporte( user?.centerSelect as string, debouncedTransporteId, {
    query: {
      enabled: !!debouncedTransporteId,
      // Garantir que sempre refaça a busca quando o transporteId mudar
      staleTime: 0,
      refetchOnMount: true,
      queryKey: ['cortes-produto', debouncedTransporteId],
    },
  });

  // Limpar cache quando o transporteId for limpo para garantir busca ao digitar novamente
  useEffect(() => {
    if (!transporteId) {
      // Limpar todas as queries de transporte quando o campo é limpo
      queryClient.removeQueries({
        predicate: (query) => {
          const key = query.queryKey[0] as string;
          return typeof key === 'string' && key.startsWith('/api/corte-produto/transporte/');
        },
      });
    }
  }, [transporteId]);

  const handleInserirItemCorte = (item: AugmentedZodDto) => {
    setSelectedProdutos([...selectedProdutos, item]);
  }

  return {
    produtosCorte,
    isBuscandoProdutosCorte,
    setTransporteId,
    transporteId,
    debouncedTransporteId,
    globalFilter,
    setGlobalFilter,
    selectedProdutos,
    setSelectedProdutos,
    forms,
    handleInserirItemCorte
  }
}