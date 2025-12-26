'use client';

import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import {
  Search,
  Bell,
  Moon,
  Sun,
  User,
  Settings,
  LogOut,
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Topbar() {
  const { lang, theme, sidebarCollapsed, t, setLang, toggleTheme, toggleSidebar } = useStore();

  return (
    <TooltipProvider delayDuration={0}>
      <header
        className={cn(
          'fixed top-0 right-0 z-30 h-16',
          'bg-background border-b border-border',
          'flex items-center justify-between px-6',
          'transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'left-[62px]' : 'left-[205px]'
        )}
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="h-9 w-9"
              >
                {sidebarCollapsed ? (
                  <PanelLeft className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <PanelLeftClose className="h-5 w-5" strokeWidth={1.5} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {sidebarCollapsed 
                ? (lang === 'ko' ? '메뉴 펼치기' : '展开菜单')
                : (lang === 'ko' ? '메뉴 접기' : '折叠菜单')
              }
            </TooltipContent>
          </Tooltip>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <Input
              type="search"
              placeholder={t.search + '...'}
              className="pl-10 w-[280px] h-9 font-asia-light text-sm bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                <Bell className="h-5 w-5" strokeWidth={1.5} />
                <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] font-asia-medium bg-destructive text-destructive-foreground">
                  3
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t.notifications}</TooltipContent>
          </Tooltip>

          {/* Language Toggle */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 px-3 font-asia-medium text-sm gap-1.5">
                    {lang === 'ko' ? '한국어' : '中文'}
                    <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>{t.language}</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-28">
              <DropdownMenuItem
                onClick={() => setLang('ko')}
                className={cn('font-asia-light', lang === 'ko' && 'bg-accent')}
              >
                한국어
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLang('zh')}
                className={cn('font-asia-light', lang === 'zh' && 'bg-accent')}
              >
                中文
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Sun className="h-5 w-5" strokeWidth={1.5} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {theme === 'light' ? t.dark : t.light}
            </TooltipContent>
          </Tooltip>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 px-2 gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-asia-medium text-sm hidden sm:inline">Admin</span>
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="font-asia-light gap-2">
                <User className="h-4 w-4" strokeWidth={1.5} />
                {t.profile}
              </DropdownMenuItem>
              <DropdownMenuItem className="font-asia-light gap-2">
                <Settings className="h-4 w-4" strokeWidth={1.5} />
                {t.settings}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-asia-light gap-2 text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                {t.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  );
}

