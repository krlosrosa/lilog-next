import { defaultOperators, Field, OptionGroup } from 'react-querybuilder';

export const statusOrder = [
  'INICIO_SEPARACAO',
  'TERMINO_SEPARACAO',
  'INICIO_CONFERENCIA',
  'TERMINO_CONFERENCIA',
  'INICIO_CARREGAMENTO',
  'TERMINO_CARREGAMENTO',
] as const;

export const statusRank: Record<string, number> = Object.fromEntries(
  statusOrder.map((s, i) => [s, i])
);

const operators = [
  { name: '>', label: 'Maior que' },
  { name: '<', label: 'Menor que' },
];

export const statusOptions: OptionGroup[] = [
  {
    label: 'Status',
    options: [
      { name: 'NAO_INICIADO', label: 'Não Iniciado' },
      { name: 'EM_PROGRESSO', label: 'Em Progresso' },
      { name: 'CONCLUIDO', label: 'Concluído' },
      { name: 'EM_PAUSA', label: 'Em Pausa' },
    ],
  },
]

export const fieldsTransporte: Field[] = [
  {
    name: 'nomeTransportadora',
    label: 'Nome Transportadora',
    type: 'string',
  },
  {
    name: 'placa',
    label: 'PLACA',
    type: 'string',
  },
  {
    name: 'prioridade',
    label: 'Prioridade',
    type: 'number',
  },
  {
    name: 'carregamento',
    label: 'Status Carregamento',
    valueEditorType: 'select',
    values: statusOptions,
    operators: defaultOperators.filter((op) => ['=', '!='].includes(op.name)),
  },
  {
    name: 'conferencia',
    label: 'Status Conferencia',
    valueEditorType: 'select',
    values: statusOptions,
    operators: defaultOperators.filter((op) => ['=', '!='].includes(op.name)),
  },
  {
    name: 'separacao',
    label: 'Status Separação',
    valueEditorType: 'select',
    values: statusOptions,
    operators: defaultOperators.filter((op) => ['=', '!='].includes(op.name)),
  },
  {
    name: 'cargaParada',
    label: 'Carga Parada',
    valueEditorType: 'checkbox',
    operators: defaultOperators.filter((op) => op.name === '='),
    defaultValue: false,
  }
]
