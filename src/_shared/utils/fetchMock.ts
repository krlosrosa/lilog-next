import { getCentrosUnicos } from './getCentrosUnicos';
import { parsePermissoes } from './parsePermissions';

type PropsFetchUser = {
  roles: string[];
  id: string;
  name: string;
  empresa: 'DPA' | 'ITB' | 'LDB' | null;
};

export async function fetchUser({ id, name, roles, empresa }: PropsFetchUser) {
  // Simula delay de 1 segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const permissions = parsePermissoes(roles);
  const centers = getCentrosUnicos(permissions);
  const centerSelect = null;
  // Retorna usuário simulado
  return {
    id: id,
    name: name,
    roles: roles,
    centers: centers,
    permissions: permissions,
    centerSelect: centerSelect,
    empresa: empresa,
  };
}
