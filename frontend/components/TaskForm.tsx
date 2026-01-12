import React from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Form from '@/components/Form';

interface TaskFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  error?: string;
  loading?: boolean;
  submitLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  error,
  loading,
  submitLabel,
  onSubmit,
  onCancel
}) => {
  return (
    <Form title="Task Details" onSubmit={onSubmit}>
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
          {submitLabel}
        </Button>

        {onCancel && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </Button>
        )}
      </div>
    </Form>
  );
};

export default TaskForm;