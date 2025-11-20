import { useState, useEffect } from 'react';
import { UseQueryResult } from '@/types/queries';

export type Console = {
  id: number;
  number: number;
  name: string;
  status: 'free' | 'occupied';
  updatedAt: string;
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// Mock data
const mockConsoles: Console[] = [
  { id: 1, number: 1, name: 'Console 1', status: 'free', updatedAt: new Date().toISOString() },
  { id: 2, number: 2, name: 'Console 2', status: 'occupied', updatedAt: new Date().toISOString() },
  { id: 3, number: 3, name: 'Console 3', status: 'free', updatedAt: new Date().toISOString() },
  { id: 4, number: 4, name: 'Console 4', status: 'free', updatedAt: new Date().toISOString() },
];

export function useConsoles(): UseQueryResult<Console[]> {
  const [data, setData] = useState<Console[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchConsoles = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get from localStorage if exists (for simulation)
        const stored = localStorage.getItem('mock_consoles');
        if (stored) {
          setData(JSON.parse(stored));
        } else {
          setData(mockConsoles);
          localStorage.setItem('mock_consoles', JSON.stringify(mockConsoles));
        }
      } else {
        const response = await fetch('/api/consoles');
        if (!response.ok) {
          throw new Error('Failed to fetch consoles');
        }
        const result = await response.json();
        setData(result.consoles);
      }
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsoles();
    // Poll every 5 seconds
    const interval = setInterval(fetchConsoles, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchConsoles,
  };
}

