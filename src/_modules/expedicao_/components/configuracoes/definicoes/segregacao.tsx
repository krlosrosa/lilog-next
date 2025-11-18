import { useConfiguracoesStore } from "@/_modules/expedicao_/others/stores/configuracoes.store";
import { Label } from "@/_shared/_components/ui/label";
import { SelectLabelMutiple } from "@/_shared/_components/ui/SelectLabelMutiple";
import { Switch } from "@/_shared/_components/ui/switch";

const fifoOptions = [
  { label: 'Verde', value: 'VERDE' },
  { label: 'Amarelo', value: 'AMARELO' },
  { label: 'Vermelho', value: 'VERMELHO' },
  { label: 'Laranja', value: 'LARANJA' },
]

export function Segregacao() {
  const configuracaoImpressao = useConfiguracoesStore((state) => state.configuracaoImpressao)
  const setConfiguracaoImpressao = useConfiguracoesStore((state) => state.setConfiguracaoImpressao)

  const handleSepararPaleteFullChange = (checked: boolean) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao, separarPaleteFull: checked })
  }
  const handleSepararUnidadesChange = (checked: boolean) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao, separarUnidades: checked })
  }

  const handleSegregarFifoChange = (value: string[]) => {
    setConfiguracaoImpressao({ ...configuracaoImpressao, segregarFifo: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-semibold mb-1">Segregação</h4>
        <p className="text-sm text-muted-foreground">Configure as opções de segregação de paletes</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-4 rounded-md border bg-card">
          <Label className="text-sm font-medium">Separar Palete Full</Label>
          <Switch
            checked={configuracaoImpressao.separarPaleteFull ?? false}
            onCheckedChange={handleSepararPaleteFullChange as (checked: boolean) => void}
          />
        </div>
        
        <div className="flex items-center justify-between p-4 rounded-md border bg-card">
          <Label className="text-sm font-medium">Separar Unidades</Label>
          <Switch
            checked={configuracaoImpressao.separarUnidades ?? false}
            onCheckedChange={handleSepararUnidadesChange as (checked: boolean) => void}
          />
        </div>
      </div>
      
      <div className="p-4 rounded-md border bg-card">
        <SelectLabelMutiple
          label="Segregar FIFO"
          options={fifoOptions}
          value={configuracaoImpressao.segregarFifo ?? []}
          onChange={handleSegregarFifoChange as (value: string[]) => void}
        />
      </div>
    </div>
  )
}