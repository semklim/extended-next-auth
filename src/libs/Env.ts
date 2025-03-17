import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1, 'AUTH_SECRET is required'),
    NEXTAUTH_URL: z.string().url({ message: 'AUTH_URL is required' }),
  },
  client: {},
  shared: {
    // Add shared environment variables that are available to both client and server
    APP_URL: z
      .string()
      .url()
      .transform((url) => {
        if (url.endsWith('/')) {
          return url.slice(0, -1);
        }
        return url;
      }),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // AuthJS
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});
