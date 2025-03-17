'use server';

import { auth } from '@/libs/auth/authConfig';

import { tasks } from '../data/tasks';

export const getSoldierById = async (id: string) => {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      throw new Error('No access token found');
    }

    const task = tasks.find((el) => el.id === id);

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  } catch (error: any) {
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }

    return undefined;
  }
};
