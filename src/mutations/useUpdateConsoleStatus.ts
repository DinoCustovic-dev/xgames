import { useState } from 'react';
import { UseMutationResult } from '@/types/queries';

export type UpdateConsoleStatusVariables = {
  consoleId: number;
  status: 'free' | 'occupied';
  password: string;
};

export type UpdateConsoleStatusData = {
  console: {
    id: number;
    number: number;
    name: string;
    status: string;
    updatedAt: string;
  };
  message: string;
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export function useUpdateConsoleStatus(): UseMutationResult<UpdateConsoleStatusData, UpdateConsoleStatusVariables> {
  const [data, setData] = useState<UpdateConsoleStatusData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: UpdateConsoleStatusVariables): Promise<UpdateConsoleStatusData> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setData(undefined);

      let result: UpdateConsoleStatusData;

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update localStorage mock data
        const stored = localStorage.getItem('mock_consoles');
        if (stored) {
          const consoles = JSON.parse(stored);
          const updated = consoles.map((c: any) =>
            c.id === variables.consoleId ? { ...c, status: variables.status, updatedAt: new Date().toISOString() } : c
          );
          localStorage.setItem('mock_consoles', JSON.stringify(updated));
          
          const updatedConsole = updated.find((c: any) => c.id === variables.consoleId);
          result = {
            console: updatedConsole,
            message: 'Status updated successfully',
          };
        } else {
          throw new Error('Console not found');
        }
      } else {
        const response = await fetch(`/api/consoles/${variables.consoleId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: variables.status,
            password: variables.password,
          }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.error || 'Failed to update status');
        }

        result = await response.json();
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

  const mutateAsync = async (variables: UpdateConsoleStatusVariables): Promise<UpdateConsoleStatusData> => {
    return mutate(variables);
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

