import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { parsePermissoes } from './parsePermissions';

export default function defineAbilityFor(roles: string[]) {
  const { can, cannot, rules } = new AbilityBuilder(createMongoAbility);

  const permissions = parsePermissoes(roles);

  permissions.forEach((permission) => {
    // Regra especial para manager com ação 'all'
    if (permission.recurso === 'manager' && permission.acao === 'all') {
      can('manage', 'all', { centro: permission.centro });
    } else if (permission.recurso === 'gerente') {
      can('gerente', 'all', { centro: permission.centro });
      can('admin', 'all', { centro: permission.centro });
      can('operador', 'all', { centro: permission.centro });
      can('leitura', 'all', { centro: permission.centro });
    } else if (permission.recurso === 'admin') {
      can('admin', permission.acao, { centro: permission.centro });
      can('operador', permission.acao, { centro: permission.centro });
      can('leitura', permission.acao, { centro: permission.centro });
    } else {
      can(permission.recurso, permission.acao, { centro: permission.centro });
    }
  });

  return createMongoAbility(rules);
}
