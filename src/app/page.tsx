'use client';

import ConsoleCard from '@/components/ConsoleCard';
import { useLanguage } from '@/hooks/useLanguage';
import { useConsoles } from '@/queries/useConsoles';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function HomePage() {
  const { data: consoles, isLoading, isError, error, refetch } = useConsoles();
  const language = useLanguage();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Error 
        message={error?.message || 'Failed to fetch consoles. Make sure the database is set up.'} 
        onRetry={refetch} 
      />
    );
  }

  if (!consoles || consoles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-darker">
        <div className="text-center p-8 gaming-card max-w-md">
          <div className="text-4xl mb-4">🎮</div>
          <p className="text-gaming-cyan-neon text-lg font-semibold mb-4">
            No consoles available
          </p>
          <p className="text-gray-400 text-sm mb-4">
            The database might not be initialized. Please run the setup API.
          </p>
          <button onClick={refetch} className="btn-gaming">
            Retry
          </button>
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
          {consoles.map((consoleItem, index) => (
            <div 
              key={consoleItem.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ConsoleCard console={consoleItem} language={language} />
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
