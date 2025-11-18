import { CheckSquare, Package, Truck } from 'lucide-react';

export const processos = [
  { value: 'SEPARACAO', label: 'Separação', icon: Package },
  { value: 'CONFERENCIA', label: 'Conferência', icon: CheckSquare },
  { value: 'CARREGAMENTO', label: 'Carregamento', icon: Truck },
] as const;
