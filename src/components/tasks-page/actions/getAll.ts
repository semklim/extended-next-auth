'use server';

import { auth } from '@/libs/auth/authConfig';

import { tasks } from '../data/tasks';

export const getAllTasks = async () => {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      throw new Error('No access token found');
    }

    return tasks;
  } catch (error: any) {
    // Log the error for debugging
    if (error) {
      console.error('Response data:', error);
    }

    return [];
  }
};
