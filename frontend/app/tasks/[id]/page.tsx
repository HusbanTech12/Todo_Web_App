'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { apiClient } from '@/lib/api';
import { Task } from '@/types/task';
import ProtectedRoute from '@/components/ProtectedRoute';
import Button from '@/components/Button';

const TaskDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchTask();
    }
  }, [user, id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const data: Task = await apiClient.get(`/tasks/${id}`);
      setTask(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch task');
      console.error('Error fetching task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete task "${task?.title}"?`)) {
      try {
        await apiClient.delete(`/tasks/${id}`);
        router.push('/tasks');
        router.refresh();
      } catch (err: any) {
        setError(err.message || 'Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleToggleComplete = async () => {
    if (!task) return;

    try {
      const updatedTask: Task = await apiClient.patch(`/tasks/${task.id}/complete`, {
        completed: !task.completed
      });

      setTask(updatedTask);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!task) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Task not found.</p>
            <Link href="/tasks" className="mt-4 inline-block text-blue-600 hover:underline">
              Back to Tasks
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Task Details</h1>
          <div className="flex space-x-3">
            <Link href={`/tasks/edit/${id}`}>
              <Button>Edit Task</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete Task
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <h3 className={`ml-3 text-lg leading-6 font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1 text-gray-900">
                {task.description || 'No description provided.'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <p className="mt-1">
                  {task.completed ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Created</h4>
                <p className="mt-1 text-gray-900">
                  {new Date(task.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">Updated</h4>
                <p className="mt-1 text-gray-900">
                  {new Date(task.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/tasks" className="text-blue-600 hover:underline">
            ← Back to Tasks
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TaskDetailPage;