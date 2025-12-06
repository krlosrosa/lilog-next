import { v4 as uuidv4 } from 'uuid';
import type {
  EnrichedPickingMapItem,
  ImpressaoMapa,
  ImpressaoMapaItem,
} from '../../others/types/items';

export function gerarSeparacao(
  items: EnrichedPickingMapItem[],
): ImpressaoMapa[] {
  const mapaPorChave = new Map<string, EnrichedPickingMapItem[]>();

  // 1. Agrupar os itens (Esta lógica estava correta)
  // A 'chave' usa o 'item.id' (que já foi modificado pela distribuição)
  // e o 'item.tipo' (que foi modificado pelo split)
  for (const item of items) {
    const chave = `${item.id}|${item.tipo}|${item.produto?.empresa}|${item.produto?.segmento}`;
    if (!mapaPorChave.has(chave)) {
      mapaPorChave.set(chave, []);
    }
    mapaPorChave.get(chave)!.push(item);
  }

  const mapas: ImpressaoMapa[] = [];

  // 2. Processar cada grupo (mapa)
  for (const [chave, grupo] of mapaPorChave.entries()) {
    const primeiro = grupo[0];
    const rota = primeiro.rota;

    const codClientes = Array.from(new Set(grupo.map((i) => i.codCliente)));
    const nomeClientes = Array.from(new Set(grupo.map((i) => i.nomeCliente)));

    // --- CORREÇÃO: Variáveis de Totalização ---
    // Renomeadas para clareza (ex: totalCaixas)
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
      // Pega a alocação do item.
      // A função 'splitPalete' já garantiu que este 'alocacao'
      // representa apenas a parte deste item (ex: só paletes).
      const aloc = item.alocacao;

      // Extrai os valores do local correto
      const unidades = aloc?.unidadesSoltas ?? 0;
      const caixas = aloc?.caixasSoltas ?? 0;
      const paletes = aloc?.paletesCompletos ?? 0;
      const pesoUnidade = aloc?.pesoUnidades ?? 0;
      const pesoCaixa = aloc?.pesoCaixas ?? 0;
      const pesoPalete = aloc?.pesoPaletes ?? 0;
      const percentual = aloc?.percentualProximoPalete ?? 0;
      const totalCaixasAgrupar = aloc?.totalCaixas ?? 0;
      const pesoLiquidoSomar = aloc?.pesoTotalCalculado ?? 0;

      // Acumula os totais para o cabeçalho (Header)
      totalUnidades += unidades;
      totalCaixas += caixas;
      totalPaletes += paletes;
      totalPesoUnidade += pesoUnidade;
      totalPesoCaixa += pesoCaixa;
      totalPesoPalete += pesoPalete;
      somaTotalCaixas += totalCaixasAgrupar;
      totalPesoLiquido += pesoLiquidoSomar;
      // Retorna o item do mapa (ImpressaoMapaItem)
      return {
        sku: item.codItem,
        descricao: item.descricao,
        // As interfaces de Impressao parecem usar 'quantidade' e 'pesoLiquido'
        // para se referir a unidades.
        quantidade: unidades,
        pesoLiquido: pesoUnidade,
        pesoPalete: pesoPalete,
        pesoCaixa: pesoCaixa,
        quantidadeCaixas: caixas,
        quantidadePaletes: paletes,
        totalCaixas: totalCaixasAgrupar,
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
      };
    });

    // 3. Montar o Mapa Final (Header + Itens)
    mapas.push({
      local: rota?.local,
      id: primeiro.id ?? '', // ID do grupo/mapa
      paleteId: uuidv4(), // ID único desta impressão
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
      totalCaixas: somaTotalCaixas,
      tipo: primeiro.tipo,
      itens: itensDoMapa,
      processo: 'SEPARACAO',
      pesoLiquido: totalPesoLiquido,
    });
  }

  return mapas;
}
