import { useBuscarProdutosPorTransporte, useCriarCorteDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useDebounce } from "@/_shared/hooks/useDebounce";
import { useEffect, useState } from "react";
import { AugmentedZodDto, CorteMercadoriaDtoDirecao } from "@/_services/api/model";
import { TipoCorteEnum } from "../enums/tipor-corte";
import { useUser } from "@/_shared/providers/UserContext";
import toast from "react-hot-toast";
import { reduceForAdmin } from "../utils/reduceForAdmin";
import { reduceForOperation } from "../utils/reduceForOperation";

export const  useAddCorteProdutoAdm = () => {
  const { user } = useUser();
  const [transporteId, setTransporteId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [filterRemessa, setFilterRemessa] = useState<string>('');
  const [produtosCorteFiltered, setProdutosCorteFiltered] = useState<AugmentedZodDto[]>([]);
  const debouncedTransporteId = useDebounce(transporteId, 500);

  const { data: produtosCorte, isLoading: isBuscandoProdutosCorte } = useBuscarProdutosPorTransporte(user?.centerSelect as string, debouncedTransporteId, {
    query: {
      enabled: !!debouncedTransporteId,
      staleTime: 0,
      refetchOnMount: true,
    },
  });

  const { mutateAsync: criarCorteProduto, isPending: isCriandoCorteProduto } = useCriarCorteDeProduto();

  function handleFilterRemessa(value: string) {
    const filteredData = produtosCorte?.filter((item) => item.remessa.includes(value));
    const reducedData = reduceForAdmin(filteredData ?? []);
    setProdutosCorteFiltered(reducedData ?? []);
    setFilterRemessa(value);
  }

  useEffect(() => {
    if (produtosCorte) {
      handleFilterRemessa(filterRemessa);
    }
  }, [produtosCorte, filterRemessa]);

  function handleCadastrarCorte() {
    const reduceOperation = reduceForOperation(produtosCorteFiltered ?? []);
    const corte = reduceOperation.map((item) => ({
      produto: item.sku,
      lote: item.lote,
      motivo: TipoCorteEnum.RECUSA_SEFAZ,
      transporteId: item.transporte,
      unidades: item.quantidade || 0,
      descricao: item.descricao,
      caixas: item.caixas || 0,
      direcao: 'ADMINISTRATIVO' as CorteMercadoriaDtoDirecao,
    }));
    const promise = criarCorteProduto({
      centerId: user?.centerSelect as string,
      data: corte,
    });
    toast.promise(promise, {
      loading: 'Salvando corte de produto...',
      success: 'Corte de produto salvo com sucesso!',
      error: (err: any) => `Ocorreu um erro: ${err.message || 'Tente novamente.'}`,
    });
    setOpen(false);
    setProdutosCorteFiltered([]);
    setFilterRemessa('');
    setTransporteId('');
    setGlobalFilter('');
    setTransporteId('');
  }


  return {
    produtosCorte,
    isBuscandoProdutosCorte,
    setTransporteId,
    transporteId,
    debouncedTransporteId,
    produtosCorteFiltered,
    globalFilter,
    setGlobalFilter,
    filterRemessa,
    setFilterRemessa,
    handleCadastrarCorte,
    isCriandoCorteProduto,
    open,
    setOpen,
  }
}