'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useConsoles } from '@/queries/useConsoles';
import { useLogin } from '@/mutations/useLogin';
import { useUpdateConsoleStatus } from '@/mutations/useUpdateConsoleStatus';
import { useLogout } from '@/mutations/useLogout';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const language = useLanguage();

  const { data: consoles, isLoading: consolesLoading, isError: consolesError, error: consolesErrorObj, refetch: refetchConsoles } = useConsoles();
  const loginMutation = useLogin();
  const updateStatusMutation = useUpdateConsoleStatus();
  const logoutMutation = useLogout();

  useEffect(() => {
    if (isAuthenticated && consoles) {
      const interval = setInterval(() => refetchConsoles(), 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, consoles, refetchConsoles]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ password });
      setIsAuthenticated(true);
    } catch (err) {
      // Error handled by mutation
    }
  };

  const handleStatusToggle = async (consoleId: number, currentStatus: 'free' | 'occupied') => {
    const newStatus = currentStatus === 'free' ? 'occupied' : 'free';
    try {
      await updateStatusMutation.mutateAsync({
        consoleId,
        status: newStatus,
        password,
      });
      setSuccess(
        language === 'bs' 
          ? 'Status uspješno ažuriran!' 
          : 'Status updated successfully!'
      );
      setTimeout(() => setSuccess(null), 3000);
      refetchConsoles();
    } catch (err) {
      // Error handled by mutation
    }
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gaming-darker flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-purple/10 via-gaming-blue/10 to-gaming-cyan/10 pointer-events-none" />
        <div className="gaming-card p-8 w-full max-w-md relative z-10">
          <h1 className="text-4xl font-black neon-text mb-6 text-center text-glow">
            {language === 'bs' ? '🔐 Admin Panel' : '🔐 Admin Panel'}
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gaming-cyan-neon mb-2">
                {language === 'bs' ? 'Lozinka' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gaming-dark border border-gaming-purple/50 rounded-lg text-white focus:ring-2 focus:ring-gaming-purple-neon focus:border-gaming-purple-neon transition-all"
                required
              />
            </div>
            {loginMutation.isError && (
              <div className="p-3 bg-gaming-red/20 border border-gaming-red-neon/50 rounded-lg text-gaming-red-neon text-sm font-bold">
                {loginMutation.error?.message || 'Login failed'}
              </div>
            )}
            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full btn-gaming disabled:opacity-50"
            >
              {loginMutation.isLoading 
                ? (language === 'bs' ? 'Učitavanje...' : 'Loading...')
                : (language === 'bs' ? 'Prijava' : 'Login')
              }
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gaming-darker py-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gaming-purple/5 via-gaming-blue/5 to-gaming-cyan/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black neon-text text-glow">
            {language === 'bs' ? '⚡ Admin Panel' : '⚡ Admin Panel'}
          </h1>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isLoading}
            className="px-6 py-3 bg-gaming-red/20 border border-gaming-red-neon/50 text-gaming-red-neon rounded-lg hover:bg-gaming-red/30 transition-all font-bold disabled:opacity-50"
          >
            {logoutMutation.isLoading 
              ? (language === 'bs' ? 'Odjava...' : 'Logging out...')
              : (language === 'bs' ? 'Odjava' : 'Logout')
            }
          </button>
        </div>

        {(updateStatusMutation.isError || consolesError) && (
          <div className="mb-4 p-4 bg-gaming-red/20 border border-gaming-red-neon/50 text-gaming-red-neon rounded-lg font-bold">
            {updateStatusMutation.error?.message || consolesErrorObj?.message || 'An error occurred'}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-gaming-green/20 border border-gaming-green-neon/50 text-gaming-green-neon rounded-lg font-bold">
            {success}
          </div>
        )}

        {consolesLoading && <Loading />}
        {consolesError && <Error message={consolesErrorObj?.message || 'Failed to fetch consoles'} onRetry={refetchConsoles} />}
        
        {consoles && consoles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consoles.map((console) => (
            <div
              key={console.id}
              className="gaming-card gaming-card-hover p-6"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gaming-purple-neon text-lg">🎮</span>
                  <h3 className="text-xl font-bold text-white">
                    {language === 'bs' ? 'Konzola' : 'Console'} {console.number}
                  </h3>
                </div>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                    console.status === 'free'
                      ? 'bg-gaming-green/20 text-gaming-green-neon border border-gaming-green-neon/50'
                      : 'bg-gaming-red/20 text-gaming-red-neon border border-gaming-red-neon/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${console.status === 'free' ? 'bg-gaming-green-neon animate-pulse' : 'bg-gaming-red-neon'}`} />
                  {console.status === 'free'
                    ? (language === 'bs' ? 'Slobodno' : 'Free')
                    : (language === 'bs' ? 'Zauzeto' : 'Occupied')}
                </div>
              </div>
              <button
                onClick={() => handleStatusToggle(console.id, console.status)}
                disabled={updateStatusMutation.isLoading}
                className={`
                  w-full py-3 px-4 rounded-lg font-bold transition-all duration-300
                  ${
                    console.status === 'free'
                      ? 'bg-gaming-red/20 border-2 border-gaming-red-neon text-gaming-red-neon hover:bg-gaming-red/30 hover:shadow-lg hover:shadow-gaming-red/30'
                      : 'bg-gaming-green/20 border-2 border-gaming-green-neon text-gaming-green-neon hover:bg-gaming-green/30 hover:shadow-lg hover:shadow-gaming-green/30'
                  }
                  disabled:opacity-50 active:scale-95
                `}
              >
                {console.status === 'free'
                  ? (language === 'bs' ? 'Postavi kao Zauzeto' : 'Set to Occupied')
                  : (language === 'bs' ? 'Postavi kao Slobodno' : 'Set to Free')}
              </button>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

