export function removerUltimaParte(permissao: string): string {
  const partes = permissao.split(':');
  partes.pop(); // remove a última parte
  return partes.join(':');
}
