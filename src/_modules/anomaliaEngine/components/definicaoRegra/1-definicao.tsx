import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/_shared/_components/ui/select";
import { ArrowRight, Info } from "lucide-react";
import { useEngineAnomaliaStore } from "../../stores/engineAnomalia.store";

const processos = [
  {
    value: 'PRODUTIVIDADE',
    label: 'Produtividade',
  },
  {
    value: 'PAUSA',
    label: 'Pausa',
  },
  {
    value: 'TRANSPORTE',
    label: 'Transporte',
  }
]


export default function DefinicaoRegra1Nome() {
  const { processo, setProcesso } = useEngineAnomaliaStore();

  function handleNext() {
    if (!processo.processo) {
      return;
    }
    setProcesso({ ...processo, nomeRegra: processo.nomeRegra });
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Etapa */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Informações Básicas</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>Etapa 1 de 3 - Defina os dados principais da regra</span>
        </div>
      </div>

      {/* Campos do Formulário */}
      <div className="space-y-5">
        {/* Campo Nome */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-semibold text-muted-foreground">
              Nome da Regra *
            </Label>
            <Input
              value={processo.nomeRegra}
              onChange={(e) => setProcesso({ ...processo, nomeRegra: e.target.value })}
              id="nome"
              placeholder="Ex: Regra de Produtividade Matinal"
              className="w-full"
            />
          </div>
        </div>

        {/* Campo Descrição */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="descricao" className="text-sm font-semibold text-muted-foreground">
              Descrição
            </Label>
            <Input
              value={processo.descricao}
              onChange={(e) => setProcesso({ ...processo, descricao: e.target.value })}
              id="descricao"
              placeholder="Ex: Regra aplicada durante o turno da manhã"
              className="w-full"
            />
          </div>
        </div>

        {/* Campo Processo */}
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="processo" className="text-sm font-semibold text-muted-foreground">
              Tipo de Processo *
            </Label>
            <Select value={processo.processo} onValueChange={(value) => setProcesso({ ...processo, processo: value })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o tipo de processo" />
              </SelectTrigger>
              <SelectContent>
                {processos.map((proc) => (
                  <SelectItem 
                    key={proc.value} 
                    value={proc.value}
                    className="capitalize"
                  >
                    {proc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Botão de Ação */}
      <div className="flex justify-end pt-4 border-t">
        <Button 
          onClick={handleNext}
          disabled={!processo}
          className="gap-2"
        >
          Continuar para Regras
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}