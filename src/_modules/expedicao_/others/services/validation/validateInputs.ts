import { ZodSchema } from 'zod'; // Importar ZodError e ZodSchema
import {
  ErrorField,
  ErrorFiles,
  ProdutoNaoEncontrado,
} from '../../types/uploadErro';
import { entregaSchema } from '../../schemas/entrega.schema';
import { produtoSchema } from '../../schemas/product.schema';
import { rotaSchema } from '../../schemas/rota.schema';
import {
  ProductsPickingMapItem,
  RoutingPickingMapItem,
  ShipmentPickingMapItem,
} from '../../types/items';
import { convertShipment } from '../../utils/xlsx/remessas.convert';
import { convertProducts } from '../../utils/xlsx/product.convert';
import { convertRouting } from '../../utils/xlsx/rotas.convert';

export interface FilesState {
  shipments: File | null;
  products: File | null;
  routes?: File | null;
}

// --- Constantes ---

// Mapeia códigos de erro do Zod para mensagens amigáveis
const ZOD_ERROR_MAP = {
  too_big: 'número de caracteres excedido',
  invalid_type: 'tipo inválido',
  required: 'campo obrigatório',
  min: 'valor mínimo',
  max: 'valor máximo',
  too_small: 'valor mínimo',
} as const;

type ZodErrorMapKey = keyof typeof ZOD_ERROR_MAP;

// Offset para linhas do Excel (Linha 1 = Cabeçalho, Linha 2 = Dados 1, que é index 0 no array)
const LINHA_OFFSET_XLSX = 2;

type NomeArquivo = 'remessas' | 'produtos' | 'rotas';

// --- Funções Auxiliares (Helpers) ---

/**
 * Converte os arquivos File (XLSX) para arrays de objetos JS.
 */
async function converterArquivos(input: FilesState) {
  const [shipments, products, routes] = await Promise.all([
    input.shipments ? convertShipment(input.shipments) : Promise.resolve([]),
    input.products ? convertProducts(input.products) : Promise.resolve([]),
    input.routes ? convertRouting(input.routes) : Promise.resolve([]),
  ]);

  // A checagem original 'if (!shipments || ...)' foi removida
  // pois Promise.resolve([]) garante que sempre teremos um array.
  // Lançar um erro aqui seria "dead code".

  return { shipments, products, routes };
}

/**
 * Valida um array de dados contra um schema Zod e formata os erros.
 */
function validarSchema(
  data: unknown[],
  schema: ZodSchema,
  arquivo: NomeArquivo,
): ErrorField[] {
  const result = schema.array().safeParse(data);

  if (result.success) {
    return []; // Sem erros
  }

  return result.error.issues.map((issue): ErrorField => {
    const codigo =
      issue.code in ZOD_ERROR_MAP
        ? ZOD_ERROR_MAP[issue.code as ZodErrorMapKey]
        : issue.code; // Fallback para o código original

    return {
      arquivo,
      message: issue.message,
      codigo,
      linha: (issue.path[0] as number) + LINHA_OFFSET_XLSX,
      campo: issue.path[1] as string,
    };
  });
}

/**
 * Valida a regra de negócio: todo item em 'shipments' deve existir em 'products'.
 * Retorna uma lista única de produtos não encontrados.
 */
function validarProdutosExistem(
  shipments: ShipmentPickingMapItem[],
  products: { codItem: string }[], // Só precisamos do codItem dos produtos
): ProdutoNaoEncontrado[] {
  const productCodes = new Set(products.map((p) => p.codItem));
  const produtosNaoEncontradosMap = new Map<string, ProdutoNaoEncontrado>();

  for (const shipment of shipments) {
    // Se o produto não existe E ainda não foi reportado
    if (
      !productCodes.has(shipment.codItem) &&
      !produtosNaoEncontradosMap.has(shipment.codItem)
    ) {
      produtosNaoEncontradosMap.set(shipment.codItem, {
        id: shipment.codItem,
        descricao: shipment.descricao,
      });
    }
  }

  return Array.from(produtosNaoEncontradosMap.values());
}

function extrairTransportesUnicos(
  shipments: ShipmentPickingMapItem[],
): string[] {
  // !!! ATENÇÃO: Assumindo que o campo de transporte em 'ShipmentPickingMapItem'
  // !!! se chama 'codTransporte'.
  // !!! Se o nome for outro (ex: 'transporteId'), troque 'item.codTransporte' abaixo.

  const transportesSet = new Set<string>();

  for (const item of shipments) {
    if (item.transportId) {
      transportesSet.add(item.transportId);
    }
  }

  return Array.from(transportesSet);
}

export interface ValidationSuccess {
  error: false;
  data: {
    shipments: ShipmentPickingMapItem[];
    products: ProductsPickingMapItem[];
    routes: RoutingPickingMapItem[];
    transportesUnicos: string[]; // <<< CAMPO ADICIONADO
  };
}

export interface ValidationFailure extends ErrorFiles {
  error: true;
}

export type ValidationResult = ValidationSuccess | ValidationFailure;

// --- Função Principal (Orquestradora) ---

export async function ValidarInputs(
  input: FilesState,
): Promise<ValidationResult> {
  // 1. CONVERTER
  // Responsabilidade: Transformar arquivos XLSX em arrays de JS.
  const { shipments, products, routes } = await converterArquivos(input);

  // 2. VALIDAR ESQUEMAS (Schema Validation)
  // Responsabilidade: Garantir que a estrutura de cada arquivo está correta.
  const errors: ErrorField[] = [
    ...validarSchema(shipments, entregaSchema, 'remessas'),
    ...validarSchema(products, produtoSchema, 'produtos'),
    ...validarSchema(routes, rotaSchema, 'rotas'),
  ];

  // 3. VALIDAR REGRAS DE NEGÓCIO (Business Logic)
  // Responsabilidade: Garantir a consistência *entre* os arquivos.
  const produtosNaoEncontrados = validarProdutosExistem(shipments, products);

  // 4. COMPILAR RESULTADO
  const hasSchemaErrors = errors.length > 0;
  const hasMissingProducts = produtosNaoEncontrados.length > 0;

  if (hasSchemaErrors || hasMissingProducts) {
    // Caso de FALHA: Retorna os erros
    return {
      error: true,
      errors,
      produtosNaoEncontrados,
    };
  }

  const transportesUnicos = extrairTransportesUnicos(shipments);

  return {
    error: false,
    data: {
      shipments,
      products,
      routes,
      transportesUnicos,
    },
  };
}
