import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Simula um pequeno delay para mostrar o loading
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  redirect('/home');
}

// Componente de Loading (opcional)
export function HomeLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}