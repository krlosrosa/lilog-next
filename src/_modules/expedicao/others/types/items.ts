export interface EnrichedPickingMapItem extends ShipmentPickingMapItem {
  tipo: 'picking' | 'unidade' | 'palete' | 'fifo';
  faixa?: 'verde' | 'laranja' | 'amarelo' | 'vermelho';
  rota: RoutingPickingMapItem | null;
  produto: ProductsPickingMapItem;
  visitas: number;
  dataMaxima?: string;
  alocacao: AlocacaoHierarquica;
}

export interface AlocacaoHierarquica {
  paletesCompletos: number;
  caixasSoltas: number; // Caixas que não formam um palete
  unidadesSoltas: number; // Unidades que não formam uma caixa
  pesoTotalCalculado: number;
  pesoPaletes: number; // Peso total dos paletes completos
  pesoCaixas: number; // Peso total das caixas soltas
  pesoUnidades: number; // Peso total das unidades soltas
  percentualProximoPalete: number;
  totalCaixas: number;
}

export interface RoutingPickingMapItem {
  empresa: string;
  rota: string;
  transportId: string;
  placa: string;
  remessa: string;
  sequencia: number;
  codCliente: string;
  nomeCliente: string;
  local: string;
  bairro: string;
  perfiRoterizado: string;
  perfilUtilizado: string;
  transportadora: string;
  tipoDeCarga: string;
  prioridade?: number;
  infoAdicionaisI?: string;
  infoAdicionaisII?: string;
}

export interface ShipmentPickingMapItem {
  id?: string;
  transportId: string;
  remessa: string;
  shipmentItem: string;
  centro: string;
  empresa: string;
  nomeEmpresa: string;
  placa: string;
  codItem: string;
  descricao: string;
  lote: string;
  quantidade: number;
  unMedida: string;
  dtFabricacao: Date;
  dtVencimento: Date;
  codCliente: string;
  nomeCliente: string;
  pesoBruto: number;
  pesoLiquido: number;
}

export interface ProductsPickingMapItem {
  codItem: string;
  descricao: string;
  shelf: number;
  variavel: number;
  pesoCaixa: number;
  pesoUnidade: number;
  unPorCaixa: number;
  cxPorPallet: number;
  segmento: string;
  vermelho: number;
  laranja: number;
  amarelo: number;
  verde: number;
  pickWay: number;
  endereco: string;
  empresa: string;
}

export interface ImpressaoMinutaCarregamento extends ImpressaoMapaHeader {
  itens: ItemMinutaCarregamento[];
}

export interface ImpressaoMapa extends ImpressaoMapaHeader {
  itens: ImpressaoMapaItem[];
}

export interface ItemMinutaCarregamento {
  id: string;
  empresa: string;
  seguimento: string;
  quantidade: number;
  quantidadeCaixas: number;
  quantidadePaletes: number;
  pesoLiquidoTotal: number;
  totalCaixas: number;
  visitas: number;
}

export interface ImpressaoMapaHeader {
  local?: string;
  paleteId: string;
  id: string;
  empresa: string;
  rota: string;
  transportId: string;
  placa: string;
  remessa: string;
  sequencia: number;
  transportadora: string;
  perfilUtilizado: string;
  prioridade: number;
  infoAdicionaisI: string;
  infoAdicionaisII: string;
  segmento: string;
  codClientes: string[];
  nomeClientes: string[];
  caixas: number;
  totalCaixas: number;
  paletes: number;
  unidades: number;
  pesoUnidade: number;
  pesoPalete: number;
  pesoCaixa: number;
  pesoLiquido: number;
  linhasVisitadas: number;
  tipo: 'picking' | 'unidade' | 'palete' | 'fifo';
  processo: string;
}

export interface ImpressaoMapaItem {
  sku: string;
  descricao: string;
  quantidade: number;
  pesoLiquido: number;
  pesoPalete: number;
  pesoCaixa: number;
  pesoLiquidoTotal: number;
  quantidadeCaixas: number;
  quantidadePaletes: number;
  totalCaixas: number;
  lote: string;
  dtFabricacao: Date;
  dtMaxima: Date;
  endereco: string;
  segmento: string;
  pickWay: number;
  faixa: 'verde' | 'laranja' | 'amarelo' | 'vermelho';
  percentualPallete: number;
  empresa: string;
}
