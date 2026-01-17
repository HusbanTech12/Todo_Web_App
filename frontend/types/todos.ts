// Todo Item entity from data model
export interface TodoItem {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
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