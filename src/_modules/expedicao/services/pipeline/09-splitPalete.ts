import type {
  EnrichedPickingMapItem,
  AlocacaoHierarquica,
} from '../../others/types/items';

// Assumindo que esta função está em um local compartilhado,
// ou você pode re-declarar ela aqui.
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
// Helper para criar um objeto de alocação 100% vazio
const alocacaoVazia = getAlocacaoDefault(0, 0);

interface SplitPaleteProps {
  items: EnrichedPickingMapItem[];
  splitPalete: boolean;
  splitUnidade: boolean;
}

export const splitPalete = ({
  items,
  splitPalete,
  splitUnidade,
}: SplitPaleteProps) => {
  const lista: EnrichedPickingMapItem[] = [];

  items.forEach((item) => {
    // Se não há alocacao, ou não há flags, não há o que splitar
    if (!item.alocacao || (!splitPalete && !splitUnidade)) {
      lista.push(item);
      return;
    }

    const { alocacao } = item;

    // --- LÓGICA DE SPLIT REFEITA ---

    // Caso 1: Splitar TUDO (Palete, Caixa E Unidade)
    if (splitPalete && splitUnidade) {
      // 1.a. Parte do Palete
      if (alocacao.paletesCompletos > 0) {
        const paleteAlocacao: AlocacaoHierarquica = {
          ...alocacaoVazia,
          paletesCompletos: alocacao.paletesCompletos,
          pesoPaletes: alocacao.pesoPaletes,
          pesoTotalCalculado: alocacao.pesoPaletes,
          totalCaixas: alocacao.totalCaixas,
        };
        lista.push({ ...item, tipo: 'palete', alocacao: paleteAlocacao });
      }

      // 1.b. Parte da Caixa (Picking)
      if (alocacao.caixasSoltas > 0) {
        const caixaAlocacao: AlocacaoHierarquica = {
          ...alocacaoVazia,
          caixasSoltas: alocacao.caixasSoltas,
          pesoCaixas: alocacao.pesoCaixas,
          pesoTotalCalculado: alocacao.pesoCaixas,
          // A "sobra" (caixas) carrega o percentual original
          percentualProximoPalete: alocacao.percentualProximoPalete,
          totalCaixas: alocacao.totalCaixas,
        };
        lista.push({ ...item, tipo: 'picking', alocacao: caixaAlocacao });
      }

      // 1.c. Parte da Unidade
      if (alocacao.unidadesSoltas > 0) {
        const unidadeAlocacao: AlocacaoHierarquica = {
          ...alocacaoVazia,
          unidadesSoltas: alocacao.unidadesSoltas,
          pesoUnidades: alocacao.pesoUnidades,
          pesoTotalCalculado: alocacao.pesoUnidades,
          totalCaixas: alocacao.totalCaixas,
        };
        lista.push({ ...item, tipo: 'unidade', alocacao: unidadeAlocacao });
      }
      return;
    }

    // Caso 2: Splitar SÓ Unidade (Unidade + Restante[Palete+Caixa])
    if (splitUnidade) {
      // 2.a. Parte da Unidade
      if (alocacao.unidadesSoltas > 0) {
        const unidadeAlocacao: AlocacaoHierarquica = {
          ...alocacaoVazia,
          unidadesSoltas: alocacao.unidadesSoltas,
          pesoUnidades: alocacao.pesoUnidades,
          pesoTotalCalculado: alocacao.pesoUnidades,
          totalCaixas: alocacao.totalCaixas,
        };
        lista.push({ ...item, tipo: 'unidade', alocacao: unidadeAlocacao });
      }

      // 2.b. Parte Restante (Palete + Caixa)
      if (alocacao.paletesCompletos > 0 || alocacao.caixasSoltas > 0) {
        const restanteAlocacao: AlocacaoHierarquica = {
          ...alocacaoVazia,
          paletesCompletos: alocacao.paletesCompletos,
          caixasSoltas: alocacao.caixasSoltas,
          pesoPaletes: alocacao.pesoPaletes,
          pesoCaixas: alocacao.pesoCaixas,
          pesoTotalCalculado: alocacao.pesoPaletes + alocacao.pesoCaixas,
          percentualProximoPalete: alocacao.percentualProximoPalete,
          totalCaixas: alocacao.totalCaixas,
        };
        lista.push({ ...item, tipo: 'picking', alocacao: restanteAlocacao });
      }
      return;
    }

    // Caso 3: Splitar SÓ Palete (Palete + Restante[Caixa+Unidade])
    if (splitPalete) {
      // 3.a. Parte do Palete
      if (alocacao.paletesCompletos > 0) {
        const paleteAlocacao: AlocacaoHierarquica = {
          ...alocacaoVazia,
          paletesCompletos: alocacao.paletesCompletos,
          pesoPaletes: alocacao.pesoPaletes,
          pesoTotalCalculado: alocacao.pesoPaletes,
          totalCaixas: alocacao.totalCaixas,
        };
        lista.push({ ...item, tipo: 'palete', alocacao: paleteAlocacao });
      }

      // 3.b. Parte Restante (Caixa + Unidade)
      if (alocacao.caixasSoltas > 0 || alocacao.unidadesSoltas > 0) {
        const restanteAlocacao: AlocacaoHierarquica = {
          ...alocacaoVazia,
          caixasSoltas: alocacao.caixasSoltas,
          unidadesSoltas: alocacao.unidadesSoltas,
          totalCaixas: alocacao.totalCaixas,
          pesoCaixas: alocacao.pesoCaixas,
          pesoUnidades: alocacao.pesoUnidades,
          pesoTotalCalculado: alocacao.pesoCaixas + alocacao.pesoUnidades,
          percentualProximoPalete: alocacao.percentualProximoPalete,
        };
        lista.push({ ...item, tipo: 'picking', alocacao: restanteAlocacao });
      }
      return;
    }
  });

  return lista;
};
