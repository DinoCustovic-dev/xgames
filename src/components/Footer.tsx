'use client';

import { useLanguage } from '@/hooks/useLanguage';

export default function Footer() {
  const language = useLanguage();

  return (
    <footer className="bg-gaming-dark border-t border-gaming-purple/30 mt-16 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-gaming-purple/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-3xl font-black neon-text mb-4">XGAMES</h3>
            <p className="text-gray-300 mb-6 font-medium">
              {language === 'bs'
                ? 'Vaš gaming centar za PS5 konzole'
                : 'Your gaming center for PS5 consoles'}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gaming-purple-neon">⏰</span>
                <p className="text-gray-300">
                  <span className="font-bold text-white">
                    {language === 'bs' ? 'Radno vreme:' : 'Hours:'}
                  </span>{' '}
                  <span className="text-gaming-cyan-neon">12:00 - 24:00</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gaming-green-neon">💰</span>
                <p className="text-gray-300">
                  <span className="font-bold text-white">
                    {language === 'bs' ? 'Cene:' : 'Pricing:'}
                  </span>{' '}
                  <span className="text-gaming-green-neon">2p/1h: 5KM</span> | <span className="text-gaming-green-neon">4p/1h: 8KM</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-gaming-blue-neon">📍</span>
              {language === 'bs' ? 'Lokacija' : 'Location'}
            </h3>
            <div className="w-full h-64 rounded-xl overflow-hidden border-2 border-gaming-purple/30 shadow-2xl shadow-gaming-purple/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.5!2d18.4!3d43.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDUxJzAwLjAiTiAxOMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
            <p className="text-sm text-gray-400 mt-3">
              {language === 'bs'
                ? 'Pronađite nas na mapi iznad'
                : 'Find us on the map above'}
            </p>
          </div>
        </div>

        <div className="border-t border-gaming-purple/30 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-gaming-purple-neon font-bold">XGAMES</span>.{' '}
            {language === 'bs' ? 'Sva prava zadržana.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}

