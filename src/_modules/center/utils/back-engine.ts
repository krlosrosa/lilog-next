import { Engine, Event, Rule } from 'json-rules-engine';

let engine = new Engine();

export async function verifyRules(facts: Record<string, any>) {
  engine.addRule({
    conditions: {
      any: [
        {
          all: [
            {
              fact: 'gameDuration',
              operator: 'equal',
              value: 40,
            },
            {
              fact: 'personalFoulCount',
              operator: 'greaterThanInclusive',
              value: 5,
            },
          ],
        },
        {
          all: [
            {
              fact: 'gameDuration',
              operator: 'equal',
              value: 48,
            },
            {
              fact: 'personalFoulCount',
              operator: 'greaterThanInclusive',
              value: 6,
            },
          ],
        },
      ],
    },
    event: {
      // define the event to fire when the conditions evaluate truthy
      type: 'fouledOut',
      params: {
        message: 'Anomalia detectada!',
      },
    },
  });

  return engine.run(facts).then(({ events, results, almanac, failureEvents, failureResults}) => {
    events.map((event) => console.log(event?.params?.message || 'No message'));
  });
}

export async function addRule(rules: Rule[], facts: Record<string, any>) {
  rules.forEach((rule) => {
    engine.addRule(rule);
  });
  const result = await engine.run(facts);
  return result;
}

export const rulesExample = {
  all: [
    {
      fact: 'produtividade',
      operator: 'greaterThan',
      value: '20',
    },
    {
      fact: 'quantidadeCaixas',
      operator: 'equal',
      value: '200',
    },
    {
      all: [
        {
          fact: 'tempoPorVisita',
          operator: 'lessThan',
          value: '20',
        },
        {
          fact: 'tempoDemanda',
          operator: 'equal',
          value: '10',
        },
        {
          fact: 'tempoMaximoVisitas',
          operator: 'equal',
          value: '10',
        },
        {
          all: [],
        },
      ],
    },
  ],
};
