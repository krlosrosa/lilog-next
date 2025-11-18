/**
 * Converte uma string separada por vírgulas em um array e adiciona a filial ao final de cada item.
 *
 * @param input - Exemplo: "admin:estoque,admin:expedicao"
 * @param filial - Exemplo: "pavuna"
 * @returns Exemplo: ["admin:estoque:pavuna", "admin:expedicao:pavuna"]
 */
export function appendFilialToPermissions(
  filial: string,
  input?: string,
): string[] {
  if (!input) return [];
  return input
    .split(',') // separa por vírgula
    .map((item) => item.trim()) // remove espaços em branco
    .filter((item) => item.length > 0) // evita strings vazias
    .map((item) => `${item}:${filial}`); // adiciona a filial no final
}
