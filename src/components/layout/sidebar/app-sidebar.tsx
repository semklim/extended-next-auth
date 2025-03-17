'use client';

import type { ComponentProps } from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/shadcn/sidebar';

import { sidebarData } from './sidebar-data';
import { NavGroup } from './ui/nav-group';

export default function AppSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="flex items-start justify-center p-1 pt-2">
        <Avatar>
          <AvatarImage src="/124599.jpeg" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((elProps) => (
          <NavGroup key={elProps.title} {...elProps} />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
