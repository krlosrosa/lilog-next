import { PackageCheck } from "lucide-react";
import { TabsMapas } from "../components/mapas/tabs";
import { TitleTabs } from "../components/title";
import { useAgrupamentoStore } from "../others/stores/agrupamento.store";
import { useConfiguracoesStore } from "../others/stores/configuracoes.store";

export default function MapaTab({ setValueTab }: { setValueTab: (value: string) => void }) {
  const configuracaoImpressao = useConfiguracoesStore((state) => state.configuracaoImpressao)
  const clientesSegregados = useAgrupamentoStore((state) => state.clientesSegregados)

  return (
    <div className="space-y-4">
      <TitleTabs
        title="Geração de Mapas"
        description="Gere os mapas de separação, conferência e protocolo."
        icon={<PackageCheck className="h-4 w-4" />}
        back={{ label: "Definições de Impressão", onClick: () => setValueTab('definicoes') }}
      />
      <TabsMapas
        clientesSegregados={clientesSegregados}
        configuracaoImpressao={configuracaoImpressao ?? null}
      />
    </div>
  )
}