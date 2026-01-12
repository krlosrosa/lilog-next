import { z } from 'zod';

const empresasValidas = ['LACTALIS', 'ITAMBE', 'DPA'];
const categoriasValidas = ['SECA', 'REFR', 'QUEIJO'];

export const produtoSchema = z.object({
  codItem: z.string().length(9, 'Código do item deve ter 9 caracteres'),
  descricao: z.string(),
  shelf: z.number().min(6, 'Shelf deve ser maior que 6'),
  variavel: z.number(),
  pesoCaixa: z.number(),
  pesoUnidade: z.number(),
  unPorCaixa: z.number().min(1, 'Unidades por caixa deve ser maior que 0'),
  cxPorPallet: z.number().min(1, 'Caixas por pallet deve ser maior que 0'),
  segmento: z
    .string()
    .refine((value) => categoriasValidas.includes(value), {
      message: 'Categoria deve ser SECO, REFR ou QUEIJO',
    }),
  vermelho: z.number(),
  laranja: z.number(),
  amarelo: z.number(),
  verde: z.number(),
  pickWay: z.number(),
  endereco: z.string(),
  empresa: z
    .string()
    .refine((value) => empresasValidas.includes(value), {
      message: 'Empresa deve ser LACTALIS, ITAMBE ou DPA',
    }),
});

export type ProdutoSchema = z.infer<typeof produtoSchema>;
