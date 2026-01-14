'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { apiClient } from '@/lib/api';
import { Task, UpdateTaskRequest } from '@/types/task';
import ProtectedRoute from '@/components/ProtectedRoute';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Form from '@/components/Form';

const EditTaskPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [task, setTask] = useState<Task | null>(null);

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
      setTitle(data.title);
      setDescription(data.description || '');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch task');
      console.error('Error fetching task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const taskData: UpdateTaskRequest = {
      title,
      description: description || undefined
    };

    try {
      await apiClient.put(`/tasks/${id}`, taskData);
      // Redirect to task detail after successful update
      router.push(`/tasks/${id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/tasks/${id}`);
  };

  if (loading && !task) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Task</h1>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <Form title={`Editing: ${task?.title || 'Task'}`} onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Title *"
              id="title"
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />

            <Input
              label="Description"
              id="description"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
            />

            <div className="flex space-x-4 mt-4">
              <Button
                type="submit"
                loading={loading}
                className="flex-1"
              >
                Update Task
              </Button>

              <Button
                variant="secondary"
                className="flex-1"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EditTaskPage;