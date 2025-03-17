'use client';

import TasksProvider from './context/tasks-context';
import type { Task } from './data/schema';
import { columns } from './task-columns';
import { DataTable } from './ui/data-table';
import { TasksDialogs } from './ui/tasks-dialogs';
import { TasksPrimaryButtons } from './ui/tasks-primary-buttons';

interface TasksPageProps {
  tasks: Task[];
}

export default function TasksPage({ tasks }: TasksPageProps) {
  return (
    <TasksProvider>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
        <TasksPrimaryButtons />
      </div>
      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable data={tasks} columns={columns} searchBy="title" />
      </div>
      <TasksDialogs />
    </TasksProvider>
  );
}
