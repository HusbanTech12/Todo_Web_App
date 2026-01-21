import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';

// Configure Better-Auth
export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'secret-key-for-development',
  database: {
    provider: 'sqlite', // You can switch to 'postgres', 'mysql', etc.
    url: process.env.DATABASE_URL || './todo.db',
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    // Add social providers if needed
  },
  advanced: {
    logger: console,
  }
});

// Export the cookies handler for Next.js
export const cookies = nextCookies();