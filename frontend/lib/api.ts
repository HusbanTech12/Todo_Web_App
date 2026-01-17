import { ApiResponse } from '@/types/todos';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

/**
 * Centralized API client with JWT token attachment
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Generic request method that automatically attaches JWT token
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    // Get token from localStorage (where auth stores it)
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data,
        message: 'Request successful'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Unknown error occurred',
        message: 'Request failed'
      };
    }
  }

  // Authentication endpoints
  async register(credentials: { email: string; password: string }) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  // Todo endpoints
  async getTodos() {
    return this.request('/api/todos');
  }

  async createTodo(todo: { title: string; description?: string | null; completed?: boolean }) {
    return this.request('/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  }

  async updateTodo(id: string, todo: { title?: string; description?: string | null; completed?: boolean }) {
    return this.request(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
    });
  }

  async deleteTodo(id: string) {
    return this.request(`/api/todos/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();