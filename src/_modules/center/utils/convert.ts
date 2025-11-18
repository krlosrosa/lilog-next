import { RuleType, RuleGroupType } from 'react-querybuilder';

type JsonRulesCondition =
  | { all: JsonRulesCondition[] }
  | { any: JsonRulesCondition[] }
  | { fact: string; operator: string; value: any };

type JsonRulesEvent = {
  type: string;
  params?: Record<string, any>;
};

type JsonRulesEngineRule = {
  conditions: JsonRulesCondition;
  event: JsonRulesEvent;
};

export function convertQueryBuilderToJsonRulesEngine<C extends string = string>(
  query: RuleGroupType<RuleType, C>,
  event: JsonRulesEvent,
): JsonRulesEngineRule {
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

  const convertRule = (
    rg: RuleGroupType<RuleType, C> | RuleType,
  ): JsonRulesCondition => {
    // se for grupo (tem combinator e rules) vs regra
    if ('rules' in rg) {
      // rg é RuleGroupType
      const combinator = rg.combinator;
      const mapped = rg.rules.map((r) => convertRule(r as any));
      return combinator === 'and' ? { all: mapped } : { any: mapped };
    } else {
      // rg é RuleType
      return {
        fact: rg.field,
        operator: mapOperator(rg.operator),
        value: rg.value,
      };
    }
  };

  return {
    conditions: convertRule(query),
    event,
  };
}
