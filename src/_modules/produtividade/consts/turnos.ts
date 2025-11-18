import { SelectOption } from '@/_shared/_types/selectOption';
import { Sun, Sunset, Moon, Clock, User } from 'lucide-react';

export const turnos = [
  { value: 'MANHA', label: 'Manhã', icon: Sun },
  { value: 'TARDE', label: 'Tarde', icon: Sunset },
  { value: 'NOITE', label: 'Noite', icon: Moon },
  { value: 'INTERMEDIARIO', label: 'Intermediario', icon: Clock },
  { value: 'ADMINISTRATIVO', label: 'Administrativo', icon: User },
] as const;
