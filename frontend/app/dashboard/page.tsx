'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [todos, setTodos] = useState<any[]>([]);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoData, setEditingTodoData] = useState({
    title: '',
    priority: 'medium',
    dueDate: ''
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    if (!token) {
      // Redirect to landing page if not authenticated
      router.push('/');
      return;
    }

    // Extract user info from localStorage
    try {
      const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserName(userData.email?.split('@')[0] || userData.name || 'User');
        setUserEmail(userData.email);
      } else {
        // Fallback to generic user name
        setUserName('User');
        setUserEmail('user@example.com');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      setUserName('User');
      setUserEmail('user@example.com');
    }

    // Simulate loading user's todos (in a real app, this would come from an API)
    setTimeout(() => {
      const mockTodos = [
        { id: 1, title: 'Complete project proposal', completed: false, priority: 'high', dueDate: '2026-01-25' },
        { id: 2, title: 'Review team feedback', completed: true, priority: 'medium', dueDate: '2026-01-22' },
        { id: 3, title: 'Prepare presentation slides', completed: false, priority: 'low', dueDate: '2026-01-30' },
      ];

      setTodos(mockTodos);
      setStats({
        total: mockTodos.length,
        completed: mockTodos.filter(t => t.completed).length,
        pending: mockTodos.filter(t => !t.completed).length
      });
      setIsLoading(false);
    }, 500);
  }, [router]);

  const handleLogout = () => {
    // Clear authentication data from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    // Redirect to landing page
    router.push('/');
  };

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) return;

    const newTodo = {
      id: todos.length + 1,
      title: newTodoTitle,
      completed: false,
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    };

    setTodos([newTodo, ...todos]);
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      pending: prev.pending + 1
    }));
    setNewTodoTitle('');
    setIsAddingTodo(false);
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));

    setStats(prev => ({
      ...prev,
      completed: todos.find(t => t.id === id)?.completed ? prev.completed - 1 : prev.completed + 1,
      pending: todos.find(t => t.id === id)?.completed ? prev.pending + 1 : prev.pending - 1
    }));
  };

  const handleDeleteTodo = (id: number) => {
    const deletedTodo = todos.find(t => t.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    setStats(prev => ({
      ...prev,
      total: prev.total - 1,
      completed: deletedTodo?.completed ? prev.completed - 1 : prev.completed,
      pending: !deletedTodo?.completed ? prev.pending - 1 : prev.pending
    }));
  };

  const handleEditClick = (todo: any) => {
    setEditingTodoId(todo.id);
    setEditingTodoData({
      title: todo.title,
      priority: todo.priority,
      dueDate: todo.dueDate
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingTodoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, ...editingTodoData }
        : todo
    ));
    setEditingTodoId(null);
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
  };

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TodoFlow
                </h1>
              </div>
              <nav className="ml-10 hidden md:flex space-x-8">
                <a href="/dashboard" className="text-indigo-600 font-medium border-b-2 border-indigo-600 px-1 pb-4">Dashboard</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 font-medium px-1 pb-4 transition-colors">Projects</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 font-medium px-1 pb-4 transition-colors">Calendar</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 font-medium px-1 pb-4 transition-colors">Team</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{userName}</p>
                <p className="text-xs text-gray-500 truncate max-w-[120px]">{userEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                aria-label="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline ml-2">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, <span className="text-indigo-600">{userName}</span> 👋
          </h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your tasks today.</p>
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
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 min-w-[120px]"
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
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                      autoFocus
                    />
                    <div className="mt-3 flex justify-end space-x-2">
                      <button
                        onClick={() => setIsAddingTodo(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddTodo}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
                      >
                        Add Task
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="divide-y divide-gray-100">
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    editingTodoId === todo.id ? (
                      // Edit form for the task
                      <div key={todo.id} className="px-6 py-4 bg-blue-50 border-l-4 border-blue-500">
                        <div className="flex flex-col space-y-3">
                          <input
                            type="text"
                            name="title"
                            value={editingTodoData.title}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="Task title"
                          />
                          <div className="flex flex-wrap gap-3 items-center">
                            <select
                              name="priority"
                              value={editingTodoData.priority}
                              onChange={handleEditChange}
                              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                            >
                              <option value="low">Low Priority</option>
                              <option value="medium">Medium Priority</option>
                              <option value="high">High Priority</option>
                            </select>
                            <input
                              type="date"
                              name="dueDate"
                              value={editingTodoData.dueDate}
                              onChange={handleEditChange}
                              className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                            />
                          </div>
                          <div className="flex justify-end space-x-2 pt-1">
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(todo.id)}
                              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Display task normally
                      <div key={todo.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 group">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo.id)}
                            className="mt-1 h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                            aria-label={`Mark task "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                          />
                          <div className="ml-3 flex-1 min-w-0">
                            <p className={`text-sm font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                              {todo.title}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                                todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                              </span>
                              <span className="text-xs text-gray-500">Due: {todo.dueDate}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() => handleEditClick(todo)}
                              className="text-gray-400 hover:text-blue-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                              aria-label={`Edit task "${todo.title}"`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteTodo(todo.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
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
                      ? `Great job! You've completed ${stats.completed} tasks.`
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
                    <span className="text-xs text-gray-500 whitespace-nowrap">{todo.dueDate}</span>
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
                <button className="w-full text-left px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 backdrop-blur-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Task
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 backdrop-blur-sm">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    View Projects
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