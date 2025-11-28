import { RuleType, RuleGroupType, Field } from 'react-querybuilder';

type JsonRulesCondition =
  | { all: JsonRulesCondition[] }
  | { any: JsonRulesCondition[] }
  | { fact: string; operator: string; value: any };

type JsonRulesEvent = {
  type: string;
  params?: Record<string, any>;
};

export type JsonRulesEngineRule = {
  conditions: JsonRulesCondition;
  event: JsonRulesEvent;
};

export function convertQueryBuilderToJsonCustom<C extends string = string>(
  query: RuleGroupType<RuleType, C>,
  event: JsonRulesEvent,
  fields: Field[] // <<--- adicionado
): JsonRulesEngineRule {

  const fieldNames = fields.map(f => f.name);

  const isValidRule = (r: RuleType) =>
    r.field && r.operator && r.value !== undefined && r.value !== null;

  const mapOperator = (op: string): string => {
    const ops: Record<string, string> = {
      '=': 'equal',
      '!=': 'notEqual',
      '>': 'greaterThan',
      '>=': 'greaterThanInclusive',
      '<': 'lessThan',
      '<=': 'lessThanInclusive',
      contains: 'contains',
      in: 'in',
      notIn: 'notIn',
      between: 'between',
      notBetween: 'notBetween',
    };
    return ops[op] || op;
  };

  const normalizeValue = (val: any) => {
    // Se o valor for o nome de outro campo, converte para { fact: "<campo>" }
    if (typeof val === "string" && fieldNames.includes(val)) {
      return { fact: val };
    }
    return val;
  };

  const convertRule = (
    rg: RuleGroupType<RuleType, C> | RuleType,
  ): JsonRulesCondition => {
  
    // É um grupo
    if ('rules' in rg) {
      const validRules = rg.rules
        .filter((r: any) => 'rules' in r || isValidRule(r))
        .map((r) => convertRule(r as any));
  
      return rg.combinator === 'and'
        ? { all: validRules }
        : { any: validRules };
    }
  
    // É regra simples
    if (!isValidRule(rg)) {
      throw new Error("Regra inválida detectada no QueryBuilder.");
    }
  
    return {
      fact: rg.field,
      operator: mapOperator(rg.operator),
      value: normalizeValue(rg.value),
    };
  };

  return {
    conditions: convertRule(query),
    event,
  };
}
