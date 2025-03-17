'use server';

import { auth } from '@/libs/auth/authConfig';

export const deleteTask = async (taskId: string) => {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      throw new Error('No access token found');
    }

    console.log('Delete Task ID:', taskId);

    return true;
  } catch (error: any) {
    // Log the error for debugging
    if (error) {
      console.error('Response data:', error);
    }

    throw new Error(error.message);
  }
};
