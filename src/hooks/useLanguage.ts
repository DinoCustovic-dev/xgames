'use client';

import { useState, useEffect } from 'react';

type Language = 'bs' | 'en';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('bs');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang === 'bs' || savedLang === 'en') {
      setLang(savedLang);
    }

    const handleLanguageChange = (e: CustomEvent<Language>) => {
      setLang(e.detail);
    };

    window.addEventListener('languagechange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange as EventListener);
    };
  }, []);

  return lang;
}

