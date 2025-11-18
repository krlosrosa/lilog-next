export const typeReturnRules = [
  {
    type: 'TEMPO_EXCESSIVO_DE_PAUSA',
    name: 'Tempo Excessivo de Pausa',
    description: 'O tempo de pausa é maior que o tempo de pausa máximo',
  },
  {
    type: 'TEMPO_EXCESSIVO_DE_PAUSA_TERMICA',
    name: 'Tempo Excessivo de Pausa Térmica',
    description:
      'O tempo de pausa térmica é maior que o tempo de pausa térmica máximo',
  },
  {
    type: 'TEMPO_CURTO_DE_PAUSA',
    name: 'Tempo Curto de Pausa',
    description: 'O tempo de pausa é menor que o tempo de pausa mínimo',
  },
  {
    type: 'TEMPO_LONGO_AGUARDANDO_PRODUTO',
    name: 'Tempo Longo de Aguardando Produto',
    description:
      'O tempo de aguardando produto é maior que o tempo de aguardando produto máximo',
  },
  {
    type: 'TERMINO_MUITO_RAPIDO_DE_DEMANDA',
    name: 'Término Muito Rápido de Demanda',
    description: 'O término da demanda é muito rápido',
  },
  {
    type: 'TEMPO_MUITO_LONGO_DE_DEMANDA',
    name: 'Tempo Muito Longo de Demanda',
    description:
      'O tempo de demanda é muito longo, considerando o tempo máximo de demanda',
  },
];
