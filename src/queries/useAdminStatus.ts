import { useState, useEffect } from 'react';
import { UseQueryResult } from '@/types/queries';

export type AdminStatus = {
  isAuthenticated: boolean;
  canAccess: boolean;
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export function useAdminStatus(): UseQueryResult<AdminStatus> {
  const [data, setData] = useState<AdminStatus | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Get from localStorage (simulation)
        const isAuth = localStorage.getItem('admin_authenticated') === 'true';
        setData({
          isAuthenticated: isAuth,
          canAccess: isAuth,
        });
      } else {
        // In real implementation, this would check session/token
        // For now, return default
        setData({
          isAuthenticated: false,
          canAccess: false,
        });
      }
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchStatus,
  };
}

