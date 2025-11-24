import { v4 as uuidv4 } from 'uuid';
import type {
  EnrichedPickingMapItem,
  ImpressaoMapa,
  ImpressaoMapaItem,
} from '../../others/types/items';

// Processo: CONFERENCIA
export function gerarConferencia(
  items: EnrichedPickingMapItem[],
): ImpressaoMapa[] {
  const mapaPorChave = new Map<string, EnrichedPickingMapItem[]>();

  // Agrupa os itens por chave composta (diferente da separação)
  for (const item of items) {
    const chave = `${item.id}|${item.tipo}|${item.produto?.segmento}`; // Chave deste processo
    if (!mapaPorChave.has(chave)) {
      mapaPorChave.set(chave, []);
    }
    mapaPorChave.get(chave)!.push(item);
  }

  const mapas: ImpressaoMapa[] = [];

  for (const [chave, grupo] of mapaPorChave.entries()) {
    const primeiro = grupo[0];
    const rota = primeiro.rota;

    const codClientes = Array.from(new Set(grupo.map((i) => i.codCliente)));
    const nomeClientes = Array.from(new Set(grupo.map((i) => i.nomeCliente)));

    // --- CORREÇÃO: Variáveis de Totalização ---
    let totalCaixas = 0,
      totalPaletes = 0,
      totalUnidades = 0,
      somaTotalCaixas = 0;
    let totalPesoCaixa = 0,
      totalPesoPalete = 0,
      totalPesoUnidade = 0,
      totalPesoLiquido = 0;


    // --- CORREÇÃO: Mapeamento de Itens e Cálculo de Totais ---
    const itensDoMapa = grupo.map((item): ImpressaoMapaItem => {
      const aloc = item.alocacao;

      const unidades = aloc?.unidadesSoltas ?? 0;
      const caixas = aloc?.caixasSoltas ?? 0;
      const paletes = aloc?.paletesCompletos ?? 0;
      const pesoUnidade = aloc?.pesoUnidades ?? 0;
      const pesoCaixa = aloc?.pesoCaixas ?? 0;
      const pesoPalete = aloc?.pesoPaletes ?? 0;
      const percentual = aloc?.percentualProximoPalete ?? 0;
      const totalCaixasAgrupar = aloc?.totalCaixas ?? 0;
      const pesoLiquidoSomar = aloc?.pesoTotalCalculado ?? 0;

      // Acumula os totais para o cabeçalho
      totalUnidades += unidades;
      totalCaixas += caixas;
      totalPaletes += paletes; // Mantendo a soma, pois o processo é 'CONFERENCIA'
      totalPesoUnidade += pesoUnidade;
      totalPesoCaixa += pesoCaixa;
      totalPesoPalete += pesoPalete; // Mantendo a soma
      somaTotalCaixas += totalCaixasAgrupar;
      totalPesoLiquido += pesoLiquidoSomar;

      return {
        sku: item.codItem,
        descricao: item.descricao,
        quantidade: unidades,
        pesoLiquido: pesoUnidade,
        pesoPalete: pesoPalete,
        pesoCaixa: pesoCaixa,
        quantidadeCaixas: caixas,
        quantidadePaletes: paletes,
        lote: item.lote,
        dtFabricacao: item.dtFabricacao,
        percentualPallete: percentual,
        dtMaxima: item.dataMaxima
          ? new Date(item.dataMaxima)
          : item.dtVencimento,
        endereco: item.produto?.endereco ?? '',
        segmento: item.produto?.segmento ?? '',
        pickWay: item.produto?.pickWay ?? 0,
        faixa: item.faixa ?? 'verde',
        empresa: item.produto?.empresa ?? '',
        pesoLiquidoTotal: pesoLiquidoSomar,
        totalCaixas: totalCaixasAgrupar,
      };
    });

    mapas.push({
      // ... (todos os campos do cabeçalho) ...
      local: rota?.local,
      id: primeiro.id ?? '',
      paleteId: uuidv4(),
      linhasVisitadas: itensDoMapa.length,
      empresa: primeiro.produto?.empresa ?? '',
      rota: rota?.rota ?? '',
      transportId: primeiro.transportId,
      placa: primeiro.placa,
      remessa: primeiro.remessa,
      sequencia: rota?.sequencia ?? 0,
      transportadora: rota?.transportadora ?? '',
      perfilUtilizado: rota?.perfilUtilizado ?? '',
      prioridade: rota?.prioridade ?? 0,
      infoAdicionaisI: rota?.infoAdicionaisI ?? '',
      infoAdicionaisII: rota?.infoAdicionaisII ?? '',
      segmento: primeiro.produto?.segmento ?? '',
      codClientes,
      nomeClientes,
      // --- CORREÇÃO: Usa os totais corretos ---
      caixas: totalCaixas,
      paletes: totalPaletes,
      unidades: totalUnidades,
      pesoCaixa: totalPesoCaixa,
      pesoPalete: totalPesoPalete,
      pesoUnidade: totalPesoUnidade,
      tipo: primeiro.tipo,
      itens: itensDoMapa,
      processo: 'CONFERENCIA', // Processo correto
      pesoLiquido: totalPesoLiquido,
      totalCaixas: somaTotalCaixas,
    });
  }

  return mapas;
}
