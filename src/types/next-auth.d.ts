import type { DefaultUser } from 'next-auth';

/**
 * User data returned from the server
 */
interface UserData {
  /** User ID and Email verification are needed for NextAuth */
  id: string;
  emailVerified: Date | null;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

declare module 'next-auth' {
  export interface User extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
    user?: UserData;
    email?: string;
    password?: string;
  }

  export interface Session {
    accessToken: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires: number;
    user?: UserData;
    error?: string;
  }
}
