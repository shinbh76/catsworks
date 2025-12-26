'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from './i18n';

// Theme type
export type Theme = 'light' | 'dark';

// Store state interface
interface StoreState {
  lang: Language;
  theme: Theme;
  sidebarCollapsed: boolean;
  t: Translations;
  setLang: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

// Create context
const StoreContext = createContext<StoreState | null>(null);

// Provider component
export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ko');
  const [theme, setThemeState] = useState<Theme>('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedSidebar = localStorage.getItem('sidebarCollapsed');
    
    if (savedLang && (savedLang === 'ko' || savedLang === 'zh')) {
      setLangState(savedLang);
    }
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
    
    if (savedSidebar) {
      setSidebarCollapsed(savedSidebar === 'true');
    }
    
    setMounted(true);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  // Save language preference
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('lang', lang);
    }
  }, [lang, mounted]);

  // Save sidebar state
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed));
    }
  }, [sidebarCollapsed, mounted]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const value: StoreState = {
    lang,
    theme,
    sidebarCollapsed,
    t: translations[lang],
    setLang,
    setTheme,
    toggleTheme,
    toggleSidebar,
    setSidebarCollapsed,
  };

  // Prevent hydration mismatch by rendering children only after mount
  if (!mounted) {
    return null;
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook to use store
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

