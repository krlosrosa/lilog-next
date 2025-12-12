
import { processExcelFile } from "@/_modules/expedicao/others/utils/excelToJson";
import { GetMovimentacaoDto } from "@/_services/api/model";
import { CriarNovaMovimentacaoFormSchema } from "../hooks/criarMovimentacao";
import { ContagemLiteFormSchema } from "../hooks/contagem-lite/cadastrar-contagem";

export type DemandamovimentacaoInput = {

}

export async function uploadContagemLite(
  params: File,
  userId: string,
  centro: string,
  dataRef: string,
): Promise<ContagemLiteFormSchema> {
  if (!params) {
    return [];
  }
  const data: any[] = (await processExcelFile(params)) as any[];

  const convertedData: ContagemLiteFormSchema = data.map((item: any) => ({
    dataRef: new Date(dataRef).toISOString().split('T')[0],
    endereco: String(item['Endereco'] ?? '').trim(),
    sku: String(item['SKU'] ?? '').trim(),
    descricao: String(item['Descricao'] ?? '').trim(),
    dataValidade: item['Data Validade'] ? new Date(String(item['Data Validade'])).toISOString().split('T')[0] : null,
    lote: String(item['Lote'] ?? '').trim(),
    peso: item['Total_Peso'] ? String(item['Total_Peso']).trim() : null,
    caixas: item['Total_CXS'] ? Number(item['Total_CXS']) : null,
    qtdPalete: item['Qtde_Paletes'] ? Number(item['Qtde_Paletes']) : null,
    capacidadePalete: item['Capacidade'] ? Number(item['Capacidade']) : null,
    area: String(item['Area'] ?? '').trim(),
    centroId: centro,
    codigoBloqueio: String(item['CB'] ?? '').trim(),
    validado: false,
    adicionarPor: userId,
    contadoPor: null,
  }));

  return convertedData;
}
