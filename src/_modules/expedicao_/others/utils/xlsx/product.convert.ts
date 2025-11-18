import { ProductsPickingMapItem } from '../../types/items';
import { processExcelFile } from './excelToJson';
import { parseNumberBr } from '../parseNumber';

export async function convertProducts(
  params: File,
): Promise<ProductsPickingMapItem[]> {
  if (!params) {
    return [];
  }
  const data: any[] = (await processExcelFile(params)) as any[];
  const convertedData = data.map((item: any) => ({
    codItem: String(item['Cod_SKU'] ?? '').trim(),
    descricao: String(item['Descricao_SKU'] ?? '').trim(),
    shelf: parseInt(item['Shelf_Life']) || 0,
    variavel: parseInt(item['Tipo_Peso']) || 0,
    pesoCaixa: parseNumberBr(item['Peso_Liq(cx)']),
    pesoUnidade: parseNumberBr(item['Peso_Liq(un)']),
    unPorCaixa: parseInt(item['Un_Cx']) || 0,
    cxPorPallet: parseInt(item['Cx_Pallet']) || 0,
    segmento: String(item['Linha'] ?? '').trim(),
    vermelho: parseNumberBr(item['Vermelho']),
    laranja: parseNumberBr(item['Laranja']),
    amarelo: parseNumberBr(item['Amarelo']),
    verde: parseNumberBr(item['Verde']),
    pickWay: parseInt(item['PickWay']) || 0,
    endereco: String(item['Endereço'] ?? '').trim(),
    empresa: String(item['Empresa'] ?? '').trim(),
  }));

  return convertedData;
}
