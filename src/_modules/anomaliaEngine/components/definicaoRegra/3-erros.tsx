import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/_shared/_components/ui/select";
import { EventData } from "../../types/event.type";
import { Input } from "@/_shared/_components/ui/input";
import { useEngineAnomaliaStore } from "../../stores/engineAnomalia.store";
import { useBuscarAnomaliaEngine } from "../../hooks/useBuscarAnomaliaEngine";
import { Button } from "@/_shared/_components/ui/button";

const typeReturnRules = [
  {
    type: 'TEMPO_EXCESSIVO_DE_DEMANDA',
    name: 'Tempo Excessivo de Demanda',
    processo: 'PRODUTIVIDADE',
  },
  {
    type: 'TERMINO_MUITO_RAPIDO_DE_DEMANDA',
    name: 'Término Muito Rápido de Demanda',
    processo: 'PRODUTIVIDADE',
  },
  {
    type: 'TEMPO_EXCESSIVO_DE_PAUSA_TERMICA',
    name: 'Tempo Excessivo de Pausa Térmica',
    processo: 'PAUSA',
  },
  {
    type: 'TEMPO_CURTO_DE_PAUSA',
    name: 'Tempo Curto de Pausa',
    processo: 'PAUSA',
  },
  {
    type: 'TEMPO_LONGO_AGUARDANDO_PRODUTO',
    name: 'Tempo Longo de Aguardando Produto',
    processo: 'PAUSA',
  },
]


export default function DefinicaoRegra3Erros() {
  const { event, setEvent, processo } = useEngineAnomaliaStore();
  const { handleSave } = useBuscarAnomaliaEngine();

  const filteredTypeReturnRules = typeReturnRules.filter((rule) => rule.processo === processo.processo);
  return (
    <div>
      <div className="mt-3 border-t pt-3">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2"> 
          <div className="space-y-1.5">
            <label className="text-muted-foreground text-xs font-medium">
              Tipo de Erro
            </label>
            <Select
              value={event.type}
              onValueChange={(value) => setEvent({ ...event, type: value })}
            >
              <SelectTrigger className="h-9 w-full">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {filteredTypeReturnRules.map((rule) => (
                  <SelectItem key={rule.type} value={rule.type}>
                    {rule.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-muted-foreground text-xs font-medium">
              Mensagem
            </label>
            <Input
              type="text"
              placeholder="Mensagem personalizada"
              value={event.params.message}
              onChange={(e) =>
                setEvent({ ...event, params: { message: e.target.value } })
              }
              className="h-9"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 border-t pt-3">
        <Button className="w-full" onClick={handleSave}>Salvar</Button>
      </div>
    </div>
  )
}