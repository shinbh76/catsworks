"use client";

import * as React from "react";

import { useAppUi } from "@/components/providers/app-ui-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Bell,
  Moon,
  PanelLeft,
  Search,
  Sun,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";

function LangToggle() {
  const { lang, setLang } = useAppUi();
  return (
    <div className="flex items-center rounded-md border border-input bg-background p-0.5">
      <button
        type="button"
        onClick={() => setLang("ko")}
        className={cn(
          "h-7 rounded-sm px-2 text-xs font-asia-medium transition-colors",
          lang === "ko"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
        title="한국어"
      >
        KO
      </button>
      <button
        type="button"
        onClick={() => setLang("zh")}
        className={cn(
          "h-7 rounded-sm px-2 text-xs font-asia-medium transition-colors",
          lang === "zh"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
        title="中文"
      >
        ZH
      </button>
    </div>
  );
}

function UserMenu() {
  const { lang } = useAppUi();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current) return;
      const target = e.target as Node | null;
      if (target && !ref.current.contains(target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const labels =
    lang === "ko"
      ? { profile: "프로필", settings: "설정", logout: "로그아웃" }
      : { profile: "个人资料", settings: "设置", logout: "退出登录" };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-md border border-input bg-background px-2 py-1.5",
          "transition-colors hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-asia-bold">
          CW
        </div>
        <div className="hidden sm:block">
          <div className="text-xs font-asia-medium leading-4">Admin</div>
          <div className="text-[11px] font-asia-light leading-4 text-muted-foreground">
            catsworks
          </div>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-sm">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm font-asia-medium hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            <User className="h-4 w-4" strokeWidth={1.5} />
            {labels.profile}
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm font-asia-medium hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            <Settings className="h-4 w-4" strokeWidth={1.5} />
            {labels.settings}
          </button>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm font-asia-medium hover:bg-accent"
            onClick={() => setOpen(false)}
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            {labels.logout}
          </button>
        </div>
      )}
    </div>
  );
}

export function Topbar() {
  const { theme, toggleTheme, toggleSidebar } = useAppUi();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-5">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="iconSm"
          onClick={toggleSidebar}
          title="사이드바 접힘/펼침"
        >
          <PanelLeft className="h-4 w-4" strokeWidth={1.5} />
        </Button>

        <div className="relative w-[320px] max-w-[46vw]">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.5}
          />
          <Input
            placeholder="Search..."
            className="h-9 pl-9"
            aria-label="Search"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="iconSm"
          className="relative"
          title="알림"
        >
          <Bell className="h-4 w-4" strokeWidth={1.5} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-asia-bold text-white">
            8
          </span>
        </Button>

        <LangToggle />

        <Button
          variant="ghost"
          size="iconSm"
          onClick={toggleTheme}
          title={theme === "dark" ? "라이트 모드" : "다크 모드"}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <Moon className="h-4 w-4" strokeWidth={1.5} />
          )}
        </Button>

        <UserMenu />
      </div>
    </header>
  );
}


