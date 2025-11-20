'use client';

import { useState, useEffect } from 'react';

type Language = 'bs' | 'en';

export default function LanguageToggle() {
  const [lang, setLang] = useState<Language>('bs');

  useEffect(() => {
    // Load language from localStorage or default to Bosnian
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang === 'bs' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languagechange', { detail: newLang }));
  };

  return (
    <div className="flex gap-2 items-center bg-gaming-dark/50 rounded-lg p-1 border border-gaming-purple/30">
      <button
        onClick={() => handleLanguageChange('bs')}
        className={`px-3 py-1.5 text-sm font-bold rounded transition-all duration-300 ${
          lang === 'bs'
            ? 'bg-gaming-purple text-white shadow-lg shadow-gaming-purple/30'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        BS
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1.5 text-sm font-bold rounded transition-all duration-300 ${
          lang === 'en'
            ? 'bg-gaming-purple text-white shadow-lg shadow-gaming-purple/30'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}

