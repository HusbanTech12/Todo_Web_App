import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ErrorDisplayProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, className, onRetry }) => {
  return (
    <div
      className={twMerge(
        'p-4 rounded-md bg-red-50 border border-red-200 text-red-800',
        className
      )}
    >
      <div className="flex items-start">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <button
                onClick={onRetry}
                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ErrorDisplay };