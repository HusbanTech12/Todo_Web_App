'use client';

import React, { useState } from 'react';
import { TodoForm } from '@/components/todos/TodoForm';
import { TodoList } from '@/components/todos/TodoList';
import { TodoFilter } from '@/components/todos/TodoFilter';
import { useTodos } from '@/hooks/useTodos';
import { TodoFilter as TodoFilterType, TodoFilterStatus, TodoSortBy } from '@/types/todos';

const TodosPage: React.FC = () => {
  const { todos, loading, error, createTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [filter, setFilter] = useState<TodoFilterType>({
    status: 'all',
    sortBy: 'created'
  });

  // Apply filters to todos
  const filteredTodos = todos
    .filter(todo => {
      if (filter.status === 'active') return !todo.completed;
      if (filter.status === 'completed') return todo.completed;
      return true; // 'all'
    })
    .sort((a, b) => {
      if (filter.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (filter.sortBy === 'updated') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else { // 'created'
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const handleSubmit = async (title: string, description?: string) => {
    await createTodo(title, description);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Todos</h1>

      <TodoForm onSubmit={handleSubmit} />

      <TodoFilter filter={filter} onFilterChange={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default TodosPage;