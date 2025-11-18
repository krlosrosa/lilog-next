import { z } from 'zod';
import { criarConfiguracaoImpressaoBody } from '@/_services/api/schema/center/center.zod';

export type FormValues = z.infer<typeof criarConfiguracaoImpressaoBody>;

export type Empresa = 'DPA' | 'ITB' | 'LDB';

export interface OrdemOpenState {
  conferencia: boolean;
  fifo: boolean;
  paletes: boolean;
  picking: boolean;
  unidades: boolean;
}
