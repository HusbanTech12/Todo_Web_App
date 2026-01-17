import { useState, useEffect } from 'react';
import { TodoItem, ApiResponse } from '@/types/todos';
import { apiClient } from '@/lib/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.getTodos() as ApiResponse<TodoItem[]>;

      if (response.success && response.data) {
        setTodos(response.data);
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
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.createTodo({
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
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.updateTodo(id, updates) as ApiResponse<TodoItem>;

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
    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse = await apiClient.deleteTodo(id);

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
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;

    return updateTodo(id, { completed: !todo.completed });
  };

  // Initialize todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  };
};