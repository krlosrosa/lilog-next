import { useCriarCorteDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useCorte } from "../context/corte.provider";
import { TipoCorteEnum } from "../enums/tipor-corte";
import { CorteMercadoriaDto, CorteMercadoriaDtoDirecao } from "@/_services/api/model";
import toast from "react-hot-toast";
import { useUser } from "@/_shared/providers/UserContext";
import { useQueryClient } from "@tanstack/react-query";

export const useAddCorteProduto = () => {
  const { user } = useUser();
  const { selectedProdutos, motivoCorte, setMotivoCorte, setSelectedProdutos } = useCorte();
  const queryClient = useQueryClient();
  const { mutateAsync: criarCorteProduto, isPending: isCriandoCorteProduto } = useCriarCorteDeProduto({
    mutation: {
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['cortes-produto'] });
      },
    },
  });

  const handleAddCorteProduto = async () => {
    const corte = selectedProdutos.map((produto) => ({
      produto: produto.sku,
      lote: produto.lote,
      motivo: motivoCorte as TipoCorteEnum,
      transporteId: produto.transporte,
      unidades: produto.quantidade || 0,
      descricao: produto.descricao || null,
      caixas: produto.caixas || 0,
      direcao: 'OPERACIONAL' as CorteMercadoriaDtoDirecao,
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
    setSelectedProdutos([]);
    setMotivoCorte('');
  }

  return {
    handleAddCorteProduto,
    isCriandoCorteProduto,
  }
}