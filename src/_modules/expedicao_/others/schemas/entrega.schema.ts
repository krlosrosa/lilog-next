import z from 'zod';

export const entregaSchema = z.object({
  id: z.string().optional(),
  transportId: z.string().length(8, 'ID do transporte deve ter 10 caracteres'),
  remessa: z.string(),
  shipmentItem: z.string(),
  centro: z.string(),
  empresa: z.string(),
  nomeEmpresa: z.string(),
  placa: z.string(),
  codItem: z.string().length(9, 'Código do item deve ter 9 caracteres'),
  descricao: z.string(),
  lote: z.string(),
  quantidade: z.number({
    error: (issue) => {
      if (issue.code === 'invalid_type') {
        return 'Tipo invalido';
      }
    },
  }),
  unMedida: z.string(),
  dtFabricacao: z.date(),
  dtVencimento: z.date(),
  codCliente: z.string(),
  nomeCliente: z.string(),
  pesoBruto: z.number(),
  pesoLiquido: z.number(),
});

export type EntregaSchema = z.infer<typeof entregaSchema>;
