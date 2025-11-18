export type Permissao = {
  recurso: string;
  acao: string;
  centro: string;
};

export function parsePermissoes(permissoes: string[]): Permissao[] {
  return permissoes
    .map((p) => p.trim())
    .filter(Boolean)
    .map((item) => {
      const [recurso, acao, centro] = item.split(':').map((s) => s.trim());
      return { recurso, acao, centro };
    });
}
