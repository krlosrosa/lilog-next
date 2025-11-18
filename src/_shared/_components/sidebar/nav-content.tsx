'use client';
import { CanWithCenter } from '@/_shared/providers/casl/CanWithCenter';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { itemsSideBar } from './itens-sideBar';
import { useUser } from '@/_shared/providers/UserContext';

export default function SideBarContent() {
  const { user } = useUser();

  return (
    <SidebarMenu>
      {itemsSideBar.map((item) => (
        <CanWithCenter
          key={item.title}
          recurso={item.recurso}
          acao="leitura"
          centro={user?.centerSelect}
        >
          {item.child && item.child.length > 0 ? (
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.child.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <a href={subItem.url}>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </CanWithCenter>
      ))}
    </SidebarMenu>
  );
}
