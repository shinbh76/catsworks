"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export type Language = "ko" | "zh";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Language>("ko");

  const t = (key: string) => {
    return key;
  };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageContext.Provider value={{ lang, setLang, t }}>
        {children}
      </LanguageContext.Provider>
    </NextThemesProvider>
  );
}

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
