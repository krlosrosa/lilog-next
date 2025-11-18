import { useConfiguracoesStore } from "@/_modules/expedicao_/others/stores/configuracoes.store";
import { ConfiguracaoImpressao } from "@/_modules/expedicao_/others/types/configuracaoImpressa";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { SelectWithLabel } from "@/_shared/_components/ui/SelectLabel";
import { Switch } from "@/_shared/_components/ui/switch";

const tipoQuebraOptions = [
  { label: 'Linhas', value: 'LINHAS' },
  { label: 'Percentual', value: 'PERCENTUAL' },
]

export function QuebraPalete() {

  const configuracaoImpressao = useConfiguracoesStore((state) => state.configuracaoImpressao)
  const setConfiguracaoImpressao = useConfiguracoesStore((state) => state.setConfiguracaoImpressao)

  const handleQuebraPaleteChange = (checked: boolean) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao!, quebraPalete: checked })
  }
  const handleTipoQuebraChange = (value: string) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao!, tipoQuebra: value as 'LINHAS' | 'PERCENTUAL' })
  }
  const handleValorQuebraChange = (value: string) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao!, valorQuebra: value })
  }
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-semibold mb-1">Quebra de Palete</h4>
        <p className="text-sm text-muted-foreground">Configure as opções de quebra de palete</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-between p-4 rounded-md border bg-card">
          <Label className="text-sm font-medium">Ativar Quebra</Label>
          <Switch
            checked={configuracaoImpressao.quebraPalete ?? false}
            onCheckedChange={handleQuebraPaleteChange as (checked: boolean) => void}
          />
        </div>

        <SelectWithLabel
          label="Tipo de Quebra"
          options={tipoQuebraOptions}
          value={configuracaoImpressao.tipoQuebra ?? ''}
          onChange={handleTipoQuebraChange as (value: string) => void}
        />

        <div className="space-y-2">
          <Label className="text-sm font-medium">Valor da Quebra</Label>
          <Input
            value={configuracaoImpressao.valorQuebra ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValorQuebraChange(e.target.value)}
            placeholder="Digite o valor"
          />
        </div>
      </div>
    </div>
  )
}
