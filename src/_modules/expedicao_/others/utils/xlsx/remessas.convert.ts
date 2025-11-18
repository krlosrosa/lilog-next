import { ShipmentPickingMapItem } from '../../types/items';
import { processExcelFile } from './excelToJson';

export async function convertShipment(
  params: File,
): Promise<ShipmentPickingMapItem[]> {
  if (!params) {
    return [];
  }
  const data: any[] = (await processExcelFile(params)) as any[];
  const convertedData = data.map((item: any) => ({
    transportId: String(item['Nº transporte(DT)'] ?? '')
      .trim()
      .replace(/^0+/, ''),
    remessa: String(item['Remessa'] ?? '')
      .trim()
      .replace(/^0+/, ''),
    shipmentItem: String(item['Nº item remessa'] ?? '').trim(),
    centro: String(item['Centro'] ?? '').trim(),
    empresa: String(item['Empresa'] ?? '').trim(),
    nomeEmpresa: String(item['Nome Empresa'] ?? '').trim(),
    placa: String(item['Placa'] ?? '').trim(),
    codItem: String(item['Cód. Item'] ?? '').trim(),
    descricao: String(item['Descrição do produto'] ?? '').trim(),
    lote: String(item['Lote'] ?? '').trim(),
    quantidade: parseFloat(item['Total(Unid.Vda.)']),
    unMedida: String(item['Unid.Armaz.'] ?? '').trim(),
    dtFabricacao: new Date(item['Dt.Fabricação']),
    dtVencimento: new Date(item['Dt.Vencimento']),
    codCliente: String(item['Cód. Cliente'] ?? '')
      .trim()
      .replace(/^0+/, ''),
    nomeCliente: String(item['Nome Cliente'] ?? '').trim(),
    pesoBruto: parseFloat(item['Peso Bruto']),
    pesoLiquido: parseFloat(item['Peso Líquido']),
  }));
  return convertedData;
}
