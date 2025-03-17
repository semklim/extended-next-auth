import { redirect } from 'next/navigation';

import SignOutButton from '@/components/auth/sign-out-button';
import { Header } from '@/components/layout/header/header';
import Tasks from '@/components/tasks-page';
import { getAllTasks } from '@/components/tasks-page/actions/getAll';
import { checkIsAuthenticated } from '@/libs/auth/helpers';
import { cn } from '@/libs/utils';

export default async function Home() {
  const isAuthenticated = await checkIsAuthenticated();
  if (!isAuthenticated) {
    redirect('/auth/sign-in');
  }

  const tasks = await getAllTasks();

  return (
    <div
      className={cn(
        'ml-auto w-full max-w-full p-2',
        'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
        'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
        'transition-[width] duration-200 ease-linear',
        'flex h-svh flex-col',
        'group-data-[scroll-locked=1]/body:h-full',
        'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
      )}
    >
      <Header>
        <SignOutButton />
      </Header>
      <main className="px-4 py-6 peer-[.header-fixed]/header:mt-16">
        <Tasks tasks={tasks} />
      </main>
    </div>
  );
}
