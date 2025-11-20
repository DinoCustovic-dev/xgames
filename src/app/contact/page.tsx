'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function ContactPage() {
  const language = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gaming-blue/5 via-gaming-purple/5 to-gaming-cyan/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="gaming-card p-8 md:p-12">
          <h1 className="text-5xl md:text-6xl font-black neon-text mb-8 text-glow">
            {language === 'bs' ? 'Kontakt' : 'Contact'}
          </h1>
          
          <div className="space-y-8">
            <div className="border-l-4 border-gaming-purple-neon pl-6 gaming-card p-6">
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-gaming-cyan-neon">⏰</span>
                {language === 'bs' ? 'Radno vreme' : 'Hours'}
              </h2>
              <p className="text-gaming-cyan-neon text-2xl font-bold">
                12:00 - 24:00
              </p>
            </div>

            <div className="border-l-4 border-gaming-green-neon pl-6 gaming-card p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-gaming-green-neon">💰</span>
                {language === 'bs' ? 'Cene' : 'Pricing'}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎮</span>
                  <p className="text-gaming-green-neon text-xl font-bold">
                    {language === 'bs' ? '2 igrača - 1 sat:' : '2 players - 1 hour:'} <span className="text-white">5KM</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎮</span>
                  <p className="text-gaming-green-neon text-xl font-bold">
                    {language === 'bs' ? '4 igrača - 1 sat:' : '4 players - 1 hour:'} <span className="text-white">8KM</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-gaming-blue-neon pl-6 gaming-card p-6">
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-gaming-blue-neon">📍</span>
                {language === 'bs' ? 'Lokacija' : 'Location'}
              </h2>
              <p className="text-gray-300 text-lg">
                {language === 'bs' 
                  ? 'Pronađite nas na mapi u footeru.' 
                  : 'Find us on the map in the footer.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

