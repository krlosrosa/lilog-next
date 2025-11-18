import { Field } from 'react-querybuilder';

export const fields: Field[] = [
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
