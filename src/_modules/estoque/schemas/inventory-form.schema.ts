import { z } from "zod";

export const TIPO_FILTRO = ["RUA", "CATEGORIA"] as const;
export type TipoFiltro = (typeof TIPO_FILTRO)[number];

export type InventoryFormValues = {
  nome: string;
  tipoFiltro: "" | TipoFiltro;
  arquivoContabil: File | null;
};

/**
 * Schema de validação do formulário de ordem de inventário.
 * Garante: escopo definido (Rua ou Categoria) e arquivo contábil anexado.
 */
export const inventoryFormSchema = z
  .object({
    nome: z.string().min(1, "Nome da ordem é obrigatório"),
    tipoFiltro: z
      .union([z.literal(""), z.enum(TIPO_FILTRO)])
      .refine((v) => v === "RUA" || v === "CATEGORIA", {
        message: "Selecione o escopo: Rua ou Categoria",
      }),
    arquivoContabil: z
      .instanceof(File)
      .nullable()
      .refine((file) => file !== null && file.size > 0, {
        message: "Arquivo contábil (CSV/XLSX) é obrigatório",
      }),
  });

export type InventoryFormSchema = z.infer<typeof inventoryFormSchema>;

export const TIPO_FILTRO_OPTIONS: { label: string; value: TipoFiltro }[] = [
  { label: "Por Rua", value: "RUA" },
  { label: "Por Categoria de produto", value: "CATEGORIA" },
];
