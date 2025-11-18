import { cookies } from 'next/headers';
import defineAbilityFor from './defineAbility';
import { subject } from '@casl/ability';

/**
 * Verifica a permissão do usuário e retorna o resultado da verificação.
 *
 * @param action Ação a verificar (ex: "manage", "ver", "editar")
 * @param resource Recurso alvo (ex: "estoque", "all")
 * @param data Dados adicionais (ex: { centro: "pavuna" })
 * @returns Objeto com hasPermission (boolean) e ability (Ability instance)
 */
export async function checkPermission(
  action: string,
  resource: string,
  data: Record<string, any> = {},
) {
  const cookieStore = await cookies();
  const roles = cookieStore.get('roles');
  const centerId = cookieStore.get('centerId');

  if (!roles) {
    return {
      hasPermission: false,
      ability: null,
    };
  }

  const centro = centerId ? (centerId.value as string) : '';
  const ability = defineAbilityFor(JSON.parse(roles.value));

  const can = ability.can(action, subject(resource, { centro, ...data }));

  return {
    hasPermission: can,
    ability: can ? ability : null,
  };
}
