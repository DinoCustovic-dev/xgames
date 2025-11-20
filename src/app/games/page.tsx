'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useGames } from '@/queries/useGames';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function GamesPage() {
  const { data: games, isLoading, isError, error, refetch } = useGames();
  const language = useLanguage();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={error?.message || 'Failed to fetch games'} onRetry={refetch} />;
  }

  if (!games || games.length === 0) {
    return <Error message="No games available" onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gaming-purple/5 via-gaming-blue/5 to-gaming-cyan/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-6xl font-black neon-text mb-12 text-center text-glow">
          {language === 'bs' ? '🎮 Dostupne Igre' : '🎮 Available Games'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="gaming-card gaming-card-hover p-6 animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-gaming-purple-neon">🎯</span>
                {game.name}
              </h3>
              <div className="space-y-3">
                <p className="text-sm font-bold text-gaming-cyan-neon">
                  {language === 'bs' ? 'Dostupno na:' : 'Available on:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {game.consoles.map((console) => (
                    <span
                      key={console.id}
                      className="px-3 py-1.5 bg-gaming-purple/20 text-gaming-purple-neon rounded-full text-sm font-bold border border-gaming-purple-neon/30 hover:bg-gaming-purple/30 transition-colors"
                    >
                      {language === 'bs' ? 'Konzola' : 'Console'} {console.number}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

