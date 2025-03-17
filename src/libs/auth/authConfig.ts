/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import type { SignInFormSchema } from '@/validation/singInForm';

import { Env } from '../Env';
import { login } from './actions/login';
import { refreshAccessToken } from './actions/refresh-access-token';

const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: Env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-in',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      // @ts-ignore
      async authorize(credentials: SignInFormSchema) {
        try {
          // accessing the accessToken returned by server
          const { accessToken, refreshToken, user } = await login(credentials);

          // You can make more request to get other information about the user eg. Profile details return user credentials together with accessToken
          return {
            accessToken,
            refreshToken,
            user,
          };
        } catch (e) {
          console.error((e as Error).message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (token.accessToken) {
        const decodedToken = jwtDecode(token.accessToken);

        token.accessTokenExpires = decodedToken.exp
          ? decodedToken.exp * 1000
          : 0;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user: user.user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      console.log('Access token has expired, trying to refresh...');
      // Access token has expired, try to update it
      try {
        return await refreshAccessToken(token);
      } catch (error) {
        await signOut();
        return token;
      }
    },
    session: async ({ session, token }) => {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
        session.user = token.user!;
      }
      return session;
    },
  },
});

export { auth, handlers, signIn, signOut };
