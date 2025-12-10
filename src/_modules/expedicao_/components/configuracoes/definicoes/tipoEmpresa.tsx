import { useConfiguracoesStore } from "@/_modules/expedicao_/others/stores/configuracoes.store";
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
}

export function TipoEmpresa({ setEmpresa, empresa, setReplicar, replicar }: TipoEmpresaProps) {

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
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-semibold mb-1">Tipo de Impressão</h4>
        <p className="text-sm text-muted-foreground">Configure os tipos de impressão e empresa</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectWithLabel
          label="Tipo de Impressão"
          options={tipoImpressaoOptions}
          value={configuracaoImpressao.tipoImpressao}
          onChange={handleTipoImpressaoChange as (value: string) => void}
        />
        <SelectWithLabel
          label="Tipo de Impressão Conferência"
          options={tipoImpressaoOptions}
          value={configuracaoImpressao.tipoImpressaoConferencia}
          onChange={handleTipoImpressaoConferenciaChange as (value: string) => void}
        />
        <Switch
          checked={replicar}
          onCheckedChange={setReplicar}
        />
        <SelectWithLabel
          label="Empresa"
          options={empresaOptions}
          value={empresa ?? ''}
          onChange={handleEmpresaChange as (value: string) => void}
        />
      </div>
    </div>
  )
}