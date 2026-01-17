// Authentication Session entity from data model
export interface AuthSession {
  token: string;
  refreshToken?: string;
  expiresAt: Date;
  userId: string;
}

// Form State entities from data model
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

// User entity from data model
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication context type
export interface AuthContextType {
  user: User | null;
  session: AuthSession | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}