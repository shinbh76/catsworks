"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/providers";
import { cn } from "@/lib/utils";
import {
  Search,
  Bell,
  Languages,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";

export function Topbar({ collapsed }: { collapsed: boolean }) {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-background border-b border-border z-40 transition-all duration-300 ease-in-out flex items-center justify-between px-6",
        collapsed ? "left-[62px]" : "left-[205px]"
      )}
    >
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <input
            type="text"
            placeholder={lang === "ko" ? "寃??.." : "?쒐뇨..."}
            className="w-full bg-muted/50 border border-input rounded-md pl-10 pr-4 py-2 text-sm font-asia-light focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setLang(lang === "ko" ? "zh" : "ko")}
          className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors flex items-center gap-2"
          title={lang === "ko" ? "?몄뼱 蹂寃? : "?뉑뜟瑥??"}
        >
          <Languages className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-xs font-asia-medium uppercase">{lang}</span>
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors"
          title={theme === "dark" ? "?쇱씠??紐⑤뱶" : "?ㅽ겕 紐⑤뱶"}
        >
          {theme === "dark" ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
        </button>

        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors relative">
          <Bell className="w-5 h-5" strokeWidth={1.5} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-border cursor-pointer group">
          <div className="flex flex-col items-end">
            <span className="text-sm font-asia-medium leading-none">Admin User</span>
            <span className="text-xs text-muted-foreground font-asia-light">Super Admin</span>
          </div>
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-asia-bold text-primary">AU</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>
    </header>
  );
}
