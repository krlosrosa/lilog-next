import { PaleteCreateDataDto, PaleteCreateDataDtoTipoProcesso } from "@/_services/api/model";
import { ImpressaoMapa } from "../types/items";

export function parseCadastrarPalete(mapasCombinados: ImpressaoMapa[]): PaleteCreateDataDto[] {
  return mapasCombinados?.map((palete) => {
    const { itens, ...rest } = palete;
    return {
      ...rest,
      id: palete.paleteId,
      transporteId: palete.transportId,
      quantidadeCaixas: parseInt(palete.caixas.toFixed(0)),
      quantidadeUnidades: parseInt(palete.unidades.toFixed(0)),
      quantidadePaletes: parseInt(palete.paletes.toFixed(0)),
      enderecoVisitado: parseInt(palete.linhasVisitadas.toFixed(0)),
      tipoProcesso: palete.processo as PaleteCreateDataDtoTipoProcesso,
      totalCaixas: parseInt(palete.totalCaixas.toFixed(0)),
      pesoLiquido: parseFloat(palete.pesoLiquido.toFixed(2)),
    };
  });
}