import * as XLSX from 'xlsx';

export async function convertXlsxToArrayUser(
  params: File,
): Promise<UserInput[]> {
  const file = await params.arrayBuffer();
  const workbook = XLSX.read(file, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  const convertedData = data.map((item: any) => ({
    id: String(item['id'] ?? '').trim(),
    name: String(item['nome'] ?? '').trim(),
    primeiroNome: String(item['primeiro_nome'] ?? '').trim(),
    ultimoNome: String(item['ultimo_nome'] ?? '').trim(),
    credencial: String(item['senha_inicial'] ?? '').trim(),
    role: String(item['permissao'] ?? '').trim(),
    roles: String(item['roles'] ?? '').trim(),
    processo: String(item['processo'] ?? '').trim(),
    turno: String(item['turno'] ?? '').trim(),
    empresa: String(item['empresa'] ?? '').trim(),
  }));

  return Promise.resolve(convertedData);
}

export type UserInput = {
  id: string;
  name: string;
  primeiroNome?: string;
  ultimoNome?: string;
  credencial?: string;
  processo: string;
  role?: string;
  turno: string;
  empresa: string;
  roles?: string;
};
