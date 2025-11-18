import { criarNovaRegraDeMotorBody } from '@/_services/api/schema/center/center.zod';
import { useCriarNovaRegraDeMotor } from '@/_services/api/service/center/center';
import { useUser } from '@/_shared/providers/UserContext';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import z from 'zod';
import { useState } from 'react';
import { RuleGroupType } from 'react-querybuilder';
import { convertQueryBuilderToJsonRulesEngine } from '../../utils/convert';

type RulesGroup = {
  ruleEnginer: RuleGroupType;
  event: {
    type: string;
    params: {
      message: string;
    };
  };
};

type EventData = {
  type: string;
  params: {
    message: string;
  };
};

export const useAddEngineRules = () => {
  const [open, setOpen] = useState(false);
  const [processo, setProcesso] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { user } = useUser();

  const [rulesGroup, setRulesGroup] = useState<RulesGroup[]>([]);
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [],
  });
  const [event, setEvent] = useState<EventData>({
    type: '',
    params: { message: '' },
  });

  const queryClient = useQueryClient();
  const { mutateAsync: addEngineRules, isPending: isAddingEngineRules } =
    useCriarNovaRegraDeMotor({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['regras'] });
        },
      },
    });

  function criarEngineRules(data: z.infer<typeof criarNovaRegraDeMotorBody>) {
    const promise = addEngineRules({ data });
    toast.promise(promise, {
      loading: 'Salvando regras de motor...',
      success: 'Regras de motor salvas com sucesso!',
      error: (err) => `Ocorreu um erro: ${err.message || 'Tente novamente.'}`,
    });
  }

  function handleSave() {
    if (!event.type || !query.rules.length) {
      return;
    }
    const convertedRule = convertQueryBuilderToJsonRulesEngine(query, event);
    const formData = {
      centerId: user?.centerSelect as string,
      name: name,
      description: description,
      conditions: convertedRule,
      processo: processo,
    };
    criarEngineRules(formData);
  }

  return {
    criarEngineRules,
    isAddingEngineRules,
    open,
    setOpen,
    rulesGroup,
    setRulesGroup,
    query,
    setQuery,
    event,
    setEvent,
    processo,
    setProcesso,
    name,
    setName,
    description,
    setDescription,
    handleSave,
  };
};
