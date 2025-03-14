export const globalErrorHandler = (error, source = 'App') => {
  // Log error details
  console.error(`Error in ${source}:`, error);

  // You can add custom error reporting service here
  // Example: Sentry, LogRocket, etc.

  // Return user-friendly error message
  if (error.name === 'NetworkError') {
    return 'Network connection error. Please check your internet connection.';
  }

  if (error.name === 'ValidationError') {
    return error.message;
  }

  // Default error message
  return 'An unexpected error occurred. Please try again later.';
};

// Custom error types
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(message = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}