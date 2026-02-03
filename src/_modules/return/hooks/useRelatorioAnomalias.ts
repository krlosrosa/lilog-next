import { useState } from 'react';
import { getAnomaliasByDataDevolucao } from '@/_services/api/service/devolucao/devolucao';
import { useUser } from '@/_shared/providers/UserContext';
import { gerarExcel } from '@/_shared/utils/gerarExcel';
import toast from 'react-hot-toast';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';

type GetAnomaliasDto = Awaited<ReturnType<typeof getAnomaliasByDataDevolucao>>[number];

export function useRelatorioAnomalias() {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadRelatorio = async (dataInicio: string, dataFim: string): Promise<void> => {
    if (!user?.centerSelect) {
      toast.error('Selecione um centro antes de gerar o relatório');
      throw new Error('Centro não selecionado');
    }
    setIsGenerating(true);
    try {
      const data = await getAnomaliasByDataDevolucao(dataInicio, dataFim, user.centerSelect);
      if (!data?.length) {
        toast.error('Nenhum dado encontrado para o período selecionado');
        throw new Error('Sem dados');
      }
      const rows = data.map((item: GetAnomaliasDto) => ({
        Data: item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '-',
        ID: item.id ?? '-',
        Empresa: item.empresa ?? '-',
        NFs: item.nfs ?? '-',
        NFsParciais: item.nfsParciais ?? '-',
        Placa: item.placa ?? '-',
        Transportadora: item.transportadora ?? '-',
        SKU: item.sku ?? '-',
        Descrição: item.descricao ?? '-',
        Caixas: item.caixas ?? 0,
        Unidades: item.unidades ?? 0,
        Status: item.status ?? '-',
        Obs: item.obs ?? '-',
      }));
      gerarExcel(rows, `relatorio-anomalias-${dataInicio}-${dataFim}`);
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
