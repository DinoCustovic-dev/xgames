import { useState } from 'react';
import { UseMutationResult } from '@/types/queries';

export type SetupDatabaseData = {
  success: boolean;
  message: string;
  consoles: number;
  games: number;
  adminPassword?: string;
};

export function useSetupDatabase(): UseMutationResult<SetupDatabaseData, void> {
  const [data, setData] = useState<SetupDatabaseData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (): Promise<SetupDatabaseData> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setData(undefined);

      const response = await fetch('/api/setup', {
        method: 'POST',
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Setup failed');
      }

      const result = await response.json();
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

  const mutateAsync = async (): Promise<SetupDatabaseData> => {
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

