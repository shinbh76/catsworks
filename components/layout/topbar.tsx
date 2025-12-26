"use client";

import React from "react";
import { Search, Bell, Sun, Moon, Globe, User, LogOut, Menu } from "lucide-react";
import { useSidebar } from "@/lib/contexts/sidebar-context";
import { useTheme } from "@/lib/contexts/theme-context";
import { useI18n } from "@/lib/contexts/i18n-context";
import { getTranslation } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { collapsed, toggle } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang } = useI18n();
  const t = getTranslation(lang);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background px-4">
      {/* Left: Toggle + Search */}
      <div className="flex flex-1 items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="h-9 w-9"
        >
          <Menu className="h-4 w-4" strokeWidth={1.5} />
        </Button>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input
            type="search"
            placeholder={t.common.search}
            className="pl-9 font-asia-light"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Notification */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" strokeWidth={1.5} />
          <Badge className="absolute right-1 top-1 h-4 w-4 p-0 text-[10px] font-asia-medium">
            3
          </Badge>
        </Button>

        {/* Language Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Globe className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setLang("ko")}
              className={cn(lang === "ko" && "bg-accent")}
            >
              한국어
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setLang("zh")}
              className={cn(lang === "zh" && "bg-accent")}
            >
              中文
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <Sun className="h-4 w-4" strokeWidth={1.5} />
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs font-asia-medium">U</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-asia-medium md:inline-block">
                {t.common.profile}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-asia-medium">
              {t.common.profile}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-asia-light">
              <User className="mr-2 h-4 w-4" strokeWidth={1.5} />
              {t.common.profile}
            </DropdownMenuItem>
            <DropdownMenuItem className="font-asia-light text-destructive">
              <LogOut className="mr-2 h-4 w-4" strokeWidth={1.5} />
              {t.common.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
