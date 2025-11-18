import { EventData } from 'node:test';
import { useState } from 'react';
import QueryBuilder, { RuleGroupType } from 'react-querybuilder';
import { useAddEngineRules } from '../../hooks/mutation/useAddEngineRules';
import { fields } from '../../consts/fields-rules';
import { Input } from '@/_shared/_components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/_shared/_components/ui/select';
import { typeReturnRules } from '../../consts/type-return-rules';
import { Button } from '@/_shared/_components/ui/button';
import { Save, Loader2, ChevronDown } from 'lucide-react';
import { convertQueryBuilderToJsonRulesEngine } from '../../utils/convert';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/_shared/_components/ui/collapsible';
import { processosRules } from '../../consts/processos-rules';

export default function CreateRules() {
  const {
    processo,
    setProcesso,
    query,
    setQuery,
    event,
    setEvent,
    handleSave,
    isAddingEngineRules,
    name,
    setName,
    description,
    setDescription,
  } = useAddEngineRules();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-md border"
    >
      <CollapsibleTrigger className="hover:bg-muted/50 flex w-full items-center justify-between px-3 py-2 transition-colors">
        <h1 className="text-base font-semibold">Criar Regras</h1>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-xs font-medium">
                Nome
              </label>
              <Input
                type="text"
                placeholder="Nome da regra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-xs font-medium">
                Descrição
              </label>
              <Input
                type="text"
                placeholder="Descrição da regra"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-9"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-muted-foreground text-xs font-medium">
              Processo
            </label>
            <Select
              value={processo}
              onValueChange={(value) => setProcesso(value)}
            >
              <SelectTrigger className="h-9 w-full">
                <SelectValue placeholder="Selecione o processo" />
              </SelectTrigger>
              <SelectContent>
                {processosRules.map((processo) => (
                  <SelectItem key={processo.value} value={processo.value}>
                    {processo.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-3 border-t pt-3">
            <label className="text-muted-foreground mb-2 block text-xs font-medium">
              Regras
            </label>
            <div className="bg-muted/20 rounded-md border p-3">
              <QueryBuilder
                fields={fields}
                query={query}
                onQueryChange={setQuery}
                controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
              />
            </div>
          </div>
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
                    {typeReturnRules.map((rule) => (
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
          <div className="pt-2">
            <Button
              onClick={handleSave}
              disabled={
                isAddingEngineRules ||
                !event.type ||
                !query.rules.length ||
                !processo
              }
              className="h-9 w-full gap-2 text-sm"
            >
              {isAddingEngineRules ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
