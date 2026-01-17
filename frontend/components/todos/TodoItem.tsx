import React from 'react';
import { Button } from '@/components/ui/Button';
import { TodoItem as TodoItemType } from '@/types/todos';

interface TodoItemProps {
  todo: TodoItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string, title: string, description?: string) => void;
  loading?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  loading = false
}) => {
  const handleToggle = () => {
    if (!loading) {
      onToggle(todo.id);
    }
  };

  const handleDelete = () => {
    if (!loading) {
      onDelete(todo.id);
    }
  };

  return (
    <li className={`flex items-center justify-between p-4 border rounded-lg ${todo.completed ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={loading}
          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <span className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          <strong>{todo.title}</strong>
          {todo.description && <div className="text-sm text-gray-500 mt-1">{todo.description}</div>}
        </span>
      </div>
      <div className="flex space-x-2">
        <Button
          variant={todo.completed ? 'secondary' : 'ghost'}
          size="sm"
          onClick={handleToggle}
          disabled={loading}
        >
          {todo.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </li>
  );
};

export { TodoItem };