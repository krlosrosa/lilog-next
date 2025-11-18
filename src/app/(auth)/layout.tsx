import { AppSidebar } from '@/_shared/_components/sidebar/siderBar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/_shared/_components/ui/sidebar';
import { AbilityProvider } from '@/_shared/providers/casl/caslProvider';
import QueryProviderReact from '@/_shared/providers/query/QueryProvider';
import { UserProvider } from '@/_shared/providers/UserContext';
import { fetchUser } from '@/_shared/utils/fetchMock';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth(); // Agora 'session' já tem .id, .roles, etc.
  if (!session) {
    redirect('login');
  }

  // NÃO PRECISA MAIS DO FETCH!
  // const res = await fetch(...)
  // const resuser = await res.json()

  // Você pode precisar ajustar o 'fetchUser' (mock) ou usá-lo
  // para pegar os 'centers', que parecem faltar na sessão.
  const user = await fetchUser({
    id: session.user.id,
    name: session.user.name as string,
    roles: session.user.roles as string[],
    empresa: session.user.empresa as 'DPA' | 'ITB' | 'LDB' | null,
    // 'centers' ainda precisa vir de algum lugar
  });

  if (!user) {
    // ou !session.user.id
    redirect('login');
  }

  return (
    <UserProvider initialUser={user}>
      <AbilityProvider user={user}>
        <QueryProviderReact>
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full">{children}</div>
          </SidebarProvider>
        </QueryProviderReact>
      </AbilityProvider>
    </UserProvider>
  );
}
