import { RoutingPickingMapItem } from '../../types/items';
import { processExcelFile } from './excelToJson';

export async function convertRouting(
  params: File,
): Promise<RoutingPickingMapItem[]> {
  if (!params) {
    return [];
  }
  const data: any[] = (await processExcelFile(params)) as any[];

  const convertedData = data.map((item: any) => ({
    empresa: String(item['Empresa'] ?? '').trim(),
    rota: String(item['Rota Gerada no Roteirizador'] ?? '').trim(),
    transportId: String(item['Nº transporte'] ?? '').trim(),
    placa: String(item['Identif.externo 1'] ?? '').trim(),
    remessa: String(item['Fornecimento'] ?? '')
      .trim()
      .replace(/^0+/, ''),
    sequencia: parseInt(item['Seqüência']) || 0,
    codCliente: String(item['Cliente'] ?? '')
      .trim()
      .replace(/^0+/, ''),
    nomeCliente: String(item['Nome'] ?? '').trim(),
    local: String(item['Local'] ?? '').trim(),
    bairro: String(item['Bairro'] ?? '').trim(),
    perfiRoterizado: String(item['Veículo Roteirizado'] ?? '').trim(),
    perfilUtilizado: String(item['Veículo Efetivo'] ?? '').trim(),
    transportadora: String(item['Nome do Transportador'] ?? '').trim(),
    tipoDeCarga: String(item['Tipo de Carga'] ?? '').trim(),
    infoAdicionaisI: String(item['Info Adicionais I'] ?? '').trim(),
    infoAdicionaisII: String(item['Info Adicionais II'] ?? '').trim(),
    prioridade: parseInt(item['Prioridade'] ?? '0'),
  }));

  return convertedData;
}
