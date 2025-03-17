'use server';

import { jwtVerify, SignJWT } from 'jose';

import { mockUsers } from './mokeUsers';

const secretKey = new TextEncoder().encode('your-secret-key');
const accessTokenExpirationTime = '15m';
const refreshTokenExpirationTime = '7d';

export interface TokenPayload {
  id: string;
  email: string;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

export async function createTokens(payload: TokenPayload) {
  const accessToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(accessTokenExpirationTime)
    .sign(secretKey);

  const refreshToken = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(refreshTokenExpirationTime)
    .sign(secretKey);

  return { accessToken, refreshToken };
}

export async function apiRefreshAccessToken(refreshToken: string) {
  const payload = await verifyToken(refreshToken);

  if (!payload) {
    throw new Error('Invalid refresh token');
  }

  const user = mockUsers.find((u) => u.email === payload.email);

  if (!user) {
    throw new Error('User not found');
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await createTokens(payload);

  console.log('Access token has been refreshed');
  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      emailVerified: user.emailVerified,
    },
  };
}
