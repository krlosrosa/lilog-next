import { ShipmentPickingMapItem } from '../types/items';
import { processExcelFile } from './excelToJson';

// /utils/parseBrazilianNumber.ts
// Converte "1.150,20" para 1150.2
export function parseBrazilianNumber(numStr: any): number {
  const str = String(numStr ?? '0').trim();
  if (!str) return 0;

  // 1. Remove pontos de milhar
  const withoutThousands = str.replaceAll('.', '');
  // 2. Substitui vírgula decimal por ponto
  const parsableStr = withoutThousands.replace(',', '.');
  
  const value = parseFloat(parsableStr);
  return isNaN(value) ? 0 : value;
}

// /utils/parseUSNumber.ts (ou parseSAPNumber)
// Converte "300,000.50" para 300000.50
export function parseUSNumber(numStr: any): number {
  const str = String(numStr ?? '0').trim();
  if (!str) return 0;

  // 1. Apenas remove as vírgulas (separador de milhar)
  // "300,000" -> "300000"
  // "300" -> "300"
  const parsableStr = str.replaceAll(',', ''); 
  
  const value = parseFloat(parsableStr);
  return isNaN(value) ? 0 : value;
}

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
    quantidade: parseFloat(item['Total(Unid.Vda.)']), // Verifique se este também não precisa da conversão
    unMedida: String(item['Unid.Armaz.'] ?? '').trim(),
    dtFabricacao: new Date(item['Dt.Fabricação']),
    dtVencimento: new Date(item['Dt.Vencimento']),
    codCliente: String(item['Cód. Cliente'] ?? '')
      .trim()
      .replace(/^0+/, ''),
    nomeCliente: String(item['Nome Cliente'] ?? '').trim(),
    
    // --- AJUSTE AQUI ---
    pesoBruto: parseUSNumber(item['Peso Bruto']),
    pesoLiquido: parseUSNumber(item['Peso Líquido']),
    // --- FIM DO AJUSTE ---
  }));
  return convertedData;
}