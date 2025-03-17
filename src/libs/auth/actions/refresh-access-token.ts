'use server';

import { jwtDecode } from 'jwt-decode';
import type { JWT } from 'next-auth/jwt';

import { apiRefreshAccessToken } from '../tokens';

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    if (!token.refreshToken) {
      throw new Error('No refresh token found');
    }

    const { accessToken, refreshToken, user } = await apiRefreshAccessToken(
      token.refreshToken
    );

    const decodedToken = jwtDecode(accessToken);

    const accessTokenExpires = decodedToken.exp ? decodedToken.exp * 1000 : 0;
    return {
      ...token,
      accessToken,
      accessTokenExpires,
      refreshToken,
      user: {
        ...user,
        emailVerified: user.emailVerified ? new Date() : null,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
