import { CreateProdutoDto } from '@/_services/api/model';
import * as XLSX from 'xlsx';

export async function convertFileToProdutos(
  file: File,
): Promise<CreateProdutoDto[]> {

  try {
    const data: any[] = (await processExcelFile(file)) as any[];

    const convertedData = data
      .map((item: any) => {
        return {
          codEan: String((item['CodEan'] ?? '')).trim() || '', // Remove zeros à esquerda
          codDum: String((item['CodDum'] ?? '')).trim() || '', // Remove zeros à esquerda
          sku: String((item['sku'] ?? '')).trim() || '', // Remove zeros à esquerda
          descricao: String((item['descricao'])).replace(/^0+/, '') || '', // Remove zeros à esquerda
          shelf: Math.floor(parseNumberBr(item['shelf'])) || 0, // Remove zeros à esquerda
          pesoLiquidoCaixa: String((item['pesoLiquidoCaixa'])).trim() || '', // Remove zeros à esquerda
          pesoLiquidoUnidade: String((item['pesoLiquidoUnidade'])).trim() || '', // Remove zeros à esquerda
          unPorCaixa: Math.floor(parseNumberBr(item['unPorCaixa'])) || 0, // Remove zeros à esquerda
          caixaPorPallet: Math.floor(parseNumberBr(item['caixaPorPallet'])) || 0, // Remove zeros à esquerda
          segmento: String((item['segmento'])).trim() || '', // Remove zeros à esquerda
          empresa: String((item['empresa'])).trim() || '',
          criadoEm: String((item['criadoEm'] ?? new Date().toISOString())).trim() || '',
          tipoPeso: String((item['tipoPeso'] ?? '')).trim() || '',
        };
      })
    return convertedData;
  } catch (error) {
    console.error('Error in convertFileToProdutos:', error);
    throw error;
  }
}

export function parseNumberBr(value: string | number | undefined): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return Number(value.replace(/\./g, ',').replace(',', '.'));
}

export async function processExcelFile(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          raw: false,
        }) as any[];

        return resolve(jsonData);
      } catch (error) {
        console.error(error);
        reject(new Error('Erro ao processar o arquivo Excel'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo'));
    };

    reader.readAsArrayBuffer(file);
  });
}
