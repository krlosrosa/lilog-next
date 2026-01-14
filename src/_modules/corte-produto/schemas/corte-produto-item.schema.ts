import z from "zod";

export const corteProdutoItemSchema = z.object({
  transporte: z.string().min(1, 'Transporte é obrigatório'),
  sku: z.string().min(1, 'SKU é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  lote: z.string().min(1, 'Lote é obrigatório'),
  caixas: z.number(),
  quantidade: z.number().optional(),
  segmento: z.string().min(1, 'Segmento é obrigatório'),
  tipo: z.string().optional(),
});