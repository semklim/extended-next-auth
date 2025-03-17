import type { SignInFormSchema } from '@/validation/singInForm';

import { mockUsers } from '../mokeUsers';
import { createTokens } from '../tokens';

export const login = async (data: SignInFormSchema) => {
  const user = mockUsers.find(
    (u) => u.email === data.email && u.password === data.password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  const dto = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
  };

  const { accessToken, refreshToken } = await createTokens({
    id: user.id,
    email: user.email,
  });

  return { accessToken, refreshToken, user: dto };
};
