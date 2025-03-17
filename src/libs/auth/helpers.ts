'use server';

import type { SignInFormSchema } from '@/validation/singInForm';

import { auth, signIn, signOut } from './authConfig';

export const checkIsAuthenticated = async () => {
  const session = await auth();
  if (session) {
    return true;
  }
  return false;
};

export const getUserName = async () => {
  const session = await auth();
  return session?.user?.name;
};

export const handleSignIn = async (data: SignInFormSchema) => {
  await signIn('credentials', data);
};

export const handleSignOut = async () => {
  await signOut();
};
