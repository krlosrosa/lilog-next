export function filtrarPorParte(lista: string[], parte: string): string[] {
  return lista.filter((item) => item.split(':').includes(parte));
}
