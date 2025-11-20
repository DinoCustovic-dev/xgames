'use client';

import { useEffect, useState } from 'react';

type Console = {
  id: number;
  number: number;
  name: string;
  status: 'free' | 'occupied';
  updatedAt: string;
};

type Language = 'bs' | 'en';

interface ConsoleCardProps {
  console: Console;
  language: Language;
}

export default function ConsoleCard({ console, language }: ConsoleCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [console.status]);

  const isFree = console.status === 'free';
  const statusText = isFree 
    ? (language === 'bs' ? 'Slobodno' : 'Free')
    : (language === 'bs' ? 'Zauzeto' : 'Occupied');

  return (
    <div
      className={`
        relative p-6 rounded-xl gaming-card gaming-card-hover overflow-hidden
        ${isAnimating ? 'scale-105' : 'scale-100'}
        ${isFree 
          ? 'border-gaming-green-neon/50 shadow-gaming-green/20' 
          : 'border-gaming-red-neon/50 shadow-gaming-red/20'
        }
      `}
    >
      {/* Animated background gradient */}
      <div 
        className={`
          absolute inset-0 opacity-20 transition-opacity duration-500
          ${isFree 
            ? 'bg-gradient-to-br from-gaming-green/30 to-gaming-cyan/30' 
            : 'bg-gradient-to-br from-gaming-red/30 to-gaming-purple/30'
          }
        `}
      />
      
      {/* Glowing corner accent */}
      <div 
        className={`
          absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30
          ${isFree ? 'bg-gaming-green-neon' : 'bg-gaming-red-neon'}
        `}
      />

      {/* Status indicator with glow */}
      <div className="absolute top-4 right-4 z-10">
        <div
          className={`
            w-5 h-5 rounded-full transition-all duration-300
            ${isFree 
              ? 'bg-gaming-green-neon text-gaming-green-neon animate-pulse-neon' 
              : 'bg-gaming-red-neon text-gaming-red-neon'
            }
            box-glow
          `}
        />
      </div>

      {/* Console info */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-gaming-purple-neon text-sm font-bold">PS5</span>
          <h3 className="text-2xl font-bold text-white">
            {language === 'bs' ? 'Konzola' : 'Console'} {console.number}
          </h3>
        </div>
        
        <div
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold
            transition-all duration-300
            ${isFree 
              ? 'bg-gaming-green/20 text-gaming-green-neon border border-gaming-green-neon/50 shadow-lg shadow-gaming-green/30' 
              : 'bg-gaming-red/20 text-gaming-red-neon border border-gaming-red-neon/50 shadow-lg shadow-gaming-red/30'
            }
          `}
        >
          <span className={`w-2 h-2 rounded-full ${isFree ? 'bg-gaming-green-neon animate-pulse' : 'bg-gaming-red-neon'}`} />
          {statusText}
        </div>
      </div>

      {/* Animated border glow */}
      <div 
        className={`
          absolute inset-0 rounded-xl pointer-events-none
          ${isFree 
            ? 'border-2 border-gaming-green-neon/30 animate-pulse-neon' 
            : 'border-2 border-gaming-red-neon/30'
          }
        `}
      />
    </div>
  );
}

