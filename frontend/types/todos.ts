// Todo Item entity from data model - matches backend response
export interface TodoItem {
  id: number;
  user_id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

// UI State entity from data model
export type TodoFilterStatus = 'all' | 'active' | 'completed';
export type TodoSortBy = 'created' | 'updated' | 'title';

export interface TodoFilter {
  status: TodoFilterStatus;
  sortBy: TodoSortBy;
}

// API Response Model from data model
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}