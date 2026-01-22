import { useState, useEffect } from 'react';
import { TodoItem, ApiResponse } from '@/types/todos';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';

export const useTodos = () => {
  const { user, loading: authLoading } = useAuth();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos
  const fetchTodos = async () => {
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getTodos(user.id) as ApiResponse<TodoItem[]>;

      if (response.success && response.data) {
        setTodos(Array.isArray(response.data) ? response.data : []);
      } else {
        setError(response.error || 'Failed to fetch todos');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching todos');
    } finally {
      setLoading(false);
    }
  };

  // Create a new todo
  const createTodo = async (title: string, description?: string) => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.createTodo(user.id, {
        title,
        description,
        completed: false
      }) as ApiResponse<TodoItem>;

      if (response.success && response.data) {
        setTodos(prev => [...prev, response.data!]);
        return response.data!;
      } else {
        setError(response.error || 'Failed to create todo');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating todo');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing todo
  const updateTodo = async (id: string, updates: Partial<TodoItem>) => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.updateTodo(user.id, id, updates) as ApiResponse<TodoItem>;

      if (response.success && response.data) {
        setTodos(prev => prev.map(todo => todo.id === id ? response.data! : todo));
        return response.data!;
      } else {
        setError(response.error || 'Failed to update todo');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating todo');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse = await apiClient.deleteTodo(user.id, id);

      if (response.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        return true;
      } else {
        setError(response.error || 'Failed to delete todo');
        return false;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting todo');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id: string) => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    const todo = todos.find(t => t.id === id);
    if (!todo) return null;

    // Use the patch endpoint for toggling completion
    try {
      setLoading(true);
      const response = await apiClient.toggleTodoCompletion(user.id, id) as ApiResponse<TodoItem>;

      if (response.success && response.data) {
        setTodos(prev => prev.map(todo => todo.id === id ? response.data! : todo));
        return response.data!;
      } else {
        setError(response.error || 'Failed to update todo completion');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating todo completion');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Initialize todos on mount
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  return {
    todos,
    loading: loading || authLoading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  };
};