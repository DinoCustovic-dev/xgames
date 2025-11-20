import { useState } from 'react';
import { UseMutationResult } from '@/types/queries';

export type LogoutData = {
  success: boolean;
  message: string;
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export function useLogout(): UseMutationResult<LogoutData, void> {
  const [data, setData] = useState<LogoutData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (): Promise<LogoutData> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setData(undefined);

      let result: LogoutData;

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Clear localStorage
        localStorage.removeItem('admin_authenticated');
        result = {
          success: true,
          message: 'Logout successful',
        };
      } else {
        // In real implementation, this would call logout API
        result = {
          success: true,
          message: 'Logout successful',
        };
      }

      setData(result);
      return result;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error('Unknown error');
      setIsError(true);
      setError(errorObj);
      throw errorObj;
    } finally {
      setIsLoading(false);
    }
  };

  const mutateAsync = async (): Promise<LogoutData> => {
    return mutate();
  };

  const reset = () => {
    setData(undefined);
    setIsError(false);
    setError(null);
    setIsLoading(false);
  };

  return {
    mutate,
    mutateAsync,
    data,
    isLoading,
    isError,
    error,
    reset,
  };
}

