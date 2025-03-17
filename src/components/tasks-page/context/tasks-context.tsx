'use client';

import React, { createContext, useMemo, useState } from 'react';

import useDialogState from '@/hooks/use-dialog-state';

import type { Task } from '../data/schema';

type DataDialogType = 'create' | 'update' | 'delete' | 'import';

interface TasksContextType {
  open: DataDialogType | null;
  setOpen: (str: DataDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
}

const TasksContext = createContext<TasksContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function TasksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DataDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Task | null>(null);

  const contextValue = useMemo(
    () => ({ open, setOpen, currentRow, setCurrentRow }),
    [open, currentRow, setOpen, setCurrentRow]
  );

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error('useTasks has to be used within <TasksProvider>');
  }

  return tasksContext;
};
