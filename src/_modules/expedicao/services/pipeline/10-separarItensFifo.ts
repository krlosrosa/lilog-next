import type { EnrichedPickingMapItem } from '../../others/types/items';

/**
 * Marca itens como 'fifo' com base em suas faixas.
 * * Esta função é otimizada para:
 * 1. Não fazer nada se nenhuma faixa for fornecida.
 * 2. Usar um Set para verificação rápida.
 * 3. Só clonar os objetos que realmente forem modificados.
 */
export function marcarItensFifo( // Renomeei de 'separarItensFifo' para clareza
  lista: EnrichedPickingMapItem[],
  faixas?: string[],
): EnrichedPickingMapItem[] {
  // 1. Guard Clause (Melhoria de Performance):
  // Se a lista de faixas não for fornecida ou estiver vazia,
  // não há o que fazer. Retorna a lista original imediatamente.
  if (!faixas || faixas.length === 0) {
    return lista;
  }

  // 2. Otimização de Lookup:
  // Criamos um Set com as faixas em maiúsculo para
  // verificação rápida (O(1)) e case-insensitive.
  const faixasFifoSet = new Set(faixas.map((f) => f.toUpperCase()));

  // 3. Mapeamento e Modificação:
  // O 'map' sempre cria um novo ARRAY
  return lista.map((item) => {
    // Default para 'VERDE' se a faixa for nula ou undefined
    const faixaItem = (item.faixa ?? 'VERDE').toUpperCase();

    // Verifica se a faixa do item está no Set
    if (faixasFifoSet.has(faixaItem)) {
      // Se sim, retorna um NOVO objeto (clone) com o 'tipo' modificado
      return {
        ...item,
        tipo: 'fifo',
        // O `id: `${item.id}`` foi removido por ser redundante
      };
    }

    // Se não, retorna o item ORIGINAL.
    // O novo array conterá uma referência ao objeto original (mais eficiente).
    return item;
  });
}
