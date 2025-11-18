import { SelectOption } from '@/_shared/_types/selectOption';
import {
  GraduationCap,
  Package,
  Thermometer,
  UtensilsCrossed,
} from 'lucide-react';

export const motivosPausa = [
  { value: 'PAUSA_TERMICA', label: 'Pausa Térmica', icon: Thermometer },
  {
    value: 'HORARIO_REFEICAO',
    label: 'Horário de Refeição',
    icon: UtensilsCrossed,
  },
  {
    value: 'TREINAMENTO_FEEDBACK',
    label: 'Treinamento / Feedback',
    icon: GraduationCap,
  },
  { value: 'FALTA_PRODUTO', label: 'Falta de Produto', icon: Package },
] as const;
