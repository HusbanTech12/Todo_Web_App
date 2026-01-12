import React from 'react';
import Link from 'next/link';
import { Task } from '@/types/task';
import Button from '@/components/Button';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <div className="ml-3 min-w-0 flex-1">
            <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </p>
            {task.description && (
              <p className={`text-sm truncate ${task.completed ? 'line-through text-gray-500' : 'text-gray-500'}`}>
                {task.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/tasks/edit/${task.id}`}>
            <Button variant="outline" size="sm">Edit</Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="mt-2 sm:flex sm:justify-between">
        <div className="sm:flex">
          <p className="text-xs text-gray-500">
            Created: {new Date(task.created_at).toLocaleDateString()}
          </p>
          <p className="mt-2 text-xs text-gray-500 sm:mt-0">
            Updated: {new Date(task.updated_at).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-2 flex items-center text-xs text-gray-500 sm:mt-0">
          {task.completed ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default TaskItem;