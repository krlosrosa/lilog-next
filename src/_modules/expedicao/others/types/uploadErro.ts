export type ErrorFiles = {
  error: boolean;
  errors: ErrorField[];
  produtosNaoEncontrados: ProdutoNaoEncontrado[];
  divergenciaConversao: DivergenciaConversao[];
};

export type ErrorField = {
  arquivo: string;
  message: string;
  codigo: string;
  linha: number;
  campo: string;
};

export type ProdutoNaoEncontrado = {
  id: string;
  descricao: string;
};

export type DivergenciaConversao = {
  transportId: string;
  lote: string;
  codItem: string;
  descricao: string;
  pesoPorUnidade: number;
  unidadesNaCaixa: number;
  pesoPedido: number;
  quantidade: number;
  unMedida: string;
  quantidadeFinal: number;
  conversao: number;
  diferenca: number;
  totalUnidadesPostConversao: number;
}
