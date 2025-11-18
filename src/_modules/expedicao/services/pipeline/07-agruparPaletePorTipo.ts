import type { EnrichedPickingMapItem } from '../../others/types/items';

type Props = {
  lista: EnrichedPickingMapItem[];
  tipo: 'LINHAS' | 'PERCENTUAL' | null;
  quantidade: number;
};

export function distribuirPaletePorTipo({
  lista,
  tipo,
  quantidade,
}: Props): EnrichedPickingMapItem[] {
  // --- Guards Iniciais ---
  if (quantidade <= 0 || !tipo) {
    return lista;
  }

  const result: EnrichedPickingMapItem[] = [];
  let paleteCounter = 1;

  // --- Contadores Unificados ---
  let currentLineCount = 0;
  let currentPercentage = 0;

  // --- Loop Único ---
  for (const item of lista) {
    // 1. Adiciona o item ao palete ATUAL
    result.push({
      ...item,
      id: `${item.id}-${paleteCounter}`, // Sempre usa o contador atual
    });

    // 2. Atualiza o contador apropriado
    if (tipo === 'LINHAS') {
      currentLineCount++;
      // 3. Verifica se o palete ATUAL ficou cheio
      if (currentLineCount >= quantidade) {
        paleteCounter++; // Prepara o contador para o PRÓXIMO item
        currentLineCount = 0; // Zera para o próximo palete
      }
    } else if (tipo === 'PERCENTUAL') {
      // CORREÇÃO: Busca o percentual do local correto ('alocacao')
      const itemPercent = item.alocacao?.percentualProximoPalete ?? 0;
      currentPercentage += itemPercent;

      // 3. Verifica se o palete ATUAL ficou cheio
      // Usamos >= para que 100% exato também feche o palete
      if (currentPercentage >= quantidade) {
        paleteCounter++; // Prepara o contador para o PRÓXIMO item
        currentPercentage = 0; // Zera para o próximo palete
      }
    }
  }

  return result;
}
