import { v4 as uuidv4 } from 'uuid';
import type {
  EnrichedPickingMapItem,
  ImpressaoMinutaCarregamento,
  ItemMinutaCarregamento,
} from '../../others/types/items';

// Processo: CARREGAMENTO
export function gerarMinuta(
  items: EnrichedPickingMapItem[],
): ImpressaoMinutaCarregamento[] {
  const mapaPorChave = new Map<string, EnrichedPickingMapItem[]>();

  // Agrupa os itens por chave composta (mais simples)
  for (const item of items) {
    const chave = `${item.id}`; // Chave deste processo
    if (!mapaPorChave.has(chave)) {
      mapaPorChave.set(chave, []);
    }
    mapaPorChave.get(chave)!.push(item);
  }

  const mapas: ImpressaoMinutaCarregamento[] = [];

  for (const [chave, grupo] of mapaPorChave.entries()) {
    const primeiro = grupo[0];
    const rota = primeiro.rota;

    const codClientes = Array.from(new Set(grupo.map((i) => i.codCliente)));
    const nomeClientes = Array.from(new Set(grupo.map((i) => i.nomeCliente)));

    // --- CORREÇÃO: Variáveis de Totalização ---
    let totalCaixas = 0,
      totalUnidades = 0,
      somaTotalCaixas = 0;
    let totalPesoCaixa = 0,
      totalPesoUnidade = 0,
      totalPesoLiquido = 0;

    // **NOTA DE NEGÓCIO:** Conforme sua observação,
    // os totais de paletes não são somados aqui.
    let totalPaletes = 0;
    let totalPesoPalete = 0;

    // --- CORREÇÃO: Mapeamento de Itens e Cálculo de Totais ---
    const itensDaMinuta = grupo.map((item): ItemMinutaCarregamento => {
      const aloc = item.alocacao;

      const unidades = aloc?.unidadesSoltas ?? 0;
      const caixas = aloc?.caixasSoltas ?? 0;
      const paletes = aloc?.paletesCompletos ?? 0; // Pega o valor, mas não soma no total
      const pesoUnidade = aloc?.pesoUnidades ?? 0;
      const pesoCaixa = aloc?.pesoCaixas ?? 0;
      // const pesoPalete = aloc?.pesoPaletes ?? 0; // Pega o valor, mas não soma no total
      const totalCaixasAgrupar = aloc?.totalCaixas ?? 0;
      const pesoLiquidoSomar = aloc?.pesoTotalCalculado ?? 0;

      // Acumula apenas os totais de carregamento
      totalUnidades += unidades;
      totalCaixas += caixas;
      totalPesoUnidade += pesoUnidade;
      totalPesoCaixa += pesoCaixa;

      // Se a regra for "não somar paletes", deixamos totalPaletes e totalPesoPalete em 0.
      // Se a regra for "apenas mostrar o total de paletes do primeiro item",
      // a lógica seria outra. Assumi "não somar".

      return {
        empresa: item.produto?.empresa ?? '',
        seguimento: item.produto?.segmento ?? '',
        quantidade: unidades,
        quantidadeCaixas: caixas,
        quantidadePaletes: paletes, // O item individual ainda mostra seus paletes
        id: item.id ?? '',
        visitas: item.visitas,
        pesoLiquidoTotal: pesoLiquidoSomar,
        totalCaixas: totalCaixasAgrupar,
      };
    });

    mapas.push({
      // ... (todos os campos do cabeçalho) ...
      paleteId: uuidv4(),
      id: primeiro.id ?? '',
      linhasVisitadas: itensDaMinuta.reduce(
        (acc, item) => acc + item.visitas,
        0,
      ),
      empresa: primeiro.produto?.empresa ?? '',
      rota: rota?.rota || '',
      transportId: primeiro.transportId,
      placa: primeiro.placa,
      remessa: primeiro.remessa,
      sequencia: rota?.sequencia || 0,
      transportadora: rota?.transportadora || '',
      perfilUtilizado: rota?.perfilUtilizado || '',
      prioridade: rota?.prioridade ?? 0,
      infoAdicionaisI: rota?.infoAdicionaisI ?? '',
      infoAdicionaisII: rota?.infoAdicionaisII ?? '',
      segmento: primeiro.produto?.segmento ?? '',
      codClientes,
      nomeClientes,
      // --- CORREÇÃO: Usa os totais corretos (sem paletes) ---
      caixas: totalCaixas,
      paletes: totalPaletes, // Será 0, conforme a regra de negócio
      unidades: totalUnidades,
      pesoCaixa: totalPesoCaixa,
      pesoPalete: totalPesoPalete, // Será 0
      pesoUnidade: totalPesoUnidade,
      tipo: primeiro.tipo,
      itens: itensDaMinuta,
      processo: 'CARREGAMENTO', // Processo correto
      pesoLiquido: totalPesoLiquido,
      totalCaixas: somaTotalCaixas,
    });
  }

  return mapas;
}
