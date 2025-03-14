import { useState, useCallback } from "react";
import { globalErrorHandler } from "../utils/errorHandler";

export const useErrorHandler = (componentName) => {
  const [error, setError] = useState(null);

  const handleError = useCallback(
    (error) => {
      const errorMessage = globalErrorHandler(error, componentName);
      setError(errorMessage);

      // Auto clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    },
    [componentName]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};
