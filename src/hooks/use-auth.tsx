
"use client";

import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import type { User } from '@/lib/models';
import { usePathname, useRouter } from 'next/navigation';

type ViewMode = 'buying' | 'selling';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  viewMode: 'buying',
  setViewMode: () => {},
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('buying');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.role === 'admin' && !pathname.startsWith('/admin')) {
          router.push('/admin');
        }
      }
      const storedViewMode = localStorage.getItem('viewMode') as ViewMode | null;
      if (storedViewMode) {
        setViewMode(storedViewMode);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const handleSetUser = (user: User | null) => {
    setUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'admin') {
        router.push('/admin');
        return;
      }
      if (user.role !== 'creator') {
        handleSetViewMode('buying');
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('viewMode');
      setViewMode('buying');
      if (!['/login', '/signup', '/'].includes(pathname)) {
        router.push('/login');
      }
    }
  };

  const handleSetViewMode = (mode: ViewMode) => {
    if (user?.role !== 'creator') {
        mode = 'buying';
    }
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
    if (mode === 'selling') {
      router.push('/dashboard');
    } else {
      if (!pathname.startsWith('/admin')) {
        router.push('/');
      }
    }
  };

  const value = {
    user,
    setUser: handleSetUser,
    loading,
    viewMode,
    setViewMode: handleSetViewMode
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
