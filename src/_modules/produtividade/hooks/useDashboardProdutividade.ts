import { useState } from "react";
import { useDashProdutividade } from "./queries/useDashProdutividade";

export function useDashboardProdutividade() {
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const { produtividadeDiaDia, porTurnoEProcesso,top5ProdutividadeDiaDia, bottom5ProdutividadeDiaDia, isLoading: isBuscandoDashDiaDia, listaProdutividadePorFuncionario } = useDashProdutividade();  

  return {
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    produtividadeDiaDia,
    top5ProdutividadeDiaDia,
    bottom5ProdutividadeDiaDia,
    isBuscandoDashDiaDia,
    porTurnoEProcesso,
    listaProdutividadePorFuncionario,
  }
}