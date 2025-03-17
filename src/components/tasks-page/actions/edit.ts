'use server';

/* eslint-disable no-param-reassign */

import { auth } from '@/libs/auth/authConfig';

import type { TaskDataForm } from '../ui/tasks-mutate-drawer';

export const editTask = async (task: TaskDataForm, taskId: string) => {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      throw new Error('No access token found');
    }

    console.log('Edit Task ID:', taskId);

    return task;
  } catch (error: any) {
    // Log the error for debugging
    if (error) {
      console.error('Response data:', error);
    }

    throw new Error(error.message);
  }
};
