import { SelectOption } from '@/_shared/_types/selectOption';
import { Package, Snowflake, Milk } from 'lucide-react';

export const segmentos = [
  { value: 'TODOS', label: 'Todos', icon: Package },
  { value: 'SECA', label: 'Seco', icon: Package },
  { value: 'REFR', label: 'Refrigerado', icon: Snowflake },
] as const;
