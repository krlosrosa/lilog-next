import type {
  AlocacaoHierarquica,
  EnrichedPickingMapItem,
} from '../../others/types/items';

// ... (A função getAlocacaoDefault permanece a mesma) ...
function getAlocacaoDefault(
  quantidade: number,
  peso: number,
): AlocacaoHierarquica {
  return {
    paletesCompletos: 0,
    caixasSoltas: 0,
    unidadesSoltas: quantidade,
    pesoTotalCalculado: peso,
    pesoPaletes: 0,
    pesoCaixas: 0,
    pesoUnidades: peso,
    percentualProximoPalete: 0,
    totalCaixas: 0,
  };
}

export function alocarCaixasEPaletes(
  items: EnrichedPickingMapItem[],
  segregarPorPalete: boolean, // NOVO: Parâmetro para controlar a segregação
): EnrichedPickingMapItem[] {
  return items.map((item) => {
    const { produto, quantidade, pesoLiquido } = item;
    // --- 1. Validação e Casos de Borda ---
    if (
      !produto ||
      !produto.unPorCaixa ||
      produto.unPorCaixa <= 0 ||
      !produto.cxPorPallet ||
      produto.cxPorPallet <= 0
    ) {
      // Se não podemos calcular, a segregação é irrelevante.
      return {
        ...item,
        alocacao: getAlocacaoDefault(quantidade, pesoLiquido || 0),
      };
    }

    // --- 2. Definição das Constantes ---
    const { unPorCaixa, cxPorPallet, pesoCaixa, pesoUnidade } = produto;
    const totalUnidades = quantidade;
    const pesoPorUnidade = pesoUnidade

    // --- 3. Cálculo da Alocação Hierárquica ---

    // Nível 1: De Unidades para Caixas (sempre acontece)
    const totalCaixas = Math.floor(totalUnidades / unPorCaixa);
    const unidadesSoltas = Math.floor(totalUnidades % unPorCaixa);

    // Nível 2: De Caixas para Paletes (agora é condicional)

    // NOVO: Declaramos as variáveis que dependerão da lógica
    let paletesCompletos: number;
    let caixasSoltas: number;

    if (segregarPorPalete) {
      // Comportamento original: calculamos paletes e caixas restantes
      paletesCompletos = Math.floor(totalCaixas / cxPorPallet);
      caixasSoltas = totalCaixas % cxPorPallet;
    } else {
      // NOVO: Não segregamos. Todos os paletes são 0, e todas as caixas são "soltas".
      paletesCompletos = 0;
      caixasSoltas = totalCaixas; // O total de caixas vira "caixas soltas"
    }

    // --- 4. Cálculo de Pesos (baseado na alocação) ---

    // Esta lógica funciona perfeitamente, pois as variáveis acima
    // (paletesCompletos, caixasSoltas) já têm os valores corretos.
    // Se segregarPorPalete=false, pesoPaletes será 0.
    const pesoPaletes = paletesCompletos * cxPorPallet * unPorCaixa * pesoUnidade;
    const pesoCaixas = caixasSoltas * unPorCaixa * pesoUnidade; // E pesoCaixas terá o peso de *todas* as caixas
    const pesoUnidades = unidadesSoltas * pesoPorUnidade;

    const pesoTotalCalculado = pesoPaletes + pesoCaixas + pesoUnidades;

    // --- 5. Cálculo de Percentual ---

    const percentualProximoPalete = (caixasSoltas / cxPorPallet) * 100;

    const totalCaixasAgrupar = (paletesCompletos > 0 ? (paletesCompletos * cxPorPallet ): 0);
    // --- 6. Retorno Não-Destrutivo ---
    return {
      ...item,
      alocacao: {
        paletesCompletos,
        caixasSoltas,
        unidadesSoltas,
        pesoTotalCalculado,
        pesoPaletes,
        pesoCaixas,
        pesoUnidades,
        percentualProximoPalete,
        totalCaixas: totalCaixasAgrupar,
      },
    };
  });
}
