'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function AboutPage() {
  const language = useLanguage();

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gaming-purple/5 via-gaming-blue/5 to-gaming-cyan/5 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="gaming-card p-8 md:p-12">
          <h1 className="text-5xl md:text-6xl font-black neon-text mb-8 text-glow">
            {language === 'bs' ? 'O nama' : 'About Us'}
          </h1>
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              {language === 'bs' 
                ? '🎮 Dobrodošli u XGAMES - vaš gaming centar za PS5 konzole! Uživajte u najnovijim igrama u udobnom i modernom okruženju gdje se gaming zajednica okuplja.'
                : '🎮 Welcome to XGAMES - your gaming center for PS5 consoles! Enjoy the latest games in a comfortable and modern environment where the gaming community gathers.'
              }
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              {language === 'bs'
                ? '⚡ Naš prostor je dizajniran sa fokusom na gaming estetiku - tamna tema, neon efekti, i energična atmosfera koja će vas inspirisati za najbolje gaming sesije.'
                : '⚡ Our space is designed with a focus on gaming aesthetics - dark theme, neon effects, and an energetic atmosphere that will inspire you for the best gaming sessions.'
              }
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              {language === 'bs'
                ? '🔥 Pratite status naših konzola u realnom vremenu, rezervišite svoje mjesto, i uživajte u najboljem gaming iskustvu sa prijateljima!'
                : '🔥 Track the status of our consoles in real-time, reserve your spot, and enjoy the best gaming experience with friends!'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

