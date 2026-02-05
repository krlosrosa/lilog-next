import { z } from "zod";

export type ProdutoFormValues = {
  codDum: string;
  codEan: string;
  sku: string;
  descricao: string;
  tipoPeso: "" | "PVAR" | "PPAR";
  shelf: number;
  pesoLiquidoCaixa: string;
  pesoLiquidoUnidade: string;
  unPorCaixa: number;
  caixaPorPallet: number;
  segmento: "" | "SECO" | "REFR";
  empresa: "" | "LDB" | "ITB" | "DPA";
};

/**
 * Schema de validação do formulário de produto.
 * Baseado no CreateProdutoDto da API.
 */
export const produtoFormSchema = z.object({
  codDum: z.string().min(1, "Código DUM é obrigatório"),
  codEan: z.string().min(1, "Código EAN é obrigatório"),
  sku: z.string().min(1, "SKU é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  shelf: z.coerce.number().min(0, "Shelf deve ser um número válido"),
  pesoLiquidoCaixa: z.string().min(1, "Peso líquido da caixa é obrigatório"),
  pesoLiquidoUnidade: z.string().min(1, "Peso líquido da unidade é obrigatório"),
  unPorCaixa: z.coerce.number().min(1, "Unidades por caixa deve ser maior que 0"),
  caixaPorPallet: z.coerce.number().min(1, "Caixas por pallet deve ser maior que 0"),
  segmento: z
    .union([z.literal(""), z.enum(["SECO", "REFR"])])
    .refine((val) => val !== "", { message: "Segmento deve ser SEC ou REF" }),
  empresa: z
    .union([z.literal(""), z.enum(["LDB", "ITB", "DPA"])])
    .refine((val) => val !== "", { message: "Empresa deve ser LDB, ITB ou DPA" }),
  tipoPeso: z.union([z.literal(""), z.enum(["PVAR", "PPAR"])])
    .refine((val) => val !== "", { message: "Tipo de peso deve ser PVAR ou PPAR" }),
}) satisfies z.ZodType<ProdutoFormValues>;

export const SEGMENTO_OPTIONS = [
  { label: "SEC", value: "SECO" },
  { label: "REF", value: "REFR" },
] as const;

export const EMPRESA_OPTIONS = [
  { label: "LDB", value: "LDB" },
  { label: "ITB", value: "ITB" },
  { label: "DPA", value: "DPA" },
] as const;

export const TIPO_PESO_OPTIONS = [
  { label: "PVAR", value: "PVAR" },
  { label: "PPAR", value: "PPAR" },
] as const;
