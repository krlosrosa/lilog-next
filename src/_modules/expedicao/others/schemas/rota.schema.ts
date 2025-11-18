import z from 'zod';

export const rotaSchema = z.object({
  empresa: z.string(),
  rota: z.string(),
  transportId: z.string(),
  placa: z.string(),
  remessa: z.string(),
  sequencia: z.number(),
  codCliente: z.string(),
  nomeCliente: z.string(),
  local: z.string(),
  bairro: z.string(),
  perfiRoterizado: z.string(),
  perfilUtilizado: z.string(),
  transportadora: z.string(),
  tipoDeCarga: z.string(),
  prioridade: z.number().optional(),
  infoAdicionaisI: z.string().optional(),
  infoAdicionaisII: z.string().optional(),
});
export type RotaSchema = z.infer<typeof rotaSchema>;
