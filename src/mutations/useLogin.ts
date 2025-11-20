import { useState } from 'react';
import { UseMutationResult } from '@/types/queries';

export type LoginVariables = {
  password: string;
};

export type LoginData = {
  success: boolean;
  message: string;
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export function useLogin(): UseMutationResult<LoginData, LoginVariables> {
  const [data, setData] = useState<LoginData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: LoginVariables): Promise<LoginData> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      setData(undefined);

      let result: LoginData;

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock validation (password: admin123)
        if (variables.password === 'admin123') {
          localStorage.setItem('admin_authenticated', 'true');
          result = {
            success: true,
            message: 'Login successful',
          };
        } else {
          throw new Error('Invalid password');
        }
      } else {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(variables),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.error || 'Login failed');
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

  const mutateAsync = async (variables: LoginVariables): Promise<LoginData> => {
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

