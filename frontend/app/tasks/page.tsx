'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { apiClient } from '@/lib/api';
import { Task } from '@/types/task';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/Button';
import TaskItem from '@/components/TaskItem';

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useAuth(); // We'll use user presence to check if authenticated

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data: Task[] = await apiClient.get('/tasks');
      setTasks(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await apiClient.delete(`/tasks/${taskId}`);
      // Refresh tasks after deletion
      fetchTasks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask: Task = await apiClient.patch(`/tasks/${task.id}/complete`, {
        completed: !task.completed
      });

      // Update the task in the local state
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <Link href="/tasks/create">
            <Button>Create New Task</Button>
          </Link>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks yet. <Link href="/tasks/create" className="text-blue-600 hover:underline">Create your first task</Link>.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default TasksPage;