import { CorteMercadoriaGetDto } from "@/_services/api/model";

/**
 * Agrupa cortes por transporteId
 * @param cortes - Array de cortes a serem agrupados
 * @returns Objeto onde cada chave é um transporteId e o valor é um array de cortes daquele transporte
 */
export function groupCortesPorTransporte(
  cortes: CorteMercadoriaGetDto[]
): Record<string, CorteMercadoriaGetDto[]> {
  const grouped: Record<string, CorteMercadoriaGetDto[]> = {};

  cortes.forEach((corte) => {
    const transporteId = corte.transporteId;
    
    if (!grouped[transporteId]) {
      grouped[transporteId] = [];
    }
    
    grouped[transporteId].push(corte);
  });

  return grouped;
}

