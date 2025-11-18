'use client';
import { Button } from '@/_shared/_components/ui/button';
import { useUser } from '@/_shared/providers/UserContext';
import { redirect, usePathname } from 'next/navigation';

export default function SelecionarCentroPage() {
  const { user, setUser } = useUser();
  function handleSelectCenter(center: string) {
    if (!user) return;
    setUser({
      ...user,
      centerSelect: center,
    });
    redirect('teste');
  }

  const pathName = usePathname();
  return (
    <div>
      {pathName}
      {user?.centerSelect}
      <Button onClick={() => handleSelectCenter('pavuna')}>Add Centro</Button>
    </div>
  );
}
