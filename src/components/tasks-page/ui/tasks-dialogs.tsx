/* eslint-disable no-underscore-dangle */

'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { ConfirmDialog } from '@/components/confirm-dialog';

import { deleteTask } from '../actions/delete';
import { useTasks } from '../context/tasks-context';
import { TasksImportDialog } from './tasks-import-dialog';
import { TasksMutateDrawer } from './tasks-mutate-drawer';

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks();
  const router = useRouter();

  return (
    <>
      <TasksMutateDrawer
        key="task-create"
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <TasksImportDialog
        key="tasks-import"
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            handleConfirm={async () => {
              setOpen(null);
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);

              await toast.promise(deleteTask(currentRow.id), {
                loading: `Deleting ${currentRow.title}`,
                success: `Deleted ${currentRow.title}`,
                error: (error: any) => error.message,
              });

              router.refresh();
            }}
            className="max-w-md"
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
            cancelBtnText="Cancel"
          />
        </>
      )}
    </>
  );
}
