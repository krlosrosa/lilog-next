// --- 1. Definições de Tipo (TypeScript) ---

// Tipos de Saída (React-QueryBuilder)
interface RqbRule {
  id: string;
  field: string;
  operator: string;
  value: any;
}

export interface RqbGroup {
  id: string;
  combinator: 'and' | 'or';
  rules: (RqbRule | RqbGroup)[];
  not?: boolean;
}

// Tipos de Entrada (JSON-Rules-Engine)
export interface JreRule {
  fact: string;
  operator: string;
  value: any;
  // JRE pode ter 'path' e 'params', mas vamos focar na conversão simples
}

interface JreNot {
  not: JreCondition;
}

export type JreGroup =
  | {
      all: JreCondition[];
      any?: undefined; // Garante que seja ou 'all' ou 'any'
    }
  | {
      any: JreCondition[];
      all?: undefined;
    };

// Uma condição JRE pode ser uma regra, um grupo ou um 'not'
type JreCondition = JreRule | JreGroup | JreNot;

// --- 2. Mapa de Operadores (Invertido) ---

/**
 * Mapeia operadores do json-rules-engine para o react-querybuilder.
 * Você PRECISARÁ expandir isso para todos os operadores que utiliza.
 */
const jreToRqbOperatorMap: Record<string, string> = {
  equal: '=',
  notEqual: '!=',
  lessThan: '<',
  lessThanInclusive: '<=',
  greaterThan: '>',
  greaterThanInclusive: '>=',
  contains: 'contains',
  in: 'in',
  notIn: 'notIn',
  // Adicione outros...
};

// --- 3. Gerador de ID ---

/**
 * Gera um ID pseudo-único simples.
 * Para produção, considere usar 'nanoid' ou 'crypto.randomUUID'
 */
const generateRqbId = (): string => {
  return `id-${Math.random().toString(36).substring(2, 9)}`;
};

// --- 4. Função de Conversão Principal (Recursiva) ---

/**
 * Converte uma condição JRE (regra, grupo ou 'not') para o formato RQB.
 * @param condition A condição do json-rules-engine
 * @returns A regra ou grupo formatado para react-querybuilder
 */
function convertJreCondition(condition: JreCondition): RqbRule | RqbGroup {
  // Caso 1: É um operador 'not'
  if ('not' in condition && condition.not) {
    const nestedCondition = condition.not;

    // JRE: not(not(A)) se torna A
    if ('not' in nestedCondition && nestedCondition.not) {
      return convertJreCondition(nestedCondition.not);
    }

    // RQB aplica 'not' a um grupo.
    // Se o JRE for 'not' em uma regra simples, temos que envolvê-la em um grupo.
    if ('fact' in nestedCondition) {
      const rqbRule = convertJreCondition(nestedCondition) as RqbRule;
      return {
        id: generateRqbId(),
        combinator: 'and', // 'and' ou 'or' é irrelevante para uma regra
        not: true,
        rules: [rqbRule],
      };
    }

    // Se for 'not' em um grupo, apenas convertemos o grupo e adicionamos not: true
    if ('all' in nestedCondition || 'any' in nestedCondition) {
      const rqbGroup = convertJreCondition(nestedCondition) as RqbGroup;
      rqbGroup.not = true;
      // O ID já foi gerado pela chamada recursiva, então apenas retornamos
      return rqbGroup;
    }

    throw new Error('Formato "not" JRE aninhado inválido');
  }

  // Caso 2: É uma Regra Simples (possui 'fact')
  if ('fact' in condition) {
    const jreRule = condition as JreRule;
    const operator = jreToRqbOperatorMap[jreRule.operator];

    if (!operator) {
      console.warn(`Operador JRE não mapeado: '${jreRule.operator}'.`);
      // Lançar um erro é mais seguro para evitar regras malformadas
      throw new Error(`Operador JRE não mapeado: '${jreRule.operator}'`);
    }

    return {
      id: generateRqbId(),
      field: jreRule.fact,
      operator: operator,
      value: jreRule.value,
    };
  }

  // Caso 3: É um Grupo (possui 'all' ou 'any')
  if ('all' in condition || 'any' in condition) {
    const jreGroup = condition as JreGroup;

    const combinator = 'all' in jreGroup ? 'and' : 'or';
    const jreRules = jreGroup.all || jreGroup.any!; // Pega o array de regras

    // Chama a recursão para cada regra/grupo filho
    const rqbRules = jreRules.map(convertJreCondition);

    return {
      id: generateRqbId(),
      combinator: combinator,
      rules: rqbRules,
    };
  }

  // Se chegar aqui, o formato é desconhecido
  throw new Error('Formato de condição JRE desconhecido.');
}

/**
 * Função principal para converter as 'conditions' do JRE para a estrutura raiz do RQB.
 * @param jreConditions O objeto 'conditions' do JRE (ex: { all: [...] })
 * @returns A estrutura de grupo raiz completa para o React Query Builder
 */
export function convertJreToRqb(jreConditions: JreGroup): RqbGroup {
  // A conversão da raiz é apenas uma chamada para o helper recursivo.
  // O tipo é RqbGroup, pois a raiz do JRE é sempre um grupo ({all} ou {any}).
  return convertJreCondition(jreConditions) as RqbGroup;
}
