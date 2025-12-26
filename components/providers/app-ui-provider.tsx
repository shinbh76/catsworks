"use client";

import * as React from "react";

export type AppLang = "ko" | "zh";
export type AppTheme = "light" | "dark";

type AppUiContextValue = {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  toggleTheme: () => void;

  lang: AppLang;
  setLang: (lang: AppLang) => void;
  toggleLang: () => void;

  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
};

const THEME_KEY = "catsworks-theme";
const LANG_KEY = "catsworks-lang";
const SIDEBAR_KEY = "catsworks-sidebar-collapsed";

const AppUiContext = React.createContext<AppUiContextValue | null>(null);

function readStorage<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeStorage<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function AppUiProvider({ children }: { children: React.ReactNode }) {
  const [theme, _setTheme] = React.useState<AppTheme>("light");
  const [lang, _setLang] = React.useState<AppLang>("ko");
  const [sidebarCollapsed, _setSidebarCollapsed] = React.useState(false);

  // Hydrate from localStorage once on mount
  React.useEffect(() => {
    const storedTheme = readStorage<AppTheme>(THEME_KEY);
    if (storedTheme === "light" || storedTheme === "dark") _setTheme(storedTheme);

    const storedLang = readStorage<AppLang>(LANG_KEY);
    if (storedLang === "ko" || storedLang === "zh") _setLang(storedLang);

    const storedSidebar = readStorage<boolean>(SIDEBAR_KEY);
    if (typeof storedSidebar === "boolean") _setSidebarCollapsed(storedSidebar);
  }, []);

  // Apply theme class to <html>
  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    writeStorage(THEME_KEY, theme);
  }, [theme]);

  React.useEffect(() => {
    writeStorage(LANG_KEY, lang);
  }, [lang]);

  React.useEffect(() => {
    writeStorage(SIDEBAR_KEY, sidebarCollapsed);
  }, [sidebarCollapsed]);

  const setTheme = React.useCallback((next: AppTheme) => _setTheme(next), []);
  const toggleTheme = React.useCallback(
    () => _setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const setLang = React.useCallback((next: AppLang) => _setLang(next), []);
  const toggleLang = React.useCallback(
    () => _setLang((l) => (l === "ko" ? "zh" : "ko")),
    [],
  );

  const setSidebarCollapsed = React.useCallback(
    (collapsed: boolean) => _setSidebarCollapsed(collapsed),
    [],
  );
  const toggleSidebar = React.useCallback(
    () => _setSidebarCollapsed((v) => !v),
    [],
  );

  const value = React.useMemo<AppUiContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      lang,
      setLang,
      toggleLang,
      sidebarCollapsed,
      setSidebarCollapsed,
      toggleSidebar,
    }),
    [lang, setLang, setSidebarCollapsed, setTheme, sidebarCollapsed, theme, toggleLang, toggleSidebar, toggleTheme],
  );

  return <AppUiContext.Provider value={value}>{children}</AppUiContext.Provider>;
}

export function useAppUi() {
  const ctx = React.useContext(AppUiContext);
  if (!ctx) throw new Error("useAppUi must be used within <AppUiProvider />");
  return ctx;
}

export const appUiStorageKeys = {
  theme: THEME_KEY,
  lang: LANG_KEY,
  sidebarCollapsed: SIDEBAR_KEY,
} as const;


