// --- Mapeamentos para manter o Layout ---

import {
  CheckSquare,
  Clock,
  GraduationCap,
  HelpCircle,
  Moon,
  Package,
  Pause,
  Snowflake,
  Sun,
  Thermometer,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';

// Mapeamento para os Processos (baseado no seu layout mock)
export const processosMap: Record<
  string,
  { label: string; icon: React.ElementType; className: string }
> = {
  SEPARACAO: {
    label: 'Separação',
    icon: Package,
    className:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  },
  CONFERENCIA: {
    label: 'Conferência',
    icon: CheckSquare,
    className:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
  },
  CARREGAMENTO: {
    label: 'Carregamento',
    icon: Truck,
    className:
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  },
};
export const defaultProcesso = {
  label: 'Processo',
  icon: HelpCircle,
  className:
    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800',
};

// Mapeamento para Turnos (baseado no seu mock)
export const turnosMap: Record<
  string,
  { label: string; icon: React.ElementType }
> = {
  MANHA: { label: 'Manhã', icon: Sun },
  INTERMEDIARIO: { label: 'Intermediario', icon: Clock },
  TARDE: { label: 'Tarde', icon: Sun },
  NOITE: { label: 'Noite', icon: Moon },
};
export const defaultTurno = { label: 'Turno', icon: Clock };

// Mapeamento para Segmentos (baseado no seu mock)
// O DTO diz que segmento é 'string', então vamos mapear os valores de texto conhecidos
export const segmentosMap: Record<
  string,
  { label: string; icon: React.ElementType }
> = {
  REFRIGERADO: { label: 'Refrigerado', icon: Snowflake },
  SECO: { label: 'Seco', icon: Package },
};
export const defaultSegmento = { label: 'Segmento', icon: Package };

// Mapeamento para Motivos (baseado no seu mock)
export const motivosMap: Record<
  string,
  { label: string; icon: React.ElementType }
> = {
  PAUSA_TERMICA: { label: 'Pausa Térmica', icon: Thermometer },
  HORARIO_REFEICAO: { label: 'Horário de Refeição', icon: UtensilsCrossed },
  TREINAMENTO_FEEDBACK: {
    label: 'Treinamento / Feedback',
    icon: GraduationCap,
  },
};
export const defaultMotivo = { label: 'Motivo', icon: Pause };

// --- Função Helper ---
export const formatarData = (isoString: string) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};
