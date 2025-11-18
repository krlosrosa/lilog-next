import { useEffect, useState } from "react";
import { useBuscarConfiguracaoImpressao } from "./queries/buscarConfiguracaoImpressao";
import { useConfiguracoesStore } from "../others/stores/configuracoes.store";

export function useConfiguracao() {
  const [empresa, setEmpresa] = useState<'DPA' | 'ITB' | 'LDB'>('LDB')
  const { configuracaoImpressao: configuracaoImpressaoFromDB, isLoadingConfiguracaoImpressao, error } = useBuscarConfiguracaoImpressao(empresa)
  const setConfiguracaoImpressao = useConfiguracoesStore((state) => state.setConfiguracaoImpressao)
  const configuracaoImpressao = useConfiguracoesStore((state) => state.configuracaoImpressao)
  const setSincronizado = useConfiguracoesStore((state) => state.setSincronizado)
  const resetConfiguracao = useConfiguracoesStore((state) => state.resetConfiguracao)
  const sincronizado = useConfiguracoesStore((state) => state.sincronizado)

  useEffect(() => {
    if (configuracaoImpressaoFromDB && !isLoadingConfiguracaoImpressao) {
      setSincronizado(true)
      setConfiguracaoImpressao(configuracaoImpressaoFromDB)
    } else {
      resetConfiguracao()
      setSincronizado(false)
    }
  }, [configuracaoImpressaoFromDB])


  return {
    configuracaoImpressao,
    isLoadingConfiguracaoImpressao,
    error,
    setEmpresa,
    empresa,
    setConfiguracaoImpressao,
    sincronizado
  }
}