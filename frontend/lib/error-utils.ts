/**
 * Error handling utilities for API responses
 */

export interface ErrorDetails {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

/**
 * Parse error response from API
 */
export const parseApiError = (error: any): ErrorDetails => {
  if (error instanceof Error) {
    // Native JavaScript Error
    return {
      message: error.message,
      details: error
    };
  }

  if (typeof error === 'string') {
    // Simple string error
    return {
      message: error
    };
  }

  if (error && typeof error === 'object') {
    // API response object
    if (error.message) {
      return {
        message: error.message,
        code: error.code,
        status: error.status,
        details: error
      };
    }

    // Generic object
    return {
      message: 'An unknown error occurred',
      details: error
    };
  }

  // Fallback
  return {
    message: 'An unknown error occurred',
    details: error
  };
};

/**
 * Check if an API response indicates an authentication error
 */
export const isAuthError = (response: any): boolean => {
  if (response && typeof response === 'object') {
    // Check for 401 Unauthorized status
    if (response.status === 401 || response.status === 403) {
      return true;
    }

    // Check for specific error codes/messages indicating auth issues
    if (response.error && typeof response.error === 'string') {
      const lowerError = response.error.toLowerCase();
      return lowerError.includes('unauthorized') ||
             lowerError.includes('invalid token') ||
             lowerError.includes('expired');
    }
  }

  return false;
};

/**
 * Check if an API response indicates a network error
 */
export const isNetworkError = (error: any): boolean => {
  if (error && typeof error === 'object') {
    // Check for common network error indicators
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return true;
    }

    // Check for specific network error messages
    if (typeof error.message === 'string') {
      const lowerMessage = error.message.toLowerCase();
      return lowerMessage.includes('network') ||
             lowerMessage.includes('failed to fetch') ||
             lowerMessage.includes('load failed');
    }
  }

  return false;
};

/**
 * Format error message for display to user
 */
export const formatErrorMessage = (error: any): string => {
  const parsedError = parseApiError(error);

  // Provide user-friendly messages for common errors
  if (parsedError.message.toLowerCase().includes('network')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  if (parsedError.message.toLowerCase().includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  if (parsedError.message.toLowerCase().includes('unauthorized') ||
      parsedError.message.toLowerCase().includes('invalid token')) {
    return 'Your session has expired. Please log in again.';
  }

  // Return the original message if no special formatting is needed
  return parsedError.message || 'An error occurred. Please try again.';
};

/**
 * Log error with additional context
 */
export const logError = (error: any, context?: string): void => {
  const parsedError = parseApiError(error);

  console.group(`Error${context ? ` in ${context}` : ''}`);
  console.error('Message:', parsedError.message);
  console.error('Code:', parsedError.code);
  console.error('Status:', parsedError.status);
  console.error('Details:', parsedError.details);
  console.groupEnd();
};