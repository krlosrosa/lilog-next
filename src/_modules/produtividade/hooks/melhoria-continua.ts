import { useGetProdutividadeMelhoriaContinua } from "@/_services/api/service/gestao-produtividade/gestao-produtividade";
import { gerarExcel } from "@/_shared/utils/gerarExcel";
import { useState } from "react";

export function useMelhoriaContinua() {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [openInicio, setOpenInicio] = useState(false);
  const [openFim, setOpenFim] = useState(false);
  const { data: produtividadeMelhoriaContinua, isLoading: isLoadingProdutividadeMelhoriaContinua } = useGetProdutividadeMelhoriaContinua(dataInicio, dataFim);

function handleGerarExcel(){
  gerarExcel(produtividadeMelhoriaContinua || [], `relatorio-produtividade-melhoria-continua-${dataInicio}-${dataFim}`);
}

  return {
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    openInicio,
    setOpenInicio,
    openFim,
    setOpenFim,
    produtividadeMelhoriaContinua,
    isLoadingProdutividadeMelhoriaContinua,
    handleGerarExcel
  }
}