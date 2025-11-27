import { RuleGroupType } from 'react-querybuilder';
import { create } from 'zustand';
import { EventData } from '../types/event.type';

interface EngineAnomaliaStore {
  processo: {
    nomeRegra: string;
    descricao: string;
    processo: string;
  },
  event: {
    type: string;
    params: {
      message: string;
    };
  },
  query: RuleGroupType;
  setProcesso: (processo: {
    nomeRegra: string;
    descricao: string;
    processo: string;
  }) => void;
  setQuery: (query: RuleGroupType) => void;
  setEvent: (event: EventData) => void;
}

export const useEngineAnomaliaStore = create<EngineAnomaliaStore>((set) => ({
  processo: {
    nomeRegra: '',
    descricao: '',
    processo: '',
  },
  event: {
    type: '',
    params: { message: '' },
  },
  query: { combinator: 'and', rules: [] },
  setProcesso: (processo) => set({ processo }),
  setQuery: (query) => set({ query }),
  setEvent: (event) => set({ event }),
}));