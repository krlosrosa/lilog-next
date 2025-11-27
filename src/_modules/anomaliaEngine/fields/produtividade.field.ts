import { defaultOperators, Field, OptionGroup } from 'react-querybuilder';


export const processosOptions: OptionGroup[] = [
  {
    label: 'Processo',
    options: [
      { value: 'SEPARACAO', label: 'Separação' },
      { value: 'CONFERENCIA', label: 'Conferência' },
      { value: 'CARREGAMENTO', label: 'Carregamento' },
    ],
  },
]
export const turnoOptions: OptionGroup[] = [
  {
    label: 'Processo',
    options: [
      { value: 'MANHA', label: 'Manhã' },
      { value: 'TARDE', label: 'Tarde' },
      { value: 'NOITE', label: 'Noite' },
    ],
  },
]
export const statusOptions: OptionGroup[] = [
  {
    label: 'Status',
    options: [
      { value: 'EM_PROGRESSO', label: 'Em Progresso' },
      { value: 'PAUSA', label: 'Pausa' },
      { value: 'FINALIZADA', label: 'Finalizada' },
    ],
  },
]

export const fieldsProdutividade: Field[] = [
  {
    name: 'tempoPorVisitaEmSegundos',
    label: 'Tempo médio por visita (s)',
    description: 'Tempo médio gasto por visita em segundos',
    type: 'number',
  },
  {
    name: 'tempoTrabalhadoDemandaEmSegundos',
    label: 'Tempo total trabalhado na demanda (s)',
    description: 'Tempo total trabalhado na demanda em segundos',
    type: 'number',
  },
  {
    name: 'tempoTotalDemandaEmSegundos',
    label: 'Tempo total da demanda (s)',
    description: 'Tempo total da demanda em segundos',
    type: 'number',
  },
  {
    name: 'tempoTotalPausasEmSegundos',
    label: 'Tempo total de pausas na demanda (s)',
    description: 'Tempo total de pausas na demanda em segundos',
    type: 'number',
  },
  {
    name: 'quantidadeCaixas',
    label: 'Quantidade de Caixas',
    type: 'number',
  },
  {
    name: 'quantidadeVisitas',
    label: 'Quantidade de Endereços Visitados',
    type: 'number',
  },
  {
    name: 'quantidadeUnidades',
    label: 'Quantidade de Unidades',
    type: 'number',
  },
  {
    name: 'quantidadePaletes',
    label: 'Quantidade de Paletes',
    type: 'number',
  },
  {
    name: 'statusDemanda',
    label: 'Status da Demanda',
    type: 'string',
  },
  {
    name: 'produtividade',
    label: 'Produtividade',
    type: 'number',
  },
  {
    name: 'processo',
    label: 'Processo',
    valueEditorType: 'select',
    values: processosOptions,
    operators: defaultOperators.filter((op) => ['=', '!='].includes(op.name)),
  },
  {
    name: 'status',
    label: 'Status',
    valueEditorType: 'select',
    values: statusOptions,
    operators: defaultOperators.filter((op) => ['=', '!='].includes(op.name)),
  },
  {
    name: 'turno',
    label: 'Turno',
    valueEditorType: 'select',
    values: turnoOptions,
    operators: defaultOperators.filter((op) => ['=', '!='].includes(op.name)),
  },
  {
    name: 'inicio',
    label: 'Início da Demanda',
    type: 'date',
  },
  {
    name: 'fim',
    label: 'Fim da Demanda',
    type: 'date',
  },
];

export const mockFacts = {
  // Informações de produtividade / operação
  tempoPorVisita: 180000, // 3 minutos por visita
  tempoDemanda: 7200000, // 2 horas totais
  tempoMinimoPorVisitaEmMilisegundos: 5000, // 5 segundos
  tempoMaximoVisitas: 4 * 60 * 1000, // 4 minutos
  tempoMaximoDePausa: 90 * 60 * 1000, // 90 minutos
  tempoMaximoDePausaTermica: 30 * 60 * 1000, // 30 minutos

  // Dados da demanda
  quantidadeCaixas: 320,
  quantidadeVisitas: 24,
  quantidadeUnidades: 960,
  quantidadePaletes: 4,
  statusDemanda: 'FINALIZADA',
  produtividade: 85.3,
  // Dados do colaborador e centro
  centerId: 'CENTER_123',
  funcionarioId: 'FUNC_456',
  nomeFuncionario: 'João da Silva',
  cadastroPorId: 'ADM_001',
  nomeCadastradoPor: 'Maria Oliveira',

};

