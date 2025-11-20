'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/hooks/useLanguage';

export default function Navigation() {
  const pathname = usePathname();
  const language = useLanguage();

  const navItems = [
    { href: '/', labelBs: 'Početna', labelEn: 'Home' },
    { href: '/about', labelBs: 'O nama', labelEn: 'About' },
    { href: '/contact', labelBs: 'Kontakt', labelEn: 'Contact' },
    { href: '/games', labelBs: 'Igre', labelEn: 'Games' },
  ];

  return (
    <nav className="bg-gaming-dark/90 backdrop-blur-md border-b border-gaming-purple/30 sticky top-0 z-50 shadow-lg shadow-gaming-purple/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-black neon-text text-glow">
              XGAMES
            </Link>
            <div className="hidden md:flex space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 text-sm font-bold transition-all duration-300 rounded-lg
                    ${
                      pathname === item.href
                        ? 'text-white bg-gaming-purple/30 border border-gaming-purple-neon/50 shadow-lg shadow-gaming-purple/20'
                        : 'text-gray-400 hover:text-white hover:bg-gaming-dark/50'
                    }
                  `}
                >
                  {language === 'bs' ? item.labelBs : item.labelEn}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Link
              href="/admin"
              className="px-4 py-2 text-sm font-bold text-gaming-cyan-neon hover:text-gaming-cyan transition-colors border border-gaming-cyan/30 rounded-lg hover:bg-gaming-cyan/10"
            >
              {language === 'bs' ? 'Admin' : 'Admin'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

