import React from 'react';
import { Button } from '@/components/ui/Button';
import { TodoFilter as TodoFilterType, TodoFilterStatus, TodoSortBy } from '@/types/todos';

interface TodoFilterProps {
  filter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange }) => {
  const handleStatusChange = (status: TodoFilterStatus) => {
    onFilterChange({ ...filter, status });
  };

  const handleSortChange = (sortBy: TodoSortBy) => {
    onFilterChange({ ...filter, sortBy });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <div className="flex space-x-2">
          {(['all', 'active', 'completed'] as TodoFilterStatus[]).map(status => (
            <Button
              key={status}
              variant={filter.status === status ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleStatusChange(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <div className="flex space-x-2">
          {(['created', 'updated', 'title'] as TodoSortBy[]).map(sortBy => (
            <Button
              key={sortBy}
              variant={filter.sortBy === sortBy ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => handleSortChange(sortBy)}
            >
              {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TodoFilter };