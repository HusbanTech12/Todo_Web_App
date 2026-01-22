declare module 'better-auth' {
  export interface AuthOptions {
    secret?: string;
    database?: {
      provider: string;
      url: string;
    };
    emailAndPassword?: {
      enabled: boolean;
      requireEmailVerification: boolean;
    };
    socialProviders?: any;
    advanced?: {
      logger?: Console;
    };
  }

  export interface AuthClient {
    signIn: any;
    signUp: any;
    getSession: any;
    signOut: any;
  }

  export function betterAuth(options: AuthOptions): AuthClient;
}

declare module 'better-auth/next-js' {
  export function nextCookies(): any;
}