import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface TodoFormProps {
  onSubmit: (title: string, description?: string) => void;
  onCancel?: () => void;
  initialTitle?: string;
  initialDescription?: string;
  submitButtonText?: string;
  loading?: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  onCancel,
  initialTitle = '',
  initialDescription = '',
  submitButtonText = 'Add Todo',
  loading = false
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim()) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Input
            label="Todo Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
        </div>
        <div>
          <Input
            label="Description (Optional)"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description..."
          />
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : submitButtonText}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export { TodoForm };