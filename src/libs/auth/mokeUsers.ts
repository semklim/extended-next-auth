import type { UserData } from '@/types/next-auth';
import type { SignInFormSchema } from '@/validation/singInForm';

export interface MokeUserData extends UserData, SignInFormSchema {}

export const mockUsers: MokeUserData[] = [
  {
    id: '1',
    email: 'admin@example.com',
    emailVerified: null,
    password: 'password123',
    name: 'Test Admin',
    role: 'admin',
    permissions: ['create', 'read', 'update', 'delete'],
  },
  {
    id: '2',
    email: 'user@example.com',
    emailVerified: null,
    password: '12345',
    name: 'Test User',
    role: 'user',
    permissions: ['read'],
  },
];
