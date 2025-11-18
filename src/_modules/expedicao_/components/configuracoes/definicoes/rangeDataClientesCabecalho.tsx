import { useConfiguracoesStore } from "@/_modules/expedicao_/others/stores/configuracoes.store";
import { ConfiguracaoImpressao } from "@/_modules/expedicao_/others/types/configuracaoImpressa";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { SelectWithLabel } from "@/_shared/_components/ui/SelectLabel";

const exibirInfoCabecalhoOptions = [
  { label: 'Primeiro', value: 'PRIMEIRO' },
  { label: 'Todos', value: 'TODOS' },
  { label: 'Nenhum', value: 'NENHUM' },
]

export function RangeDataClientesCabecalho() {
  const configuracaoImpressao = useConfiguracoesStore((state) => state.configuracaoImpressao)
  const setConfiguracaoImpressao = useConfiguracoesStore((state) => state.setConfiguracaoImpressao)
  
  const handleDataMaximaPercentualChange = (value: string) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao, dataMaximaPercentual: parseInt(value) })
  }
  const handleExibirInfoCabecalhoChange = (value: string) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao, exibirInfoCabecalho: value as 'PRIMEIRO' | 'TODOS' | 'NENHUM' })
  }
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-semibold mb-1">Configurações de Cabeçalho</h4>
        <p className="text-sm text-muted-foreground">Configure data máxima e exibição de informações</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 p-4 rounded-md border bg-card">
          <Label className="text-sm font-medium">Data Máxima Percentual</Label>
          <Input
            value={configuracaoImpressao.dataMaximaPercentual ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDataMaximaPercentualChange(e.target.value)}
            placeholder="Digite o percentual"
          />
        </div>
        
        <div className="p-4 rounded-md border bg-card">
          <SelectWithLabel
            label="Exibir Info no Cabeçalho"
            options={exibirInfoCabecalhoOptions}
            value={configuracaoImpressao.exibirInfoCabecalho ?? ''}
            onChange={handleExibirInfoCabecalhoChange as (value: string) => void}
          />
        </div>
      </div>
    </div>
  )
}