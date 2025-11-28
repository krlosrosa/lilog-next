import { RuleGroupType } from 'react-querybuilder';
import { create } from 'zustand';
import { EventData } from '../types/event.type';
import { Field } from 'react-querybuilder';

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
  fields: Field[];
  setProcesso: (processo: {
    nomeRegra: string;
    descricao: string;
    processo: string;
  }) => void;
  setQuery: (query: RuleGroupType) => void;
  setEvent: (event: EventData) => void;
  setFields: (fields: Field[]) => void;
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
  fields: [],
  setProcesso: (processo) => set({ processo }), 
  setFields: (fields) => set({ fields }),
  setQuery: (query) => set({ query }),
  setEvent: (event) => set({ event }),
}));