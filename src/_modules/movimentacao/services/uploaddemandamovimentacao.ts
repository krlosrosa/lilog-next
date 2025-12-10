
import { processExcelFile } from "@/_modules/expedicao/others/utils/excelToJson";
import { GetMovimentacaoDto } from "@/_services/api/model";
import { CriarNovaMovimentacaoFormSchema } from "../hooks/criarMovimentacao";

export type DemandamovimentacaoInput = {

}

export async function uploadDemandamovimentacao(
  params: File,
  userId: string,
  centro: string,
): Promise<CriarNovaMovimentacaoFormSchema> {
  if (!params) {
    return [];
  }
  const data: any[] = (await processExcelFile(params)) as any[];

  const convertedData: CriarNovaMovimentacaoFormSchema = data.map((item: any) => ({
    idUsuario: userId,
    idCentro: centro,
    palete: String(item['SSCC'] ?? '').trim(),
    origem: String(item['Endereco'] ?? '').trim(),
    destino: String(item['Destino'] ?? '').trim(),
    prioridade: 10,
    status: 'pendente',
    dataCriacao: null,
    dataExecucao: null,
    sku: String(item['SKU'] ?? '').trim(),
    descricao: String(item['Descricao'] ?? '').trim(),
    lote: String(item['Lote'] ?? '').trim(),
    executadoPor: String(item['Operador'] ?? '').trim(),
  }));

  return convertedData;
}
