import { ValidationSuccess } from './validateInputs';

// Imports organizados por etapa do pipeline
import { enriquecerItems } from './pipeline/1-enriquecerItems';
import { transformarQuantidadeEmUnidade } from './pipeline/2-transformarQuantidadeEmUnidade';

export type ProtocoloMapa = {
  id: number;
  transporteId: number;
  pesoLiquido: number;
  pesoBruto: number;
};

export async function gerarProtocoloMapa(
  input: ValidationSuccess,
): Promise<ProtocoloMapa[]> {
  const { shipments, products, routes } = input.data;

  // --- Etapa 1: Enriquecimento e Definições Básicas ---
  let itens = enriquecerItems(shipments, products, routes);
  itens = transformarQuantidadeEmUnidade(itens);

  // --- Etapa 2: Sumarização por Transporte ---
  const sumarizacaoPorTransporte = itens.reduce(
    (acc: Record<string, { pesoLiquido: number; pesoBruto: number }>, item) => {
      const transportId = item.transportId;

      if (!acc[transportId]) {
        acc[transportId] = {
          pesoLiquido: 0,
          pesoBruto: 0,
        };
      }

      acc[transportId].pesoLiquido += item.pesoLiquido || 0;
      acc[transportId].pesoBruto += item.pesoBruto || 0;

      return acc;
    },
    {},
  );

  // --- Etapa 3: Transformar em array de ProtocoloMapa ---
  const protocolos: ProtocoloMapa[] = Object.entries(sumarizacaoPorTransporte).map(
    ([transportId, totais], index) => ({
      id: index + 1,
      transporteId: Number(transportId) || 0,
      pesoLiquido: Number(totais.pesoLiquido.toFixed(2)),
      pesoBruto: Number(totais.pesoBruto.toFixed(2)),
    }),
  );

  return protocolos;
}