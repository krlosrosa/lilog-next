export const UNIDADES_CAIXA = ['CX', 'CXC', 'SC', 'FRD', 'FD','BD', 'BL'] as const;
export const UNIDADES_BASE = ['UN', 'UND', 'L', 'CJ', 'CJT', 'PC'] as const;
export const UNIDADES_CONHECIDAS = [
  ...UNIDADES_CAIXA,
  ...UNIDADES_BASE,
] as const;

export type UnidadeMedidaCaixa = (typeof UNIDADES_CAIXA)[number];
export type UnidadeMedidaBase = (typeof UNIDADES_BASE)[number];
export type UnidadeMedidaConhecida = (typeof UNIDADES_CONHECIDAS)[number];

export function normalizarUnidadeMedida(unMedida: string): string {
  return unMedida.toUpperCase().trim();
}

export function isUnidadeMedidaConhecida(
  unMedida: string,
): unMedida is UnidadeMedidaConhecida {
  const normalizada = normalizarUnidadeMedida(unMedida);
  return (UNIDADES_CONHECIDAS as readonly string[]).includes(normalizada);
}

export function isUnidadeMedidaCaixa(
  unMedida: string,
): unMedida is UnidadeMedidaCaixa {
  const normalizada = normalizarUnidadeMedida(unMedida);
  return (UNIDADES_CAIXA as readonly string[]).includes(normalizada);
}

export function isUnidadeMedidaBase(
  unMedida: string,
): unMedida is UnidadeMedidaBase {
  const normalizada = normalizarUnidadeMedida(unMedida);
  return (UNIDADES_BASE as readonly string[]).includes(normalizada);
}
