import { auth } from '@/auth';
import { fetchUser } from '@/_shared/utils/fetchMock';
import { redirect } from 'next/navigation';
import defineAbilityFor from '@/_shared/utils/defineAbility';
import { subject } from '@casl/ability';
import ModulesGrid from '@/_shared/_components/dashboard/modules-grid';
import UserInfoCard from '@/_shared/_components/dashboard/user-info-card';
import { Home as HomeIcon, Settings, Users, Building2 } from 'lucide-react';

const allModules = [
  {
    title: 'Produtividade',
    description: 'Funcionários e métricas',
    url: '/produtividade/funcionarios',
    icon: HomeIcon,
    recurso: 'produtividade',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    title: 'Centros',
    description: 'Gerenciar centros',
    url: '/center',
    icon: Building2,
    recurso: 'configuracoes',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    title: 'Usuários',
    description: 'Gerenciar usuários',
    url: '/users',
    icon: Users,
    recurso: 'pessoal',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950',
  },
  {
    title: 'Roles',
    description: 'Permissões e acessos',
    url: '/roles',
    icon: Settings,
    recurso: 'pessoal',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
  },
];

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const user = await fetchUser({
    id: session.user.id || '',
    name: session.user.name || '',
    roles: session.user.roles || [],
    empresa: session.user.empresa || null,
  });

  // Verifica permissões diretamente usando os dados do usuário
  const ability = defineAbilityFor(user.roles);
  const centro = user.centerSelect || '';

  const allowedModules = allModules.filter((module) => {
    const subjectToTest = centro
      ? subject(module.recurso, { centro })
      : module.recurso;
    return ability.can('leitura', subjectToTest);
  });

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao sistema de gestão
          </p>
        </div>

        <UserInfoCard
          name={user.name}
          id={user.id}
          centers={user.centers}
          centerSelect={user.centerSelect}
          roles={user.roles}
        />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Módulos Disponíveis</h2>
          <ModulesGrid modules={allowedModules} />
        </div>
      </div>
    </div>
  );
}
