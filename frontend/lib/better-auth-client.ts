import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:8000', // Backend URL
  fetch: globalThis.fetch,
});

export const { signIn, signUp, signOut, getSession } = authClient;