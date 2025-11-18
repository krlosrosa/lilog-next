'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/_shared/_components/ui/sidebar';
import { NavUser } from './nav-user';
import { CenterSelector } from './selectCenter';
import SideBarContent from './nav-content';
import { Truck } from 'lucide-react';
import { useUser } from '@/_shared/providers/UserContext';

// Menu items.

export function AppSidebar() {
  const { user } = useUser();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg md:hidden">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground hidden aspect-square size-8 items-center justify-center rounded-lg md:flex">
                  <SidebarTrigger className="text-sidebar-primary-foreground" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Lilog</span>
                  <span className="truncate text-xs">Soluções logisticas</span>
                </div>
                <Truck className="hidden md:block" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SideBarContent />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <CenterSelector />
        <NavUser user={{ name: user?.name, id: user?.id }} />
      </SidebarFooter>
    </Sidebar>
  );
}
