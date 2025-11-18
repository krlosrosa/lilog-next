export interface ConfiguracaoImpressao {
  id?: string;
  tipoImpressao: 'CLIENTE' | 'TRANSPORTE';
  empresa: string;
  quebraPalete: boolean;
  tipoQuebra: 'LINHAS' | 'PERCENTUAL' | null;
  valorQuebra: string | null;
  separarPaleteFull: boolean;
  separarUnidades: boolean;
  exibirInfoCabecalho: 'PRIMEIRO' | 'TODOS' | 'NENHUM' | null;
  segregarFifo: string[] | null;
  dataMaximaPercentual: number;
  createdAt?: string;
  updatedAt?: string;
  centerId?: string;
  atribuidoPorId?: string | null;
  tipoImpressaoConferencia: 'TRANSPORTE' | 'CLIENTE';
  ordemConferencia: string[] | null;
  ordemFifo: string[] | null;
  ordemPaletes: string[] | null;
  ordemPicking: string[] | null;
  ordemUnidades: string[] | null;
}
