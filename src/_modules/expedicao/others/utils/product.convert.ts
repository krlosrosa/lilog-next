import { ProductsPickingMapItem } from '../types/items';
import { processExcelFile } from './excelToJson';
import { parseNumberBr } from './parseNumber'; // Assumindo que esta é a função que criamos

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

    // --- AJUSTE AQUI ---
    // Usamos parseNumberBr para ler o número corretamente (ex: "1.500" -> 1500)
    // e Math.floor para garantir que seja um inteiro.
    shelf: Math.floor(parseNumberBr(item['Shelf_Life'])) || 0,
    variavel: Math.floor(parseNumberBr(item['Tipo_Peso'])) || 0,
    // ---
    
    pesoCaixa: parseNumberBr(item['Peso_Liq(cx)']),
    pesoUnidade: parseNumberBr(item['Peso_Liq(un)']),
    
    // --- AJUSTE AQUI ---
    unPorCaixa: Math.floor(parseNumberBr(item['Un_Cx'])) || 0,
    cxPorPallet: Math.floor(parseNumberBr(item['Cx_Pallet'])) || 0,
    // ---

    segmento: String(item['Linha'] ?? '').trim(),
    vermelho: parseNumberBr(item['Vermelho']),
    laranja: parseNumberBr(item['Laranja']),
    amarelo: parseNumberBr(item['Amarelo']),
    verde: parseNumberBr(item['Verde']),
    
    // --- AJUSTE AQUI ---
    pickWay: Math.floor(parseNumberBr(item['PickWay'])) || 0,
    // ---
    
    endereco: String(item['Endereço'] ?? '').trim(),
    empresa: String(item['Empresa'] ?? '').trim(),
  }));

  return convertedData;
}