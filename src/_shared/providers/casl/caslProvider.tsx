'use client';
import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import {
  AbilityBuilder,
  AnyMongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { parsePermissoes } from '../../utils/parsePermissions';
import defineAbilityFor from '@/_shared/utils/defineAbility';

type ProviderAbility = {
  children: React.ReactNode;
  user: User;
};

export interface User {
  id: string;
  name: string;
  roles: string[];
  // adicione outros campos que precisar
}

// 1. Crie o Contexto do React para a sua 'ability'
export const AbilityContext = createContext<AnyMongoAbility>(undefined!);
export const Can = createContextualCan(AbilityContext.Consumer);

export function AbilityProvider({ children, user }: ProviderAbility) {
  const ability = defineAbilityFor(user.roles);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}
