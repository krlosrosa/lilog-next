import { useConfiguracoesStore } from "@/_modules/expedicao_/others/stores/configuracoes.store";
import { Label } from "@/_shared/_components/ui/label";
import { SelectWithLabel } from "@/_shared/_components/ui/SelectLabel";
import { Switch } from "@/_shared/_components/ui/switch";

const tipoImpressaoOptions = [
  { label: 'Cliente', value: 'CLIENTE' },
  { label: 'Transporte', value: 'TRANSPORTE' },
]

const empresaOptions = [
  { label: 'DPA', value: 'DPA' },
  { label: 'ITB', value: 'ITB' },
  { label: 'LDB', value: 'LDB' },
]

type TipoEmpresaProps = {
  setEmpresa: (empresa: 'DPA' | 'ITB' | 'LDB') => void;
  empresa: 'DPA' | 'ITB' | 'LDB';
  setReplicar: (replicar: boolean) => void;
  replicar: boolean;
  setClassificarProduto: (classificarProduto: boolean) => void;
  classificarProduto: boolean;
}

export function TipoEmpresa({ setEmpresa, empresa, setReplicar, replicar, setClassificarProduto, classificarProduto }: TipoEmpresaProps) {

  const configuracaoImpressao = useConfiguracoesStore((state) => state.configuracaoImpressao)
  const setConfiguracaoImpressao = useConfiguracoesStore((state) => state.setConfiguracaoImpressao)

  const handleTipoImpressaoChange = (value: 'CLIENTE' | 'TRANSPORTE') => {
    setConfiguracaoImpressao({ ...configuracaoImpressao, tipoImpressao: value })
  }
  const handleTipoImpressaoConferenciaChange = (value: 'TRANSPORTE' | 'CLIENTE') => {
    setConfiguracaoImpressao({ ...configuracaoImpressao, tipoImpressaoConferencia: value })
  }
  const handleEmpresaChange = (value: 'DPA' | 'ITB' | 'LDB') => {
    setEmpresa(value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-base font-semibold mb-1">Tipo de Impressão</h4>
        <p className="text-sm text-muted-foreground">Configure os tipos de impressão e empresa</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Coluna 1: Seletores principais */}
        <div className="space-y-6">

          <SelectWithLabel
            label="Tipo de Impressão Conferência"
            options={tipoImpressaoOptions}
            value={configuracaoImpressao.tipoImpressaoConferencia}
            onChange={handleTipoImpressaoConferenciaChange as (value: string) => void}
          />
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-1">
              <Label className="text-base font-medium">Replicar Separação</Label>
              <p className="text-sm text-muted-foreground">Usar configuração de separação</p>
            </div>
            <Switch
              checked={replicar}
              onCheckedChange={setReplicar}
            />
          </div>
        </div>

        {/* Coluna 2: Configurações de separação */}
        <div className="space-y-6">
        <SelectWithLabel
            label="Tipo de Impressão"
            options={tipoImpressaoOptions}
            value={configuracaoImpressao.tipoImpressao}
            onChange={handleTipoImpressaoChange as (value: string) => void}
          />
          <div className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
            <div className="space-y-1">
              <Label className="text-base font-medium">Classificar Produto</Label>
              <p className="text-sm text-muted-foreground">Organizar por categoria de produto</p>
            </div>
            <Switch
              checked={classificarProduto}
              onCheckedChange={setClassificarProduto}
            />
          </div>
        </div>

        {/* Coluna 3: Seleção de empresa */}
        <div className="md:col-span-1">
          <SelectWithLabel
            label="Empresa"
            options={empresaOptions}
            value={empresa ?? ''}
            onChange={handleEmpresaChange as (value: string) => void}
          />
        </div>
      </div>
    </div>
  )
}