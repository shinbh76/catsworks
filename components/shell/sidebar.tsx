"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { useAppUi } from "@/components/providers/app-ui-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, NAV_LEAVES, type NavLeaf, type NavGroup } from "@/lib/nav";
import { ChevronLeft, ChevronRight } from "lucide-react";

import logoLight from "@/logo/catsworks-logo-h120.png";
import logoDark from "@/logo/catsworks-logo-darkmode-fixed.png";
import iconLight from "@/logo/catsworks-icon-120.png";
import iconDark from "@/logo/catsworks-icon-120-darkmode-tailwhite.png";

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

function LeafLink({
  leaf,
  active,
  collapsed,
  lang,
}: {
  leaf: NavLeaf;
  active: boolean;
  collapsed: boolean;
  lang: "ko" | "zh";
}) {
  const Icon = leaf.icon;
  return (
    <Link
      href={leaf.href}
      title={collapsed ? leaf.label.ko + " / " + leaf.label.zh : undefined}
      className={cn(
        [
          "flex items-center rounded-md transition-colors",
          collapsed
            ? "h-9 justify-center"
            : "h-9 gap-3 px-3 text-sm font-asia-medium",
          "hover:bg-muted",
        ].join(" "),
        active && "bg-primary/10 text-primary",
        active && !collapsed && "border-l-2 border-primary",
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.5} />
      {!collapsed && <span className="truncate">{leaf.label[lang]}</span>}
    </Link>
  );
}

function GroupBlock({
  group,
  pathname,
  lang,
}: {
  group: NavGroup;
  pathname: string;
  lang: "ko" | "zh";
}) {
  const GroupIcon = group.icon;
  return (
    <div className="space-y-1.5">
      <div className="flex h-9 items-center gap-3 px-3 text-sm font-asia-medium text-muted-foreground">
        <GroupIcon className="h-5 w-5" strokeWidth={1.5} />
        <span className="truncate">{group.label[lang]}</span>
      </div>
      <div className="space-y-1">
        {group.children.map((leaf) => {
          const active = isActivePath(pathname, leaf.href);
          return (
            <Link
              key={leaf.key}
              href={leaf.href}
              className={cn(
                [
                  "flex h-8 items-center rounded-md pl-9 pr-3",
                  "text-xs font-asia-light",
                  "transition-colors hover:bg-muted",
                ].join(" "),
                active && "bg-primary/10 text-primary border-l-2 border-primary",
              )}
              title={leaf.label.ko + " / " + leaf.label.zh}
            >
              <span className="truncate">{leaf.label[lang]}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, lang } = useAppUi();

  return (
    <aside
      className={cn(
        [
          "flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground",
          "transition-all duration-300 ease-in-out",
        ].join(" "),
        sidebarCollapsed ? "w-[62px]" : "w-[205px]",
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b",
          sidebarCollapsed ? "justify-center px-2" : "px-3",
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center",
            sidebarCollapsed ? "justify-center" : "gap-2",
          )}
        >
          {sidebarCollapsed ? (
            <>
              <Image
                src={iconLight}
                alt="CatsWorks"
                width={28}
                height={28}
                className="block dark:hidden"
                priority
              />
              <Image
                src={iconDark}
                alt="CatsWorks"
                width={28}
                height={28}
                className="hidden dark:block"
                priority
              />
            </>
          ) : (
            <>
              <Image
                src={logoLight}
                alt="CatsWorks"
                height={28}
                className="block h-7 w-auto dark:hidden"
                priority
              />
              <Image
                src={logoDark}
                alt="CatsWorks"
                height={28}
                className="hidden h-7 w-auto dark:block"
                priority
              />
            </>
          )}
        </Link>
      </div>

      <nav className={cn("flex-1 overflow-y-auto p-2.5", sidebarCollapsed && "px-2")}>
        {sidebarCollapsed ? (
          <ul className="space-y-1">
            {NAV_LEAVES.map((leaf) => (
              <li key={leaf.key}>
                <LeafLink
                  leaf={leaf}
                  active={isActivePath(pathname, leaf.href)}
                  collapsed
                  lang={lang}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {NAV_ITEMS.map((item) =>
              item.type === "leaf" ? (
                <LeafLink
                  key={item.key}
                  leaf={item}
                  active={isActivePath(pathname, item.href)}
                  collapsed={false}
                  lang={lang}
                />
              ) : (
                <GroupBlock
                  key={item.key}
                  group={item}
                  pathname={pathname}
                  lang={lang}
                />
              ),
            )}
          </div>
        )}
      </nav>

      <div className="border-t p-3">
        <div
          className={cn(
            "flex items-center",
            sidebarCollapsed ? "justify-center" : "justify-between gap-3",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              sidebarCollapsed && "justify-center",
            )}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-asia-bold text-foreground">
              CW
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0">
                <div className="truncate text-sm font-asia-medium leading-5">
                  CatsWorks
                </div>
                <div className="truncate text-xs font-asia-light text-muted-foreground">
                  admin@catsworks
                </div>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="iconSm"
            className="shrink-0"
            onClick={toggleSidebar}
            title={sidebarCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}


