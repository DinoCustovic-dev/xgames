'use client';

import { useState, useEffect } from 'react';
import ConsoleCard from '@/components/ConsoleCard';
import { useLanguage } from '@/hooks/useLanguage';

type Console = {
  id: number;
  number: number;
  name: string;
  status: 'free' | 'occupied';
  updatedAt: string;
};

export default function HomePage() {
  const [consoles, setConsoles] = useState<Console[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const language = useLanguage();

  const fetchConsoles = async () => {
    try {
      const response = await fetch('/api/consoles');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setConsoles(data.consoles);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsoles();
    // Poll every 5 seconds
    const interval = setInterval(fetchConsoles, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-darker">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gaming-purple-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gaming-purple-neon text-lg font-semibold">
            {language === 'bs' ? 'Učitavanje...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-darker">
        <div className="text-center p-8 gaming-card max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-gaming-red-neon text-lg font-semibold">
            {language === 'bs' ? 'Greška: ' : 'Error: '}{error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gaming-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gaming-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gaming-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <h1 className="text-6xl md:text-8xl font-black neon-text text-glow animate-pulse-slow">
              XGAMES
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-gaming-purple-neon text-xl">⚡</span>
            <p className="text-xl md:text-2xl text-gray-300 font-semibold">
              {language === 'bs'
                ? 'Gaming Centar • PS5 Konzole'
                : 'Gaming Center • PS5 Consoles'
              }
            </p>
            <span className="text-gaming-cyan-neon text-xl">⚡</span>
          </div>
          <p className="text-gaming-blue-neon text-lg font-medium">
            {language === 'bs'
              ? 'Status konzola u realnom vremenu'
              : 'Real-time console status'
            }
          </p>
        </div>

        {/* Console grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {consoles.map((console, index) => (
            <div
              key={console.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ConsoleCard console={console} language={language} />
            </div>
          ))}
        </div>

        {/* Status update indicator */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gaming-dark/50 border border-gaming-purple/30">
            <span className="w-2 h-2 bg-gaming-green-neon rounded-full animate-pulse" />
            <p className="text-sm text-gray-400">
              {language === 'bs'
                ? 'Status se automatski ažurira svakih 5 sekundi'
                : 'Status automatically updates every 5 seconds'
              }
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
