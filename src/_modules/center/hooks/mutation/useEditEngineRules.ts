import { atualizarRegraDeMotorParams } from '@/_services/api/schema/center/center.zod';
import { useAtualizarRegraDeMotor, useCriarNovaRegraDeMotor } from '@/_services/api/service/center/center';
import { useUser } from '@/_shared/providers/UserContext';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import z from 'zod';
import { useState } from 'react';
import { RuleGroupType } from 'react-querybuilder';
import { convertQueryBuilderToJsonRulesEngine } from '../../utils/convert';
import { verifyRules } from '../../utils/back-engine';

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

export const useEditEngineRules = () => {
  const [open, setOpen] = useState(false);
  const [processo, setProcesso] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [ativo, setAtivo] = useState<boolean>(false);
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
  const { mutateAsync: updateEngineRules, isPending: isUpdatingEngineRules } =
  useAtualizarRegraDeMotor({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['regras'] });
        },
      },
    });

  function updateEngineRulesFunction(id: string) {
    const facts = {
      gameDuration: 40,
      personalFoulCount: 5,
    };
    verifyRules(facts);
    const convertedRule = convertQueryBuilderToJsonRulesEngine(query, event); 
    if(!name || !description || !processo || !convertedRule) {
      return;
    }
    const promise = updateEngineRules({
      id: id,
      data:{
        name: name,
        description: description,
        processo: processo,
        conditions: convertedRule,
        enabled: ativo,
      }
    });
    toast.promise(promise, {
      loading: 'Atualizando regras de motor...',
      success: 'Regras de motor atualizadas com sucesso!',
      error: (err) => `Ocorreu um erro: ${err.message || 'Tente novamente.'}`,
    });
  }


  return {
    updateEngineRules,
    isUpdatingEngineRules,
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
    updateEngineRulesFunction,
    ativo,
    setAtivo,
  };
};
