import { useState, useEffect } from 'react';
import { UseQueryResult } from '@/types/queries';

export type Game = {
  id: number;
  name: string;
  imageUrl: string | null;
  consoles: Array<{
    id: number;
    number: number;
    name: string;
  }>;
};

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

// Mock data
const mockGames: Game[] = [
  {
    id: 1,
    name: 'God of War Ragnarök',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }, { id: 2, number: 2, name: 'Console 2' }],
  },
  {
    id: 2,
    name: 'Spider-Man 2',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }],
  },
  {
    id: 3,
    name: 'Horizon Forbidden West',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }, { id: 2, number: 2, name: 'Console 2' }, { id: 3, number: 3, name: 'Console 3' }],
  },
  {
    id: 4,
    name: 'Ratchet & Clank: Rift Apart',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }, { id: 2, number: 2, name: 'Console 2' }],
  },
  {
    id: 5,
    name: 'Demon\'s Souls',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }, { id: 2, number: 2, name: 'Console 2' }, { id: 3, number: 3, name: 'Console 3' }],
  },
  {
    id: 6,
    name: 'Returnal',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }, { id: 3, number: 3, name: 'Console 3' }, { id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 7,
    name: 'Gran Turismo 7',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }, { id: 2, number: 2, name: 'Console 2' }, { id: 3, number: 3, name: 'Console 3' }, { id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 8,
    name: 'Final Fantasy XVI',
    imageUrl: null,
    consoles: [{ id: 1, number: 1, name: 'Console 1' }, { id: 2, number: 2, name: 'Console 2' }],
  },
  {
    id: 9,
    name: 'Baldur\'s Gate 3',
    imageUrl: null,
    consoles: [{ id: 2, number: 2, name: 'Console 2' }, { id: 3, number: 3, name: 'Console 3' }, { id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 10,
    name: 'Elden Ring',
    imageUrl: null,
    consoles: [{ id: 2, number: 2, name: 'Console 2' }, { id: 3, number: 3, name: 'Console 3' }, { id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 11,
    name: 'Call of Duty: Modern Warfare III',
    imageUrl: null,
    consoles: [{ id: 3, number: 3, name: 'Console 3' }, { id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 12,
    name: 'FIFA 24',
    imageUrl: null,
    consoles: [{ id: 3, number: 3, name: 'Console 3' }, { id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 13,
    name: 'NBA 2K24',
    imageUrl: null,
    consoles: [{ id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 14,
    name: 'Mortal Kombat 1',
    imageUrl: null,
    consoles: [{ id: 4, number: 4, name: 'Console 4' }],
  },
  {
    id: 15,
    name: 'Tekken 8',
    imageUrl: null,
    consoles: [{ id: 4, number: 4, name: 'Console 4' }],
  },
];

export function useGames(): UseQueryResult<Game[]> {
  const [data, setData] = useState<Game[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      if (USE_MOCK) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get from localStorage if exists (for simulation)
        const stored = localStorage.getItem('mock_games');
        if (stored) {
          setData(JSON.parse(stored));
        } else {
          setData(mockGames);
          localStorage.setItem('mock_games', JSON.stringify(mockGames));
        }
      } else {
        try {
          const response = await fetch('/api/games');
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch games`);
          }
          const result = await response.json();
          
          if (!result.games) {
            throw new Error('Invalid response format');
          }
          
          setData(result.games);
        } catch (apiError) {
          // Fallback to mock if API fails (for development)
          if (process.env.NODE_ENV === 'development') {
            console.warn('API failed, falling back to mock data:', apiError);
            const stored = localStorage.getItem('mock_games');
            if (stored) {
              setData(JSON.parse(stored));
            } else {
              setData(mockGames);
              localStorage.setItem('mock_games', JSON.stringify(mockGames));
            }
          } else {
            throw apiError;
          }
        }
      }
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchGames,
  };
}

