import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/shadcn/sidebar';

import { SidebarMenuCollapsible } from './sidebar-collapsible';
import { SidebarMenuCollapsedDropdown } from './sidebar-menu-collapsed-dropdown';
import { SidebarMenuLink } from './sidebar-menu-link';

export function NavGroup({ title, items }: NavGroup) {
  const { state } = useSidebar();
  const href = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items)
            return <SidebarMenuLink key={key} item={item} href={href} />;

          if (state === 'collapsed')
            return (
              <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
            );

          return <SidebarMenuCollapsible key={key} item={item} href={href} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
