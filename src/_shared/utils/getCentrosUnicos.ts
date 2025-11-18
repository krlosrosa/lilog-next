import { Permissao } from './parsePermissions';

export function getCentrosUnicos(permissoes: Permissao[]): string[] {
  const centros = permissoes.map((p) => p.centro); // pega todos os centros
  return Array.from(new Set(centros)); // remove duplicatas
}
