'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { apiClient } from '@/lib/api';
import { CreateTaskRequest } from '@/types/task';
import ProtectedRoute from '@/components/ProtectedRoute';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Form from '@/components/Form';

const CreateTaskPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { token } = useAuth();

  if (token) {
    apiClient.setToken(token);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const taskData: CreateTaskRequest = {
      title,
      description: description || undefined
    };

    try {
      await apiClient.post('/tasks', taskData);
      // Redirect to tasks list after successful creation
      router.push('/tasks');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <Form title="Create Task" onSubmit={handleSubmit}>
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
                Create Task
              </Button>

              <Link href="/tasks">
                <Button variant="secondary" className="flex-1">
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateTaskPage;