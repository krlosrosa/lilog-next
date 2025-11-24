'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { Permissao } from '../utils/parsePermissions';
import { redirect, usePathname } from 'next/navigation';
import { salvarCache } from '../utils/salvarCache';

// ... (interface User e UserContextType permanecem iguais) ...

export interface User {
  id: string;
  name: string;
  roles: string[];
  centers: string[];
  permissions: Permissao[];
  centerSelect: string | null;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  handleSelectCenter: (center: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  initialUser: User | null;
  children: ReactNode;
}

export function UserProvider({ initialUser, children }: UserProviderProps) {
  const pathName = usePathname();
  const [user, setUser] = useState<User | null>(initialUser);

  async function handleSelectCenter(center: string) {
    if (user) {
      setUser({ ...user, centerSelect: center });
      await salvarCache('centerId', center);
    }
  }

  // 1. Estado para controlar se já lemos o localStorage
  const [isHydrated, setIsHydrated] = useState(false);

  // Efeito 1: HIDRATAÇÃO (Leitura)
  // Roda APENAS UMA VEZ no cliente para ler o centro salvo.
  useEffect(() => {
    // Garantir que só rode no cliente
    if (typeof window !== 'undefined') {
      try {
        const storedCenterId = localStorage.getItem('centerId');

        // Verifica se o valor existe e não é "null" (string)
        if (storedCenterId && storedCenterId !== 'null') {
          const parsedCenterId = JSON.parse(storedCenterId);

          // Atualiza o estado 'user' com o centro salvo
          setUser((prevUser) =>
            prevUser ? { ...prevUser, centerSelect: parsedCenterId } : null,
          );
        }
      } catch (e) {
        console.error('Falha ao ler centerId do localStorage', e);
        localStorage.removeItem('centerId');
      }
    }
    // Marca como hidratado, tendo encontrado ou não
    setIsHydrated(true);
  }, []); // <-- Array vazio, roda só na montagem

  // Efeito 2: PERSISTÊNCIA (Escrita)
  // Roda sempre que 'user' ou 'isHydrated' mudar.
  useEffect(() => {
    // Só começa a persistir DEPOIS da hidratação inicial
    if (!isHydrated) {
      return;
    }

    if (user && user.centerSelect) {
      // Salva o centro selecionado
      localStorage.setItem('centerId', JSON.stringify(user.centerSelect));
      salvarCache('roles', JSON.stringify(user.centerSelect));
    } else if (user && !user.centerSelect) {
      // Se o usuário está logado mas sem centro (p.ex. foi des-selecionado),
      // removemos para forçar a seleção no próximo reload.
      localStorage.removeItem('centerId');
    } else if (!user) {
      // Se fez logout, limpa
      localStorage.removeItem('centerId');
    }
    salvarCache('roles', JSON.stringify(user?.roles));
  }, [user, isHydrated]);

  // Efeito 3: REDIRECIONAMENTO
  // Roda após a hidratação e quando o usuário ou rota mudar.
  useEffect(() => {
    // Só roda a lógica DEPOIS de tentar hidratar o estado
    if (!isHydrated) {
      return;
    }

    if (pathName !== '/selecionar-centro') {
      // Se não há usuário (deslogado), não faz nada
      if (!user) return;

      if (user.centers.length === 1) {
        setUser({ ...user, centerSelect: user.centers[0] });
        salvarCache('centerId', user.centers[0]);
      }
    }
  }, [user, pathName, isHydrated]); // <-- Depende do estado hidratado

  // Removemos a lógica de redirecionamento que rodava durante o render

  return (
    <UserContext.Provider value={{ user, setUser, handleSelectCenter }}>
      {children}
    </UserContext.Provider>
  );
}

// ... (hook useUser permanece igual) ...

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
}
