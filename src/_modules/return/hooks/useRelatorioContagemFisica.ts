import { useState } from 'react';
import { getContagemFisicaByDataDevolucao } from '@/_services/api/service/devolucao/devolucao';
import { useUser } from '@/_shared/providers/UserContext';
import { gerarExcel } from '@/_shared/utils/gerarExcel';
import toast from 'react-hot-toast';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';

type GetContagemFisicaDto = Awaited<ReturnType<typeof getContagemFisicaByDataDevolucao>>[number];

export function useRelatorioContagemFisica() {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadRelatorio = async (dataInicio: string, dataFim: string): Promise<void> => {
    if (!user?.centerSelect) {
      toast.error('Selecione um centro antes de gerar o relatório');
      throw new Error('Centro não selecionado');
    }
    setIsGenerating(true);
    try {
      const data = await getContagemFisicaByDataDevolucao(dataInicio, dataFim, user.centerSelect);
      if (!data?.length) {
        toast.error('Nenhum dado encontrado para o período selecionado');
        throw new Error('Sem dados');
      }
      const rows = data.map((item: GetContagemFisicaDto) => ({
        'ID Demanda': item.idemanda ?? '-',
        SKU: item.sku ?? '-',
        Descrição: item.descricao ?? '-',
        Lote: item.lote ?? '-',
        Centro: item.centerId ?? '-',
        'Qtd Caixas': item.quantidadeCaixas ?? 0,
        'Qtd Unidades': item.quantidadeUnidades ?? 0,
        'Cx Avariadas': item.quantidadeCaixasAvariadas ?? 0,
        'Un Avariadas': item.quantidadeUnidadesAvariadas ?? 0,
        'Dif. Caixas': item.diferencaCaixas ?? 0,
        'Dif. Unidades': item.diferencaUnidades ?? 0,
        'Data Criação': item.data_criacao ? new Date(item.data_criacao).toLocaleDateString('pt-BR') : '-',
      }));
      gerarExcel(rows, `relatorio-contagem-fisica-${dataInicio}-${dataFim}`);
      toast.success('Relatório gerado com sucesso!');
    } catch (err: unknown) {
      const msg = getAxiosErrorMessage(err) ?? (err instanceof Error ? err.message : 'Erro ao gerar relatório');
      toast.error(String(msg));
      throw err;
    } finally {
      setIsGenerating(false);
    }
  };

  return { downloadRelatorio, isGenerating };
}
