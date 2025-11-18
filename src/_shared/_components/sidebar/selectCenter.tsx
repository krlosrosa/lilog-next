'use client';

import { Building } from 'lucide-react';
import { useUser } from '@/_shared/providers/UserContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/_shared/_components/ui/sidebar';
import { useState, useEffect } from 'react';

export function CenterSelector() {
  const { user, handleSelectCenter } = useUser();
  const { state } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!user?.centers || user.centers.length === 0) return null;

  // Quando colapsado, mostra apenas o ícone com o centro atual
  if (state === 'collapsed') {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            title={user.centerSelect || 'Selecione um centro'}
            className="flex justify-center"
          ></SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // Quando expandido, mostra o select completo
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="w-full">
          <Select
            value={isMounted ? (user.centerSelect ?? '') : ''}
            onValueChange={handleSelectCenter}
          >
            <SelectTrigger className="h-8 w-full text-sm">
              <div className="flex items-center gap-2">
                <SelectValue placeholder="Selecione um centro" />
              </div>
            </SelectTrigger>

            <SelectContent>
              {user.centers.map((center) => (
                <SelectItem key={center} value={center} className="text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {center}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
