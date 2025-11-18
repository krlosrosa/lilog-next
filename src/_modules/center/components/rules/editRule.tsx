import { fields } from "@/_modules/center/consts/fields-rules";
import { typeReturnRules } from "@/_modules/center/consts/type-return-rules";
import { useEditEngineRules } from "@/_modules/center/hooks/mutation/useEditEngineRules";
import { convertJreToRqb, JreGroup } from "@/_modules/center/utils/convertToFront";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Switch } from "@/_shared/_components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_shared/_components/ui/select";
import { useEffect } from "react";
import QueryBuilder from "react-querybuilder";
import { Save, Loader2 } from "lucide-react";

type EditRuleEngineProps = {
  id: string;
  name: string;
  ativo: boolean;
  description: string;
  processo: string;
  conditions?: any;
}

export function EditRuleEngine({ id, name: initialName, ativo: initialAtivo, description: initialDescription, processo: initialProcesso, conditions }: EditRuleEngineProps) {
  const { 
    updateEngineRulesFunction, 
    setName, 
    setDescription, 
    setProcesso, 
    setQuery, 
    setEvent,
    event,
    query,
    setAtivo, 
    ativo,
    isUpdatingEngineRules,
    description,
    name,
     processo,

  } = useEditEngineRules();

  useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
    setProcesso(initialProcesso);
    setAtivo(initialAtivo);
  }, [initialName, initialDescription, initialProcesso, initialAtivo, setName, setDescription, setProcesso, setAtivo]);

  useEffect(() => {
    if (conditions && typeof conditions === 'object' && !Array.isArray(conditions)) {
      const conditionsObj = conditions as Record<string, unknown>;
      
      // Extrair o evento
      if ('event' in conditionsObj && conditionsObj.event && typeof conditionsObj.event === 'object') {
        const eventData = conditionsObj.event as { type?: string; params?: { message?: string } };
        if (eventData.type) {
          setEvent({
            type: eventData.type,
            params: {
              message: eventData.params?.message || '',
            },
          });
        }
      }
      
      // Extrair as condições
      if ('conditions' in conditionsObj && conditionsObj.conditions && typeof conditionsObj.conditions === 'object') {
        setQuery(convertJreToRqb(conditionsObj.conditions as unknown as JreGroup));
      }
    }
  }, [conditions, setQuery, setEvent]);

  return (
    <div className="space-y-3">
      {/* Campos básicos em grid compacto */}
      <div className="grid grid-cols-4 gap-2 items-end">
        <div className="flex items-center gap-2">
          <Switch 
            id="ativo" 
            checked={ativo} 
            onCheckedChange={setAtivo}
            className="scale-90"
          />
          <Label htmlFor="ativo" className="text-xs cursor-pointer">
            Ativo
          </Label>
        </div>
        <Input 
          type="text" 
          placeholder="Nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="h-8 text-sm"
        />
        <Input 
          type="text" 
          placeholder="Descrição" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="h-8 text-sm"
        />
        <Input 
          type="text" 
          placeholder="Processo" 
          value={processo} 
          onChange={(e) => setProcesso(e.target.value)}
          className="h-8 text-sm"
        />
      </div>

      {/* Campos do Evento */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label htmlFor="eventType" className="text-xs text-muted-foreground">
            Tipo de Evento
          </Label>
          <Select
            value={event.type}
            onValueChange={(value) => setEvent({ ...event, type: value })}
          >
            <SelectTrigger id="eventType" className="h-8 text-sm">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {typeReturnRules.map((rule) => (
                <SelectItem key={rule.type} value={rule.type}>
                  {rule.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="eventMessage" className="text-xs text-muted-foreground">
            Mensagem
          </Label>
          <Input
            id="eventMessage"
            type="text"
            placeholder="Mensagem do evento"
            value={event.params.message}
            onChange={(e) =>
              setEvent({ ...event, params: { message: e.target.value } })
            }
            className="h-8 text-sm"
          />
        </div>
      </div>

      {/* QueryBuilder compacto */}
      <div className="border rounded p-2 bg-card">
        <QueryBuilder
          fields={fields}
          query={query}
          onQueryChange={setQuery}
          controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
        />
      </div>

      {/* Botão compacto */}
      <div className="flex justify-end">
        <Button 
          onClick={() => updateEngineRulesFunction(String(id))}
          disabled={isUpdatingEngineRules}
          size="sm"
          className="h-8"
        >
          {isUpdatingEngineRules ? (
            <>
              <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
              Salvando
            </>
          ) : (
            <>
              <Save className="mr-1.5 h-3 w-3" />
              Salvar
            </>
          )}
        </Button>
      </div>
    </div>
  )
}