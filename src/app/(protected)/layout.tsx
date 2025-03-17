import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

import AppSidebar from '@/components/layout/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/shadcn/sidebar';
import { checkIsAuthenticated } from '@/libs/auth/helpers';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const cookieStore = cookies();
  const state = cookieStore.get('sidebar_state');
  const defaultOpen = state?.value === 'true';
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  }

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </SessionProvider>
  );
}
