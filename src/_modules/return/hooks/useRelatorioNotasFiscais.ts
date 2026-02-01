import { useState } from 'react';
import { getNotasByDataDevolucao } from '@/_services/api/service/devolucao/devolucao';
import { useUser } from '@/_shared/providers/UserContext';
import { gerarExcel } from '@/_shared/utils/gerarExcel';
import toast from 'react-hot-toast';
import { getAxiosErrorMessage } from '@/_shared/utils/axios.error';

type GetNotaByDataDto = Awaited<ReturnType<typeof getNotasByDataDevolucao>>[number];

export function useRelatorioNotasFiscais() {
  const { user } = useUser();
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadRelatorio = async (dataInicio: string, dataFim: string): Promise<void> => {
    if (!user?.centerSelect) {
      toast.error('Selecione um centro antes de gerar o relatório');
      throw new Error('Centro não selecionado');
    }
    setIsGenerating(true);
    try {
      const data = await getNotasByDataDevolucao(dataInicio, dataFim, user.centerSelect);
      if (!data?.length) {
        toast.error('Nenhum dado encontrado para o período selecionado');
        throw new Error('Sem dados');
      }
      const rows = data.map((item: GetNotaByDataDto) => ({
        Data: item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '-',
        'ID Demanda': item.demandaId ?? '-',
        'Nota Fiscal': item.notaFiscal ?? '-',
        'NF Parcial': item.notaFiscalParcial ?? '-',
        'Motivo Devolução': item.motivoDevolucao ?? '-',
        'Status Demanda': item.statusDemanda ?? '-',
        Placa: item.placa ?? '-',
        Transportadora: item.transportadora ?? '-',
        Conferente: item.conferente ?? '-',
      }));
      gerarExcel(rows, `relatorio-notas-fiscais-${dataInicio}-${dataFim}`);
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
