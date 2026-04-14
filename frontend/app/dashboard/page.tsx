'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useTodos } from '@/hooks/useTodos';
import Navbar from '@/components/layout/Navbar';

const DashboardPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { todos, loading: todosLoading, createTodo, deleteTodo, toggleTodo, updateTodo } = useTodos();
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [authLoading, isAuthenticated, router]);

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length
  };

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) return;

    setActionLoading('adding');
    const result = await createTodo(newTodoTitle.trim(), newTodoDescription.trim() || undefined);
    setActionLoading(null);

    if (result) {
      setNewTodoTitle('');
      setNewTodoDescription('');
      setIsAddingTodo(false);
    }
  };

  const handleToggleTodo = async (id: string) => {
    setActionLoading(`toggle-${id}`);
    await toggleTodo(id);
    setActionLoading(null);
  };

  const handleDeleteTodo = async (id: string) => {
    setActionLoading(`delete-${id}`);
    await deleteTodo(id);
    setActionLoading(null);
  };

  const handleEditClick = (todo: any) => {
    setEditingTodoId(todo.id);
    setEditingTodoTitle(todo.title);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editingTodoTitle.trim()) return;

    setActionLoading(`edit-${id}`);
    await updateTodo(id, { title: editingTodoTitle.trim() });
    setActionLoading(null);
    setEditingTodoId(null);
    setEditingTodoTitle('');
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoTitle('');
  };

  const isLoading = authLoading || todosLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar activeNav="dashboard" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-indigo-600">{user?.email?.split('@')[0] || 'User'}</span> 👋
          </h1>
          <p className="mt-2 text-gray-600">Here&#39;s what&#39;s happening with your tasks today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Pending</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Todo List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
                  <button
                    onClick={() => setIsAddingTodo(!isAddingTodo)}
                    disabled={actionLoading !== null}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 min-w-[120px] disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Task
                  </button>
                </div>

                {isAddingTodo && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <input
                      type="text"
                      value={newTodoTitle}
                      onChange={(e) => setNewTodoTitle(e.target.value)}
                      placeholder="What needs to be done?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                      autoFocus
                    />
                    <input
                      type="text"
                      value={newTodoDescription}
                      onChange={(e) => setNewTodoDescription(e.target.value)}
                      placeholder="Description (optional)"
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                    />
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        onClick={() => { setIsAddingTodo(false); setNewTodoTitle(''); setNewTodoDescription(''); }}
                        disabled={actionLoading === 'adding'}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddTodo}
                        disabled={actionLoading === 'adding' || !newTodoTitle.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      >
                        {actionLoading === 'adding' ? 'Adding...' : 'Add Task'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="divide-y divide-gray-100">
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    editingTodoId === todo.id ? (
                      <div key={todo.id} className="px-6 py-4 bg-blue-50 border-l-4 border-blue-500">
                        <div className="flex flex-col space-y-3">
                          <input
                            type="text"
                            value={editingTodoTitle}
                            onChange={(e) => setEditingTodoTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Task title"
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(todo.id)}
                          />
                          <div className="flex justify-end space-x-2 pt-1">
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(todo.id)}
                              disabled={actionLoading?.startsWith('edit-') || !editingTodoTitle.trim()}
                              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            >
                              {actionLoading === `edit-${todo.id}` ? 'Saving...' : 'Save'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div key={todo.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 group">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                            disabled={actionLoading !== null}
                            className="mt-1 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 disabled:opacity-50"
                            aria-label={`Mark task "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                          />
                          <div className="ml-3 flex-1 min-w-0">
                            <p className={`text-sm font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                              {todo.title}
                            </p>
                            {todo.description && (
                              <p className="text-xs text-gray-500 mt-1">{todo.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {todo.completed ? 'Completed' : 'Pending'}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(todo.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleEditClick(todo)}
                              disabled={actionLoading !== null}
                              className="text-gray-400 hover:text-blue-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-50"
                              aria-label={`Edit task "${todo.title}"`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteTodo(todo.id)}
                              disabled={actionLoading !== null}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-50"
                              aria-label={`Delete task "${todo.title}"`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  ))
                ) : (
                  <div className="px-6 py-12 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding a new task.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => setIsAddingTodo(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add your first task
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-medium text-gray-900">{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    {stats.completed > 0
                      ? `Great job! You&#39;ve completed ${stats.completed} tasks.`
                      : 'Start completing tasks to boost your productivity.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
              <div className="space-y-3">
                {todos.filter(t => !t.completed).slice(0, 3).map((todo) => (
                  <div key={todo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
                    <span className="text-sm font-medium text-gray-900 truncate flex-1 mr-2">{todo.title}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(todo.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {todos.filter(t => !t.completed).length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No upcoming tasks</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
              <p className="text-indigo-100 text-sm mb-4">Jump straight into productivity</p>
              <div className="space-y-3">
                <button
                  onClick={() => setIsAddingTodo(true)}
                  className="w-full text-left px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Task
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
