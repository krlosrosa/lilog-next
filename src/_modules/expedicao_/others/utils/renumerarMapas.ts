import { ImpressaoMapa } from "../types/items";

// Nova função utilitária: src/_modules/expedicao_/others/utils/renumerarMapas.ts
export function renumerarMapasPorTransporte(
  mapas: ImpressaoMapa[]
): ImpressaoMapa[] {
  // 1. Agrupar mapas por transporte
  const mapasPorTransporte = new Map<string, ImpressaoMapa[]>();
  
  mapas.forEach(mapa => {
    const transportId = mapa.transportId;
    if (!mapasPorTransporte.has(transportId)) {
      mapasPorTransporte.set(transportId, []);
    }
    mapasPorTransporte.get(transportId)!.push(mapa);
  });

  // 2. Para cada transporte, renumerar sequencialmente
  const mapasRenumerados: ImpressaoMapa[] = [];
  
  mapasPorTransporte.forEach((mapasDoTransporte, transportId) => {
    // Ordenar os mapas do transporte (manter ordem original ou ordenar por algum critério)
    const mapasOrdenados = [...mapasDoTransporte]
    
    /*.sort((a, b) => {
      // Ordenar por: processo, tipo, id (ou outro critério)
      if (a.processo !== b.processo) {
        return b.processo.localeCompare(a.processo);
      }
      if (a.tipo !== b.tipo) {
        return a.tipo.localeCompare(b.tipo);
      }
      return a.id.localeCompare(b.id);
    });*/

    const totalTransportes = mapasDoTransporte.filter(mapa => mapa.transportId === transportId).length;

    // Renumerar sequencialmente (1, 2, 3...)
    mapasOrdenados.forEach((mapa, index) => {
      const sequencia = index + 1;
      mapasRenumerados.push({
        ...mapa,
        sequenciaTransporte: totalTransportes,
        sequencia: sequencia, // Sequência começa em 1
      });
    });
  });

  // 3. Retornar mapas renumerados na ordem original (ou ordenados)
  return mapasRenumerados;
}