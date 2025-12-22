import { Settings } from "lucide-react";
import { Agrupamento } from "../components/configuracoes/agrupamento";
import { ConfiguracaoGeral } from "../components/configuracoes/definicoes";
import { HeaderConfiguracoes } from "../components/configuracoes/header";
import { TitleTabs } from "../components/title";
import { LoadingTransporte } from "../components/transporte/loading";
import { useConfiguracao } from "../hooks/useConfiguracao";

 type DefinicoesTabProps = {
  setValueTab: (value: string) => void;
 }

export function DefinicoesTab({ setValueTab}: DefinicoesTabProps) {

  const { isLoadingConfiguracaoImpressao, setEmpresa, empresa, setReplicar, replicar, setClassificarProduto, classificarProduto } = useConfiguracao()

  return (
    <div className="space-y-4">
      <TitleTabs
        title="Configurações de Impressão"
        description="Configure as definições para geração de mapas"
        icon={<Settings className="h-4 w-4" />}
        back={{ label: "Upload de Arquivos e Validação", onClick: () => setValueTab('upload') }}
        next={
          isLoadingConfiguracaoImpressao ? undefined : { label: "Gerar Mapas", onClick: () => setValueTab('gerarMapas') }
        }
      />
      {isLoadingConfiguracaoImpressao && <LoadingTransporte />}
      {!isLoadingConfiguracaoImpressao && (
        <>
          <ConfiguracaoGeral
            setEmpresa={setEmpresa}
            empresa={empresa}
            setReplicar={setReplicar}
            replicar={replicar}
            setClassificarProduto={setClassificarProduto}
            classificarProduto={classificarProduto}
          />
          <Agrupamento />
        </>
      )}
    </div>
  )
}