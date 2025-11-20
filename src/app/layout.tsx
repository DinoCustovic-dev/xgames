import type { Metadata } from 'next';
import '../styles/globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'xgames - PS5 Gaming Center',
  description: 'Real-time PS5 console availability at xgames gaming center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bs">
      <body className="antialiased">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
