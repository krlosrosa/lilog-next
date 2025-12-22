import { create } from 'zustand';
import { ConfiguracaoImpressa } from '../../../expedicao/others/types/configuracaoImpressa';

export type Empresa = 'DPA' | 'ITB' | 'LDB';
const initialConfiguracaoImpressao: ConfiguracaoImpressa = {
  tipoImpressao: 'CLIENTE',
  empresa: 'DPA',
  quebraPalete: false,
  tipoQuebra: null,
  valorQuebra: null,
  separarPaleteFull: true,
  separarUnidades: false,
  exibirInfoCabecalho: null,
  segregarFifo: [],
  dataMaximaPercentual: 0,
  tipoImpressaoConferencia: 'TRANSPORTE',
  ordemConferencia: null,
  ordemFifo: null,
  ordemPaletes: null,
  ordemPicking: null,
  ordemUnidades: null,
}


interface ConfiguracoesStore {
  sincronizado: boolean;
  configuracaoImpressao: ConfiguracaoImpressa;
  replicar: boolean;
  classificarProduto: boolean;
  setConfiguracaoImpressao: (config: ConfiguracaoImpressa) => void;
  setSincronizado: (sincronizado: boolean) => void;
  resetConfiguracao: () => void;
  setReplicar: (replicar: boolean) => void;
  setClassificarProduto: (classificarProduto: boolean) => void;
}

export const useConfiguracoesStore = create<ConfiguracoesStore>((set) => ({
  sincronizado: false,
  configuracaoImpressao: initialConfiguracaoImpressao,
  replicar: false,
  classificarProduto: false,
  setConfiguracaoImpressao: (config) => set({ configuracaoImpressao: config }),
  setSincronizado: (sincronizado) => set({ sincronizado }),
  resetConfiguracao: () => initialConfiguracaoImpressao,
  setReplicar: (replicar) => set({ replicar }),
  setClassificarProduto: (classificarProduto) => set({ classificarProduto }),
}));

