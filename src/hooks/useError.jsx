import { useState, useCallback } from "react";

export const useError = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    const errorMessage = error?.message || "Something went wrong";
    setError(errorMessage);

    // Auto clear error after 5 seconds
    setTimeout(() => setError(null), 5000);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};
